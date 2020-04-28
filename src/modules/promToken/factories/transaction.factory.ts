import {Transactions} from "../../../entities/Transactions";
import {TransactionTypes} from "../../../enums/transaction.types";

export class TransactionFactory {
    public createTransferTransaction(dto: TransactionDto) {
        const transaction = TransactionFactory.build(dto);
        transaction.type = TransactionTypes.TRANSFER;
        return transaction;
    }

    private static build(dto: TransactionDto): Transactions {
        const transaction = new Transactions();
        transaction.from = dto.from;
        transaction.to = dto.to;
        transaction.value = dto.value;
        transaction.createdAt = new Date();
        return transaction;
    }
}
