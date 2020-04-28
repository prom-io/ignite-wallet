import {Module} from "@nestjs/common";
import {PromTokenService} from "./services/promToken.service";
import {Web3Service} from "../web3/web3.service";
import {PromTokenController} from "./promToken.controller";
import {TransferHandler} from "./useCase/transfer/transfer.handler";
import {WalletRepository} from "../../repositories/WalletRepository";
import {PromTokenFetcher} from "./fetchers/promToken.fetcher";
import {TransactionFactory} from "./factories/transaction.factory";
import {TransactionRepository} from "../../repositories/TransactionRepository";

@Module({
    imports: [],
    controllers: [PromTokenController],
    providers: [
        PromTokenService,
        Web3Service,
        TransferHandler,
        WalletRepository,
        PromTokenFetcher,
        TransactionFactory,
        TransactionRepository,
    ],
})
export class PromTokenModule {}
