import {Module} from "@nestjs/common";
import {PromTokenService} from "./services/promToken.service";
import {Web3Service} from "../web3/web3.service";
import {PromTokenController} from "./promToken.controller";
import {TransferHandler} from "./useCase/transfer/transfer.handler";
import {WalletRepository} from "../../repositories/WalletRepository";
import {PromTokenFetcher} from "./fetchers/promToken.fetcher";
import {TransactionFactory} from "./factories/transaction.factory";
import {TransactionRepository} from "../../repositories/TransactionRepository";
import {TransactionFetcher} from "./fetchers/transaction.fetcher";
import {TransactionController} from "./transaction.controller";
import {TransferRepository} from "../../repositories/TransferRepository";
import {TransferPendingCron} from "./transferPending.cron";
import {GasAddedCron} from "./gasAdded.cron";
import {TransferController} from "./transfer.controller";
import {TransferService} from "./services/transfer.service";

@Module({
    imports: [],
    controllers: [PromTokenController, TransactionController, TransferController],
    providers: [
        PromTokenService,
        Web3Service,
        TransferHandler,
        WalletRepository,
        PromTokenFetcher,
        TransactionFactory,
        TransactionRepository,
        TransferRepository,
        TransactionFetcher,
        TransferPendingCron,
        GasAddedCron,
        TransferService
    ],
    exports: []
})
export class PromTokenModule {}
