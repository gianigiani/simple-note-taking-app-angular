import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth/auth.service';
import { NotesService } from '../services/notes.service';
import { CategoriesService } from '../services/categories.service';
import { Category } from '../models/Category';
import { Note } from '../models/Note';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  userUid: string | null;
  categories: Category[];
  note: Note;
  newNote: boolean = false;
  noteForm: FormGroup;
  noteId: string | null;

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      category: new FormControl([], [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });

    // Find if we create a new note or modify an existing one
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
        this.newNote = false;
        this.noteId = params['id'];

        // Get single note data
        this.getSingleDocData(this.noteId);
      } else {
        this.newNote = true;
      }
    });

    this.authService.user$
      .pipe(map((user) => user.uid))
      .subscribe((userUid) => {
        if (userUid) {
          this.userUid = userUid;
        }
        this.categoriesService
          .getCategories(userUid)
          .subscribe((categories) => {
            this.categories = categories;
          });
      });
  }

  getSingleDocData(noteId: string) {
    const getSingleDocumentData = this.notesService.getSingleDoc(noteId);
    const obsGetSingleDocData$ = from(getSingleDocumentData);

    obsGetSingleDocData$.subscribe({
      next: (note) => {
        this.note = note.data();

        // Assign the new values to noteForm
        // "Hack" to read the data, needs to be changed later
        this.noteForm.patchValue({
          title: this.note.title,
          category: this.note.category,
          content: this.note.content,
        });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.log('Get single doc data COMPLETED'),
    });
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      return;
    }
    if (this.newNote) {
      // Save new note
      const addNote = this.notesService.addNewNote(
        this.noteForm.value,
        this.userUid
      );
      const obsAddNote$ = from(addNote);
      obsAddNote$.subscribe({
        next: () => {
          this.noteForm.reset();
          this.router.navigateByUrl('/');
          this.newNote = false;

          this._snackBar.open('New note added', '', {
            duration: 3000,
          });
        },
        error: (err) => {
          if (!err.status) {
            this.noteForm.setErrors({ noConnection: true });
          } else {
            this.noteForm.setErrors({ unknownError: true });
          }
        },
        complete: () => console.log('adding new note competed'),
      });
    } else {
      // Update existing note
      const updateNote = this.notesService.updateNote(
        this.noteForm.value,
        this.noteId
      );
      const obsUpdateNote$ = from(updateNote);

      obsUpdateNote$.subscribe({
        next: () => {
          this.noteForm.reset();
          this.router.navigateByUrl('/');
          this.newNote = false;

          this._snackBar.open('Note was updated', '', {
            duration: 3000,
          });
        },
        error: (err) => {
          if (!err.status) {
            this.noteForm.setErrors({ noConnection: true });
          } else {
            this.noteForm.setErrors({ unknownError: true });
          }
        },
        complete: () => console.log('Update note COMPLETED'),
      });
    }
  }

  onCancel() {
    this.noteForm.reset();
    this.router.navigateByUrl('');
  }
}
