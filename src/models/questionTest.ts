import { Guid } from 'guid-typescript';
import { Category } from './category';

export interface QuestionTest {
    id: Guid;
    content: string;
    answer: string;
    categoryId: Guid;
    points: number;
}
