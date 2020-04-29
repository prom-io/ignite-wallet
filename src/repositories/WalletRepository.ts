import {EntityManager, EntityRepository, Repository} from "typeorm";
import {Wallets} from "../entities/Wallets";
import {WalletTypes} from "../enums/wallet.types";

@EntityRepository()
export class WalletRepository {

    constructor(private manager: EntityManager) {}

    public pagination(page: number = 0, pageSize: number = 0) {
        return this.manager.find(Wallets, { skip: page, take: pageSize })
    }

    public all() {
        return this.manager.find(Wallets);
    }

    public getMasterAccount() {
        return this.manager.findOne(Wallets, { type: WalletTypes.MASTER });
    }

    public getAllWalletCount() {
        return this.manager.count(Wallets);
    }

    public async existMasterAccount(): Promise<boolean> {
        return await this.manager.count(Wallets, { type: WalletTypes.MASTER }) > 0;
    }

    public async existRootAccount(): Promise<boolean> {
        return await this.manager.count(Wallets, { type: WalletTypes.ROOT }) > 0;
    }

    public async existAccount(address: string): Promise<boolean> {
        return await this.manager.count(Wallets, { address }) > 0;
    }

    public getAccountByAddress(address: string) {
        return this.manager.findOne(Wallets, { address })
    }

    public createMaster(addressData: {address: string, publicKey: string, privateKey: string}) {
        const wallet = new Wallets();
        wallet.address = addressData.address;
        wallet.publicKey = addressData.publicKey;
        wallet.privateKey = addressData.privateKey;
        wallet.type = WalletTypes.MASTER;
        wallet.createdAt = new Date();
        return this.manager.save(wallet);
    }

    public save(wallet: Wallets) {
        return this.manager.save(wallet);
    }
}
