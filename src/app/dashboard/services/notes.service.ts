import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
  getDoc,
  where,
  updateDoc,
} from '@angular/fire/firestore';

import { Note } from '../../models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public notes$: Observable<Note[]>;

  constructor(private readonly firestore: Firestore) {}

  getNotes(userUid: string): Observable<Note[]> {
    const notesCollection = query(
      collection(this.firestore, 'notes'),
      where('userUid', '==', userUid),
      orderBy('category', 'asc'),
      orderBy('createdAt', 'desc')
      // push id for single note
    ).withConverter<Note>({
      fromFirestore: (snapshot) => {
        const { content, userUid, createdAt, category, title } =
          snapshot.data();
        const { id } = snapshot;

        return { id, content, userUid, createdAt, category, title };
      },
      toFirestore: (elem: Note) => elem,
    });
    this.notes$ = collectionData<Note>(notesCollection);
    return this.notes$;
  }

  async getSingleDoc(id: string) {
    return await getDoc<any>(doc(this.firestore, `notes/${id}`));
  }

  async addNewNote(note: any, userUid: string) {
    return await addDoc(collection(this.firestore, 'notes'), {
      title: note.title,
      content: note.content,
      category: note.category.name,
      createdAt: serverTimestamp(),
      userUid,
    });
  }

  async updateNote(note: Note, id: string) {
    return await updateDoc(doc(this.firestore, `notes/${id}`), {
      title: note.title,
      content: note.content,
      category: note.category,
    });
  }

  async deleteNote(id: string) {
    return await deleteDoc(doc(this.firestore, `notes/${id}`));
  }

  //filter
  // TODO: implement filter for different categories, createdAt, asc and desc
  filterNotes() {
    const notesCollection = query(
      collection(this.firestore, 'notes'),
      orderBy('createdAt', 'desc')
      // push id for single note
    ).withConverter<Note>({
      fromFirestore: (snapshot) => {
        const { content, userUid, createdAt, category, title } =
          snapshot.data();
        const { id } = snapshot;
        return { id, content, userUid, createdAt, category, title };
      },
      toFirestore: (elem: Note) => elem,
    });
    this.notes$ = collectionData<Note>(notesCollection);
    return this.notes$;
  }
}
