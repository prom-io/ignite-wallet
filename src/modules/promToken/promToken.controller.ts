import {Body, Controller, Get, Param, Post, Res, UseGuards} from "@nestjs/common";
import {TransferHandler} from "./useCase/transfer/transfer.handler";
import {TransferCommand} from "./useCase/transfer/transfer.command";
import {Response} from "express";
import {PromTokenService} from "./services/promToken.service";
import {PromTokenFetcher} from "./fetchers/promToken.fetcher";
import {AuthGuard} from "@nestjs/passport";

@Controller('/api/v1/balance')
export class PromTokenController {

    constructor(
        private readonly transferHandler: TransferHandler,
        private readonly promTokenFetcher: PromTokenFetcher,
    ) {}

    @Get('/:address')
    public async balanceOf(@Param('address') address: string, @Res() res: Response) {
        const balance = await this.promTokenFetcher.balanceOf(address);
        return res.status(200).send({balance});
    }
}
