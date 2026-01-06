import { z, type ZodObject, type ZodRawShape } from "zod";
interface EnvOptions {
    source?: NodeJS.ProcessEnv;
    serviceName?: string;
}
type SchemaOutput<TSchema extends ZodRawShape> = z.output<z.ZodObject<TSchema>>;
export declare const createEnv: <TSchema extends ZodRawShape>(schema: ZodObject<TSchema>, options?: EnvOptions) => SchemaOutput<TSchema>;
export type EnvSchema<TShape extends ZodRawShape> = ZodObject<TShape>;
export {};
//# sourceMappingURL=env.d.ts.map