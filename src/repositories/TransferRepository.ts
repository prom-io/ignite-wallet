import {EntityManager, EntityRepository} from "typeorm";
import {TransferEntity} from "../entities/Transfer.entity";
import {TransferEnum} from "../modules/promToken/enums/transfer.enum";
import {IPaginationOptions, Pagination, paginate} from "nestjs-typeorm-paginate/index";
import {TransactionsEntity} from "../entities/Transactions.entity";

@EntityRepository()
export class TransferRepository {

    constructor(private manager: EntityManager) {}

    public save(transfer: TransferEntity) {
        return this.manager.save(transfer);
    }

    public allPendingTransactions(): Promise<TransferEntity[]> {
        return this.manager.find(TransferEntity, { status: TransferEnum.PENDING });
    }

    public allGasAddedTransactions(): Promise<TransferEntity[]> {
        return this.manager.find(TransferEntity, { status: TransferEnum.GAS_ADD });
    }

    async paginate(address: string, options: IPaginationOptions): Promise<Pagination<TransferEntity>> {
        const queryBuilder = this.manager.createQueryBuilder(TransferEntity, 'c');
        queryBuilder
            .where('c.from = :from')
            .setParameters({ from: address });
        return paginate<TransferEntity>(queryBuilder, options);
    }
}
