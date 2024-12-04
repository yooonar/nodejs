const {createLogger, transports, format } = require("winston");
const { combine, label, timestamp, printf, simple, colorize } = format; // , json

const printFormat = printf(({ timestamp, label, level, message }) => {
    return `${timestamp} [${label}] ${level} : ${message}`
});

const printLogFormat = {
    file: combine(
        label({
            label: "백엔드 맛보기",
        }),
        timestamp({
            format: "YYYY-MM-DD HH:mm:dd", // "2024-12-05 08:20:04"
        }),
        printFormat, // json(), // 출력 포맷
    ),
    console: combine(
        colorize(),
        simple(),
    ),
};

/*
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6
}
*/

const options = {
    file: new transports.File({ // 파일로 출력
        filename: "access.log",
        dirname: "./logs",
        level: "info",
        format: printLogFormat.file,
    }),
    console: new transports.Console({ // 콘솔로 출력
        level: "info",
        format: printLogFormat.console,
    }),
}

const logger = createLogger({
    transports: [
        options.file
    ],
});

if(process.env.NODE_ENV !== "production") { // 서비스 중이 아니면(NODE_ENV = "dev" 이면)
    logger.add(
        options.console
    )
}

module.exports = logger;
