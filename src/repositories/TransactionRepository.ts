import {EntityManager, EntityRepository, Repository} from "typeorm";
import {Transactions} from "../entities/Transactions";

@EntityRepository()
export class TransactionRepository {

    constructor(private manager: EntityManager) {}

    public save(transaction: Transactions) {
        return this.manager.save(transaction);
    }
}
