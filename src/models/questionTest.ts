import { Guid } from 'guid-typescript';
import { Category } from './category';

export interface QuestionTest {
    id: string;
    content: string;
    answer: string;
    categoryId: string;
    points: number;
    category: Category
}
