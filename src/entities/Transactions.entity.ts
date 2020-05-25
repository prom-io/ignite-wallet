import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('transactions')
export class TransactionsEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'from' })
    public from: string;

    @Column({ name: 'to' })
    public to: string;

    @Column({ name: 'value' })
    public value: string;

    @Column({ name: 'transaction_hash' })
    public transactionHash: string;

    @Column({ type: 'jsonb', name: 'raw_transaction' })
    public rawTransaction: object;

    @Column({ name: 'type' })
    public type: string;

    @Column({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;
}
