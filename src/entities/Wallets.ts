import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Wallets {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ name: 'address' })
    public address: string;

    @Column({ name: 'public_key' })
    public publicKey: string;

    @Column({ name: 'private_key' })
    public privateKey: string;

    @Column({ name: 'type' })
    public type: string;

    @Column({ type: 'timestamp', name: 'created_at' })
    public createdAt: Date;
}
