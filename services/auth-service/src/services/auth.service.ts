import { sequelize } from '@/db/sequelize';
import { RefreshToken, UserCredentials } from '@/models';
import { AuthResponse, RegisterInput } from '@/types/auth';
import { HttpError } from '@monorepo-chatapp/common';
import { Op, Transaction } from 'sequelize';
import { hashPassword, signAccesstoken, signRefreshtoken } from '@/utils/token';
import { publishUserRegisteredEvent } from '@/messaging/event-publishing';

const REFRESH_TOKEN_TTL_DAYS = 30;

export const register = async (input: RegisterInput): Promise<AuthResponse> => {
    const existing = await UserCredentials.findOne({ where: { email: { [Op.eq]: input.email } } });

    if (existing) {
        throw new HttpError(409, 'User already exists');
    }

    const transaction = await sequelize.transaction();

    try {
        const passwordHash = await hashPassword(input.password);
        const user = await UserCredentials.create(
            {
                email: input.email,
                displayName: input.displayName,
                passwordHash,
            },
            { transaction },
        );
        const refreshTokenRecord = await createRefreshToken(user.id, transaction);

        await transaction.commit();

        const accessToken = signAccesstoken({ sub: user.id, email: user.email });
        const refreshToken = signRefreshtoken({
            sub: user.id,
            tokenId: refreshTokenRecord.tokenId,
        });

        const userData = {
            id: user.id,
            email: user.email,
            displayName: user.displayName,
            createdAt: user.createdAt.toISOString(),
        };

        publishUserRegisteredEvent(userData);

        return {
            accessToken,
            refreshToken,
            user: userData,
        };
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

const createRefreshToken = async (userId: string, transaction?: Transaction) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_TTL_DAYS);

    const tokenId = crypto.randomUUID();

    const record = await RefreshToken.create(
        {
            userId,
            tokenId,
            expiresAt,
        },
        { transaction },
    );

    return record;
};
