import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {TransactionsEntity} from "../../../entities/Transactions.entity";
import {Repository} from "typeorm";
import {IPaginationOptions, Pagination} from "nestjs-typeorm-paginate";
import {TransactionRepository} from "../../../repositories/TransactionRepository";


@Injectable()
export class TransactionFetcher {
    constructor(
        private readonly repository: TransactionRepository,
    ) {}

    public async getAllTransactionByAddressPaginate(address: string, options: IPaginationOptions): Promise<Pagination<TransactionsEntity>> {
        return this.repository.paginate(address, options);
    }
}
