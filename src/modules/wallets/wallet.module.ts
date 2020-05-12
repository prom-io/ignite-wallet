import {HttpModule, Module} from '@nestjs/common';
import {WalletController} from "./wallet.controller";
import {CreateWalletHandler} from "./useCase/createWallet/createWallet.handler";
import {WalletService} from "./services/wallet.service";
import {WalletFactory} from "./factories/wallet.factory";
import {WalletRepository} from "../../repositories/WalletRepository";
import {Web3Service} from "../web3/web3.service";
import {WalletFetcher} from "./fetchers/wallet.fetcher";
import {ConfigModule} from "../../config/config.module";
import {ConfigService} from "../../config/config.service";
import {Agent} from 'https';
import {ClientsModule, Transport} from "@nestjs/microservices";
import {RedisModule} from "nestjs-redis";
import {AuthService} from "./services/igniteBackend/auth.service";

@Module({
    imports: [
        HttpModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService)  => ({
                baseURL: configService.get('IGNITE_BACKEND_API'),
                httpsAgent: new Agent({
                    rejectUnauthorized: false,
                }),
            }),
            inject: [ConfigService]
        }),
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => configService.getRedisConfig(),
            inject: [ConfigService]
        })
    ],
    controllers: [WalletController],
    providers: [
        CreateWalletHandler,
        WalletService,
        WalletFactory,
        WalletRepository,
        Web3Service,
        WalletFetcher,
        AuthService,
    ],
})
export class WalletModule {}
