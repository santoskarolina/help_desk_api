import { StatusEnum } from "src/models/status.enum"
import { SectorEntity } from "src/sector/entities/sector.entity"
import { SolicitationEntity } from "../solicitation.entity"

export class SolicitationDTO{
    code: string
    was_solved: boolean
    description: string
    status: StatusEnum
    sector: SectorEntity
    created_at: Date
    user: { 
        id: string;
        name: string
    }

    constructor(solicitation: SolicitationEntity){
        this.code =  solicitation.code
        this.created_at =  solicitation.created_at
        this.was_solved = solicitation.was_solved
        this.description = solicitation.description
        this.status = solicitation.status
        this.sector = solicitation.sector
        this.user = { id: solicitation.user_requested.id, name: solicitation.user_requested.name }
    }
}