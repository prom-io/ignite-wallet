import {TransactionsEntity} from "../../../entities/Transactions.entity";
import {TransactionTypes} from "../../../enums/transaction.types";

export class TransactionFactory {
    public createTransferTransaction(dto: TransactionDto) {
        const transaction = TransactionFactory.build(dto);
        transaction.type = TransactionTypes.TRANSFER;
        return transaction;
    }

    private static build(dto: TransactionDto): TransactionsEntity {
        const transaction = new TransactionsEntity();
        transaction.from = dto.from;
        transaction.to = dto.to;
        transaction.value = dto.value;
        transaction.createdAt = new Date();
        return transaction;
    }
}
