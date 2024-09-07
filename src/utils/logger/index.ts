import winston, { createLogger, format, transports } from "winston";
import os from "os";
const { colorize } = winston.format.colorize();

interface Colors {
  [name: string]: string;
}

const colors: Colors = {
  timestamp: "gray",
  gray: "gray",
  method: "bold magenta",
  route: "bold blue",
  action: "bold white",
  error: "red",
  warn: "yellow",
  info: "green",
  debug: "cyan",
  cyan: "bold cyan",
  white: "bold white",
  green: "bold green",
  yellow: "yellow",
};

winston.addColors(colors);

export default createLogger({
  transports: [new transports.Console()],
  format: format.combine(
    format.timestamp(),
    format.splat(),
    format((info) => {
      info.level = info.level.toUpperCase();
      info.timestamp = colorize(
        "timestamp",
        `[${info.timestamp.toUpperCase()}]`
      );

      info.host = colorize(
        "gray",
        `${os.hostname().toLowerCase()}-${process.pid}`
      );

      try {
        if (typeof info.message === "object" && info.message?.flat) {
          info.message = Object.keys(info.message)
            .filter((property) => property !== "flat")
            .map((property: string) =>
              colors[property]
                ? colorize(property, info.message[property])
                : info.message[property]
            )
            .join(" ");
        } else info.message = info.message.trim();
      } catch (error) {
        info.message = JSON.stringify(info.message);
      }

      return info;
    })(),
    format.colorize(),
    format.printf(
      (info) => `${info.timestamp} ${info.level} ${info.host} ${info.message}`
    )
  ),
});
