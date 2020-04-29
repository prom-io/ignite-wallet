import {EntityManager, EntityRepository, Repository} from "typeorm";
import {Wallets} from "../entities/Wallets";
import {WalletTypes} from "../enums/wallet.types";
import {User} from "../entities/User";

@EntityRepository()
export class UserRepository {

    constructor(private manager: EntityManager) {}

    public findOne(username: string): Promise<User | undefined> {
        return this.manager.findOne(User, { where: { username } });
    }
}
