import {BeforeInsert, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {hash} from 'bcrypt';

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column({default: false})
    isAdmin: boolean

    @Column({ type: 'timestamp' })
    canRental?: Date

    @Column({select: false})
    password: string;

    @BeforeInsert()
    async hashPassword(){
        this.password = await hash(this.password, 10)
    }

}
