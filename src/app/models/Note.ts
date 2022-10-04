import { Category } from './Category';

export interface Note {
  id?: string;
  title: string;
  category: string;
  content: string;
  createdAt?: Date;
  userUid?: string;
}
