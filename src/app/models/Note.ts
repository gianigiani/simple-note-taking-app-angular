import { Category } from './Category';

export interface Note {
  id?: string;
  title: string;
  category: Category;
  content: string;
  createdAt?: Date;
  userUid?: string;
}
