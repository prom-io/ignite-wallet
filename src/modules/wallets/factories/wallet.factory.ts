import {WalletsEntity} from "../../../entities/Wallets.entity";
import {WalletTypes} from '../../../enums/wallet.types';
export class WalletFactory {
    public createMaster(dto: WalletDto): WalletsEntity {
        const wallet = WalletFactory.build(dto);
        wallet.type = WalletTypes.MASTER;
        return wallet;
    }

    public createWallet(dto: WalletDto): WalletsEntity {
        const wallet = WalletFactory.build(dto);
        wallet.type = WalletTypes.SIMPLE;
        return wallet;
    }

    private static build(dto: WalletDto): WalletsEntity {
        const wallet = new WalletsEntity();
        wallet.address = dto.address;
        wallet.publicKey = dto.publicKey;
        wallet.privateKey = dto.privateKey;
        wallet.createdAt = new Date();
        return wallet;
    }
}
