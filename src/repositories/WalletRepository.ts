import {EntityManager, EntityRepository, Repository} from "typeorm";
import {WalletsEntity} from "../entities/Wallets.entity";
import {WalletTypes} from "../enums/wallet.types";

@EntityRepository()
export class WalletRepository {

    constructor(private manager: EntityManager) {}

    public pagination(page: number = 0, pageSize: number = 0) {
        return this.manager.find(WalletsEntity, { skip: page, take: pageSize })
    }

    public all() {
        return this.manager.find(WalletsEntity);
    }

    public getMasterAccount() {
        return this.manager.findOne(WalletsEntity, { type: WalletTypes.MASTER });
    }

    public getAllWalletCount() {
        return this.manager.count(WalletsEntity);
    }

    public async existMasterAccount(): Promise<boolean> {
        return await this.manager.count(WalletsEntity, { type: WalletTypes.MASTER }) > 0;
    }

    public async existRootAccount(): Promise<boolean> {
        return await this.manager.count(WalletsEntity, { type: WalletTypes.ROOT }) > 0;
    }

    public async existAccount(address: string): Promise<boolean> {
        return await this.manager.count(WalletsEntity, { address }) > 0;
    }

    public getAccountByAddress(address: string) {
        return this.manager.findOne(WalletsEntity, { address })
    }

    public createMaster(addressData: {address: string, publicKey: string, privateKey: string}) {
        const wallet = new WalletsEntity();
        wallet.address = addressData.address;
        wallet.publicKey = addressData.publicKey;
        wallet.privateKey = addressData.privateKey;
        wallet.type = WalletTypes.MASTER;
        wallet.createdAt = new Date();
        return this.manager.save(wallet);
    }

    public save(wallet: WalletsEntity) {
        return this.manager.save(wallet);
    }
}
