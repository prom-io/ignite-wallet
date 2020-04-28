import { Module } from '@nestjs/common';
import {ConfigModule} from "./config/config.module";
import {Web3Module} from "./modules/web3/web3.module";
import {WalletModule} from "./modules/wallets/wallet.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ConfigService} from "./config/config.service";
import {PromTokenModule} from "./modules/promToken/promToken.module";

@Module({
  imports: [
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => config.getTypeOrmConfig(),
        inject: [ConfigService],
      }),
      ConfigModule,
      Web3Module,
      WalletModule,
      PromTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
