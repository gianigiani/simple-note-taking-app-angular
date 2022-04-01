import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { traceUntilFirst } from '@angular/fire/performance';
import { Auth, user, User } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  Firestore,
  orderBy,
  query,
  serverTimestamp,
} from '@angular/fire/firestore';

import { Note } from '../models/Note';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  public readonly note: Observable<Note[]>;
  public user: Observable<User | null>;
  auth: { email: string; uid: string };

  constructor(private readonly firestore: Firestore, auth: Auth) {
    this.user = auth
      ? user(auth).pipe(shareReplay({ bufferSize: 1, refCount: false }))
      : of(null);

    const notesCollection = collection(firestore, 'notes').withConverter<Note>({
      fromFirestore: (snapshot) => {
        const { content, uuid } = snapshot.data();
        const { id } = snapshot;
        return { id, content, uuid };
      },
      toFirestore: (it: any) => it,
    });
    const notesQuery = query(notesCollection, orderBy('createdAt', 'desc'));

    this.note = collectionData(notesQuery).pipe(traceUntilFirst('notes'));
  }

  async addNote(note: Note, uuid: string) {
    return await addDoc(collection(this.firestore, 'notes'), {
      content: note.content,
      uuid: uuid,
      createdAt: serverTimestamp(),
    });
  }
}
