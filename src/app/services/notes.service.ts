import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, user, User } from '@angular/fire/auth';
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
  where,
} from '@angular/fire/firestore';

import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public notes$: Observable<Note[]>;
  public user: Observable<User | null>;

  constructor(private readonly firestore: Firestore) {}

  getNotes(): Observable<Note[]> {
    const notesCollection = query(
      collection(this.firestore, 'notes'),
      where('userUid', '==', 'v3qHNjymPKaU3EEkH5PqKKpHoYw1'),
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
      toFirestore: (it: any) => it,
    });
    this.notes$ = collectionData(notesCollection);
    return this.notes$;
  }

  async addNote(note: Note, userUid: string) {
    return await addDoc(collection(this.firestore, 'notes'), {
      title: note.title,
      content: note.content,
      category: 'food',
      createdAt: serverTimestamp(),
      userUid,
    });
  }

  async deleteNote(id: string) {
    return await deleteDoc(doc(this.firestore, `notes/${id}`));
  }

  filterNotes() {
    const notesCollection = query(
      collection(this.firestore, 'notes'),
      where('userUid', '==', 'v3qHNjymPKaU3EEkH5PqKKpHoYw1'),
      orderBy('createdAt', 'desc')
      // push id for single note
    ).withConverter<Note>({
      fromFirestore: (snapshot) => {
        const { content, userUid, createdAt, category, title } =
          snapshot.data();
        const { id } = snapshot;
        return { id, content, userUid, createdAt, category, title };
      },
      toFirestore: (it: any) => it,
    });
    this.notes$ = collectionData(notesCollection);
    return this.notes$;
  }
}
