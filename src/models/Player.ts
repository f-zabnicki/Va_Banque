import { Guid } from "guid-typescript";
import { Role } from "./role";

export interface Player {
    id: Guid;
    name: string;
    sumOfPoints: number;
    email?: string;
    password?: string;
    role?: Role;
}