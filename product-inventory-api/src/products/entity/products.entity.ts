import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Products{
    @PrimaryGeneratedColumn({
        type: 'integer'
    })
    id: number;
    @Column({
        type: 'varchar',
        length: 200,
        nullable: false
    })
    name: string;
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price: number;
    @Column({
        type: 'integer',
        default: 0,
        nullable: false
    })
    stock: number;
    @Column({
        type: 'varchar',
        length: 100,
        nullable: false
    })
    category: string;
    @Column({
        type: 'boolean',
        default: true,
        nullable: false
    })
    isActive: boolean;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @DeleteDateColumn()
    deletedAt: Date
}