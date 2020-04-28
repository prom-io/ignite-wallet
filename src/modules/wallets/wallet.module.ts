import { Module } from '@nestjs/common';
import {WalletController} from "./wallet.controller";
import {CreateWalletHandler} from "./useCase/createWallet/createWallet.handler";
import {WalletService} from "./services/wallet.service";
import {WalletFactory} from "./factories/wallet.factory";
import {WalletRepository} from "../../repositories/WalletRepository";
import {Web3Service} from "../web3/web3.service";

@Module({
    imports: [],
    controllers: [WalletController],
    providers: [CreateWalletHandler, WalletService, WalletFactory, WalletRepository, Web3Service],
})
export class WalletModule {}
