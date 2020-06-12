import {Body, Controller, Get, Param, Post, Res, UseGuards} from "@nestjs/common";
import {TransferHandler} from "./useCase/transfer/transfer.handler";
import {TransferCommand} from "./useCase/transfer/transfer.command";
import {Response} from "express";
import {PromTokenService} from "./services/promToken.service";
import {PromTokenFetcher} from "./fetchers/promToken.fetcher";
import {TransactionFetcher} from "./fetchers/transaction.fetcher";
import {TransactionRepository} from "../../repositories/TransactionRepository";
import {AuthGuard} from "@nestjs/passport";
import {TransferRepository} from "../../repositories/TransferRepository";
import {TransferEnum} from "./enums/transfer.enum";
import {TransferService} from "./services/transfer.service";

@Controller('/api/v1/transfer')
export class TransferController {

    constructor(
        private readonly repository: TransferRepository,
        private readonly transferHandler: TransferHandler,
        private readonly transferService: TransferService
    ) {}

    @Get('/check-active/:address')
    public async checkActive(@Param('address') address: string, @Res() res: Response) {
        const result = await this.transferService.checkActiveTransfer(address);
        return res.status(200).send({result})
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/')
    public async transfer(@Body() dto: TransferCommand, @Res() res: Response) {
        await this.transferHandler.handle(dto);
        return res.status(200).send({
            message: 'Transfer success created!',
            status: TransferEnum.PENDING
        });
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:address/:page/:limit')
    public async allAddressTransfer(
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
