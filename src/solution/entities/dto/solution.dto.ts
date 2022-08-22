import {SolutionEntity} from "../solution.entity";

export type SolutionCreate = Pick<SolutionEntity, "description" | "user" | "solicitation">
