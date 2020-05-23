import {Body, Controller, Get, Param, Post, Res, UseGuards} from "@nestjs/common";
import {TransferHandler} from "./useCase/transfer/transfer.handler";
import {TransferCommand} from "./useCase/transfer/transfer.command";
import {Response} from "express";
import {PromTokenService} from "./services/promToken.service";
import {PromTokenFetcher} from "./fetchers/promToken.fetcher";
import {TransactionFetcher} from "./fetchers/transaction.fetcher";
import {TransactionRepository} from "../../repositories/TransactionRepository";
import {AuthGuard} from "@nestjs/passport";

@Controller('/api/v1/transactions')
export class TransactionController {

    constructor(
        private readonly repository: TransactionRepository,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('/:address/:page/:limit')
    public async allTransactionsByAddress(
        @Param('address') address: string,
        @Param('page') page: number = 1,
        @Param('limit') limit: number = 10,
    ) {
        limit = limit > 100 ? 100 : limit;
        return await this.repository.paginate(address, {
            page, limit,
        })
    }
}
