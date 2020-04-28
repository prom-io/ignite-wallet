import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Transactions {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'from' })
    public from: string;

    @Column({ name: 'to' })
    public to: string;

    @Column({ name: 'value' })
    public value: string;

    @Column({ name: 'type' })
    public type: string;

    @Column({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;
}
