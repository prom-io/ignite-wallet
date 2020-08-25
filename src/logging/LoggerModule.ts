import {Global, Module} from "@nestjs/common";
import {LoggerService, LoggerTransport} from "nest-logger";


@Global()
@Module({
    providers: [
        {
            provide: LoggerService,
            useValue: new LoggerService(
                process.env.LOGGING_LEVEL,
                "loggingService",
                [LoggerTransport.CONSOLE]
            )
        }
    ],
    exports: [LoggerService]
})
export class LoggerModule {
}
