import { LoggerService } from 'nest-logger';

export const loggerServiceInstance = new LoggerService(
  'info',
  [
      LoggerService.console({
          timeFormat: 'HH:mm',
          consoleOptions: {
              level: 'info',
          },
      }),
      LoggerService.rotate({
          colorize: false,
          fileOptions: {
              maxFiles: '30d',
              filename: 'logs/%DATE%.log',
              level: 'info',
              json: true,
              utc: true,
          },
      }),
  ],
);
