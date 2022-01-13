import { Guid } from "guid-typescript";

export interface Player {
    id: Guid;
    name: string;
    sumOfPoints: number;
    email?: string;
    password?: string;
}