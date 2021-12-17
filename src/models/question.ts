import { Guid } from 'guid-typescript';
import { Category } from './category';

export interface Question {
    id: Guid;
    content: string;
    answer: string;
    category: Category;
    points: number;
}
