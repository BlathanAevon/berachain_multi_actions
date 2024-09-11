const winston = require("winston");
const { combine, timestamp, printf, colorize } = winston.format;

class Logger {
  private logger;

  constructor() {
    const customFormat = printf((info) => {
      if (info.message.includes("\n")) {
        return `[${info.timestamp}] ${info.level}:\n${info.message}`;
      }
      return `[${info.timestamp}] ${info.level}: ${info.message}`;
    });

    this.logger = winston.createLogger({
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
  }

  public info(message: string) {
    this.logger.info(message);
  }

  public error(message: string) {
    this.logger.error(message);
  }

  public warn(message: string) {
    this.logger.warn(message);
  }
}

export default new Logger();
