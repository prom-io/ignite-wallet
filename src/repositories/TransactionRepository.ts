import {EntityManager, EntityRepository, Repository} from "typeorm";
import {Transactions} from "../entities/Transactions";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
@EntityRepository()
export class TransactionRepository {

    constructor(private manager: EntityManager) {}

    public save(transaction: Transactions) {
        return this.manager.save(transaction);
    }

    async paginate(address: string, options: IPaginationOptions): Promise<Pagination<Transactions>> {
        const queryBuilder = this.manager.createQueryBuilder(Transactions, 'c');
        queryBuilder
            .where('c.from = :from')
            .orWhere('c.to = :to')
            .setParameters({ from: address, to: address });
        return paginate<Transactions>(queryBuilder, options);
    }
}
