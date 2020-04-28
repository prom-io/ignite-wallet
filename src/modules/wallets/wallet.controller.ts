import {Controller, Get, Res} from '@nestjs/common';
import {CreateWalletHandler} from "./useCase/createWallet/createWallet.handler";
import {Response} from "express";

@Controller('/api/v1/wallet')
export class WalletController {
    constructor(private readonly createWalletHandler: CreateWalletHandler) {}

    @Get('/generate')
    public async generate(@Res() res: Response): Promise<any> {
        const wallet = await this.createWalletHandler.handle();
        return res.status(200).send({
            id: wallet.id,
            address: wallet.address,
            message: 'Wallet success generated!'
        });
    }
}
