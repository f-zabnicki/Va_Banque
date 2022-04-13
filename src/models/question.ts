import { Guid } from 'guid-typescript';
import { Category } from './category';

export interface Question {
    id: string;
    content: string;
    answer: string;
    category: Category;
    points: number;
}
