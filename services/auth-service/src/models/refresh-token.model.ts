import { DataTypes, Model, type Optional } from 'sequelize';
import { sequelize } from '@/db/sequelize';
import { UserCredentials } from '@/models/user-credentials.model';

export interface RwefreshTokenAttributes {
    id: string;
    userId: string;
    tokenId: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type RefreshTokenCreationAttributes = Optional<
    RwefreshTokenAttributes,
    'id' | 'createdAt' | 'updatedAt'
>;

export class RefreshToken
    extends Model<RwefreshTokenAttributes, RefreshTokenCreationAttributes>
    implements RwefreshTokenAttributes
{
    declare id: string;
    declare userId: string;
    declare tokenId: string;
    declare expiresAt: Date;
    declare createdAt: Date;
    declare updatedAt: Date;
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        tokenId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'refresh_tokens',
    },
);

UserCredentials.hasMany(RefreshToken, {
    foreignKey: 'userId',
    as: 'refreshTokens',
    onDelete: 'CASCADE',
});

RefreshToken.belongsTo(UserCredentials, {
    foreignKey: 'userId',
    as: 'user',
});
