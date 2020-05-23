import {EntityManager, EntityRepository} from "typeorm";
import {Transfer} from "../entities/Transfer";
import {TransferEnum} from "../modules/promToken/enums/transfer.enum";
import {IPaginationOptions, Pagination, paginate} from "nestjs-typeorm-paginate/index";
import {Transactions} from "../entities/Transactions";

@EntityRepository()
export class TransferRepository {

    constructor(private manager: EntityManager) {}

    public save(transfer: Transfer) {
        return this.manager.save(transfer);
    }

    public allPendingTransactions(): Promise<Transfer[]> {
        return this.manager.find(Transfer, { status: TransferEnum.PENDING });
    }

    public allGasAddedTransactions(): Promise<Transfer[]> {
        return this.manager.find(Transfer, { status: TransferEnum.GAS_ADD });
    }

    async paginate(address: string, options: IPaginationOptions): Promise<Pagination<Transfer>> {
        const queryBuilder = this.manager.createQueryBuilder(Transfer, 'c');
        queryBuilder
            .where('c.from = :from')
            .setParameters({ from: address });
        return paginate<Transfer>(queryBuilder, options);
    }
}
