export interface Note {
  id?: string;
  title: string;
  content: string;
  createdAt: Date;
  userUid?: string;
  category: string;
}
