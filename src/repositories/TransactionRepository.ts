import {EntityManager, EntityRepository, Repository} from "typeorm";
import {TransactionsEntity} from "../entities/Transactions.entity";
import {IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";
@EntityRepository()
export class TransactionRepository {

    constructor(private manager: EntityManager) {}

    public save(transaction: TransactionsEntity) {
        return this.manager.save(transaction);
    }

    async paginate(address: string, options: IPaginationOptions): Promise<Pagination<TransactionsEntity>> {
        const queryBuilder = this.manager.createQueryBuilder(TransactionsEntity, 'c');
        queryBuilder
            .where('c.from = :from')
            .orWhere('c.to = :to')
            .setParameters({ from: address, to: address });
        return paginate<TransactionsEntity>(queryBuilder, options);
    }
}
