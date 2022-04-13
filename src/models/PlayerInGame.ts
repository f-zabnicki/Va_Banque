import { Guid } from "guid-typescript";
import { Player } from "./Player";

export interface PlayerInGame{
    id: string;
    player: Player;
    points: number;
}