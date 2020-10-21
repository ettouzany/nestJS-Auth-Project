import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Entite extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @Column()
    code: string;

    @ManyToOne(type => User, user=>user.entites,{eager:false})
    user: User;

    @Column()
    userId: number;
}