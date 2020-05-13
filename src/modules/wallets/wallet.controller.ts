import {BadRequestException, Controller, Get, Param, Res, UseGuards} from '@nestjs/common';
import {CreateWalletHandler} from "./useCase/createWallet/createWallet.handler";
import {Response} from "express";
import {AuthGuard} from "@nestjs/passport";
import {WalletFetcher} from "./fetchers/wallet.fetcher";

@Controller('/api/v1/wallet')
export class WalletController {
    constructor(
        private readonly createWalletHandler: CreateWalletHandler,
        private readonly walletFetcher: WalletFetcher,
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get('/generate')
    public async generate(@Res() res: Response): Promise<any> {
        try {
            const wallet = await this.createWalletHandler.handle();
            return res.status(200).send({
                id: wallet.id,
                address: wallet.address,
                publicKey: wallet.publicKey,
                privateKey: wallet.privateKey,
                message: 'Wallet success generated!'
            });
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/all')
    public async all(@Res() res: Response): Promise<any> {
        const wallets = await this.walletFetcher.all();
        return res.status(200).send(wallets);
    }
}
