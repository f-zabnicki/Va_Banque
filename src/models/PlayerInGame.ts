import { Guid } from "guid-typescript";
import { Player } from "./Player";

export interface PlayerInGame{
    id: Guid;
    player: Player;
    points: number;
}