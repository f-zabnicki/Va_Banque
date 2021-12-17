import { Category } from "./category";
import { Player } from "./Player";

export interface GameToCreateData{
    players: Player[];
    categories: Category[];
}