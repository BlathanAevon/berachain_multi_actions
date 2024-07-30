const winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;

const customFormat = printf((info) => {
  // Check if the message contains a newline (e.g., stack trace)
  if (info.message.includes("\n")) {
    return `[${info.timestamp}] ${info.level}:\n${info.message}`;
  }
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: "DD.MM.YY hh:mm",
    }),
    customFormat
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
