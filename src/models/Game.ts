import { Guid } from "guid-typescript";
import { PlayerInGame } from "./PlayerInGame";
import { QuestionInGame } from "./QuestionInGame";

export interface Game{
    id: Guid;
    players: PlayerInGame[];
    questions: QuestionInGame[];
    isLive : boolean;
}