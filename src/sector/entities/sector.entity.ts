import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: "sector", schema: "help_desk"})
export class SectorEntity{
    @PrimaryGeneratedColumn()
    sector_id: number

    @Column({name: "name", type: "varchar", length: 255, nullable: false})
    name: string
}
