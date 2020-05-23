import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('transfers')
export class Transfer {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'from' })
    public from: string;

    @Column({ name: 'to' })
    public to: string;

    @Column({ name: 'value' })
    public value: number;

    @Column({ name: 'status' })
    public status: string;

    @Column({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;
}
