export interface Note {
  id?: string;
  title: string;
  content: string;
  createdAt?: Date;
  userUid?: string;
  category: {
    id: string;
    category: string;
  };
}
