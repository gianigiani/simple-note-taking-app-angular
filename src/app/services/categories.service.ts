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
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  public categories$: Observable<string[]>;

  constructor(private readonly firestore: Firestore) {}

  getCategories(): Observable<string[]> {
    const categoryCollection = query(
      collection(this.firestore, 'categories')
      // push id for single note
    ).withConverter<any>({
      fromFirestore: (snapshot) => {
        const { category } = snapshot.data();
        const { id } = snapshot;
        return { id, category };
      },
      toFirestore: (elem: any) => elem,
    });
    this.categories$ = collectionData<any>(categoryCollection);
    return this.categories$;
  }

  async addNewCategory(category: any) {
    return await addDoc(collection(this.firestore, 'categories'), {
      category: category.category,
    });
  }

  async deleteSingleCategory(id: string) {
    return await deleteDoc(doc(this.firestore, `categories/${id}`));
  }
}
