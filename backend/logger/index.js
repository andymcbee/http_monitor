import { format, createLogger, transports } from "winston";
const { printf, combine, timestamp, colorize, errors } = format;

const myFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

export const logger = createLogger({
  format: combine(colorize(), timestamp(), errors({ stack: true }), myFormat),
  // defaultMeta: { service: "user-service" },
  transports: [new transports.Console()],
});
