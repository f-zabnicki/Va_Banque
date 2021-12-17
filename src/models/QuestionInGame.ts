import { Guid } from "guid-typescript";
import { QuestionStatus } from "./QestionStatus";
import { Question } from "./Question";
import { QuestionTest } from "./questionTest";

export interface QuestionInGame{
    id: Guid;
    question: QuestionTest;
    status: QuestionStatus;
}