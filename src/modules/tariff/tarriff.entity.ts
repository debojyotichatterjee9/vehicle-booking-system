import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    ManyToMany,
    JoinTable
} from "typeorm";
import {VehicleCategory} from "../vehicles/vehicles.entity";

@Entity()
export class FixedTariff {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column()
    fromLocation: string;
    @Column()
    toLocation: string;
    @Column()
    vehicleCategoryId: string;
    @Column()
    tariff: number;
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

    @ManyToMany(() => VehicleCategory)
    @JoinTable()
    vehicleCategories: VehicleCategory[]

    @AfterInsert()
    logInsert() {
        console.log(`Tariff Added --> ${this.id}`);
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`Tariff Updated --> ${this.id}`);
    }
    @AfterRemove()
    logRemove() {
        console.log(`Tariff Removed --> ${this.id}`);
    }
}