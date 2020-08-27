import {Global, Module} from '@nestjs/common';
import {LoggerService} from 'nest-logger';
import {loggerServiceInstance} from './logger-service-instance';

@Global()
@Module({
    providers: [
        {
            provide: LoggerService,
            useValue: loggerServiceInstance,
        },
    ],
    exports: [LoggerService],
})
export class LoggerModule {}
