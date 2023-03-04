import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    OneToMany
} from "typeorm";
import { VehicleType } from "../vehicles/vehicles.entity";


@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
    @Column({ nullable: false })
    roleId: string;
    @Column({ nullable: false })
    firstName: string;
    @Column()
    middleName: string;
    @Column()
    lastName: string;
    @Column({ nullable: false })
    email: string;
    @Column({ nullable: false })
    username: string;
    @Column('boolean', { default: false })
    emailVerified: boolean;
    @Column('boolean', { default: false })
    phoneVerified: boolean;
    @Column('boolean', { default: true })
    isEnabled: boolean;
    @Column('boolean', { default: false })
    isDeleted: boolean;
    @Column({ nullable: true })
    saltKey: string;
    @Column({ nullable: true })
    secretHash: string;
    @Column({ nullable: true })
    createdBy: string;
    @Column({ nullable: true })
    modifiedBy: string;
    @CreateDateColumn()
    createdOn: string;
    @UpdateDateColumn()
    modifiedOn: string;

    @OneToMany(() => VehicleType, (vehicleType => vehicleType.createdBy))
    vehicleType: VehicleType[]

    @AfterInsert()
    logInsert() {
        console.log(`User Added --> ${this.email}`);
    }
    @AfterUpdate()
    logUpdate() {
        console.log(`User Updated --> ${this.email}`);
    }
    @AfterRemove()
    logRemove() {
        console.log(`User Removed --> ${this.email}`);
    }
}
