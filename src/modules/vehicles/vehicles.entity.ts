import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    ManyToOne,
    OneToMany
} from "typeorm";
import { User } from "../users/users.entity";

@Entity()
export class VehicleCategory {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    categoryName: string;
    @Column('boolean', { default: true })
    isEnabled: boolean;
    @Column('boolean', { default: false })
    isDeleted: boolean;
    @Column({ nullable: true })
    createdBy: string;
    @Column({ nullable: true })
    modifiedBy: string;
    @CreateDateColumn()
    createdOn: string;
    @UpdateDateColumn()
    modifiedOn: string;

    @OneToMany(() => VehicleType, (type) => type.vehicleCategory)
    vehicleTypes: VehicleType[]

    @AfterInsert()
    logInsert() {
        console.log(`Vehicle Category Added --> ${this.categoryName}`);
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`Vehicle Category Updated --> ${this.categoryName}`);
    }
    @AfterRemove()
    logRemove() {
        console.log(`Vehicle Category Removed --> ${this.categoryName}`);
    }
}

@Entity()
export class VehicleType {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    typeName: string;
    @Column()
    imageUrl: string;
    @Column()
    adultSeatCount: number;
    @Column()
    childSeatCount: number;
    @Column()
    luggageCount: number;
    @Column('boolean', { default: true })
    isEnabled: boolean;
    @Column('boolean', { default: false })
    isDeleted: boolean;
    @CreateDateColumn()
    createdOn: string;
    @UpdateDateColumn()
    modifiedOn: string;

    @ManyToOne(() => VehicleCategory, (category) => category.vehicleTypes, { eager: true })
    vehicleCategory: VehicleCategory

    @ManyToOne(() => User, (user) => user.vehicleType, { eager: true })
    createdBy: User

    @ManyToOne(() => User, (user) => user.vehicleType, { eager: true })
    modifiedBy: User

    @AfterInsert()
    logInsert() {
        console.log(`Vehicle Type Added --> ${this.typeName}`);
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`Vehicle Type Updated --> ${this.typeName}`);
    }
    @AfterRemove()
    logRemove() {
        console.log(`Vehicle Type Removed --> ${this.typeName}`);
    }
}