import {Wallets} from "../../../entities/Wallets";
import {WalletTypes} from '../../../enums/wallet.types';
export class WalletFactory {
    public createMaster(dto: WalletDto): Wallets {
        const wallet = WalletFactory.build(dto);
        wallet.type = WalletTypes.MASTER;
        return wallet;
    }

    public createWallet(dto: WalletDto): Wallets {
        const wallet = WalletFactory.build(dto);
        wallet.type = WalletTypes.SIMPLE;
        return wallet;
    }

    private static build(dto: WalletDto): Wallets {
        const wallet = new Wallets();
        wallet.address = dto.address;
        wallet.publicKey = dto.publicKey;
        wallet.privateKey = dto.privateKey;
        wallet.createdAt = new Date();
        return wallet;
    }
}
