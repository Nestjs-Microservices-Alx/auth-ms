import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  MONGO_URL: string;

  NATS_SERVERS: string;

  // Auth
  JWT_SECRET: string;
}

// validate envs with joi schema
const envsSchema = joi
  .object({
    PORT: joi.number().required(), // ya lo parsea a number
    MONGO_URL: joi.string().required(),

    NATS_SERVERS: joi.array().items(joi.string()).required(),

    // Auth
    JWT_SECRET: joi.string().required(),
  })
  .unknown(true); // allow other envs not defined in schema - process.env

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envsVars: EnvVars = value;

export const envs = {
  PORT: envsVars.PORT,
  MONGO_URL: envsVars.MONGO_URL, // aunq no se use fuera d prisma, lo incluimos para q se valide

  NATS_SERVERS: envsVars.NATS_SERVERS,

  // Auth
  JWT_SECRET: envsVars.JWT_SECRET,
};
