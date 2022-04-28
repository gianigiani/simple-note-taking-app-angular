import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  collection,
  collectionData,
  Firestore,
  query,
  addDoc,
  deleteDoc,
  doc,
  where,
} from '@angular/fire/firestore';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories$: Observable<Category[]>;

  constructor(private readonly firestore: Firestore) {}

  getCategories(userUid: string): Observable<Category[]> {
    const categoryCollection = query(
      collection(this.firestore, 'categories'),
      where('userUid', '==', userUid)
      // push id for single note
    ).withConverter<Category>({
      fromFirestore: (snapshot) => {
        const { name, userUid } = snapshot.data();
        const { id } = snapshot;
        return { id, name, userUid };
      },
      toFirestore: (elem: any) => elem,
    });
    this.categories$ = collectionData<Category>(categoryCollection);
    return this.categories$;
  }

  async addNewCategory(category: Category, userUid: string) {
    return await addDoc(collection(this.firestore, 'categories'), {
      name: category.name,
      userUid,
    });
  }

  async deleteSingleCategory(id: string) {
    return await deleteDoc(doc(this.firestore, `categories/${id}`));
  }
}
