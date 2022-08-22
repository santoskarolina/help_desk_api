import {SolicitationEntity} from "../solicitation.entity";

export type SolicitationCreate = Pick<SolicitationEntity, "description" | "user_requested" | "was_solved" | "sector" | "code"|
    "status">
