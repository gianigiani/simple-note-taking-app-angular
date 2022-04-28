import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Category } from '../models/Category';
import { Note } from '../models/Note';
import { CategoriesService } from '../services/categories.service';
import { NotesService } from '../services/notes.service';

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
    private route: ActivatedRoute
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

    this.authService.user$.subscribe((item) => {
      if (item) {
        this.userUid = item.uid;
      }
      this.categoriesService.getCategories(item.uid).subscribe((categories) => {
        this.categories = categories;
      });
    });
  }

  getSingleDocData(noteId: string) {
    this.notesService.getSingleDoc(noteId).then((note) => {
      this.note = note.data();

      // Assign the new values to noteForm
      // "Hack" to make read tha data, needs to be changed later
      this.noteForm.patchValue({
        title: this.note.title,
        category: this.note.category,
        content: this.note.content,
      });
    });
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      return;
    }
    if (this.newNote) {
      // Save new note
      this.notesService
        .addNewNote(this.noteForm.value, this.userUid)
        .then(() => {
          this.noteForm.reset();
          this.router.navigateByUrl('/');
          this.newNote = false;
        })
        .catch((err) => {
          if (!err.status) {
            this.noteForm.setErrors({ noConnection: true });
          } else {
            this.noteForm.setErrors({ unknownError: true });
          }
        });
    } else {
      // Update existing note
      this.notesService
        .updateNote(this.noteForm.value, this.noteId)
        .then(() => {
          this.noteForm.reset();
          this.router.navigateByUrl('/');
          this.newNote = false;
        })
        .catch((err) => {
          if (!err.status) {
            this.noteForm.setErrors({ noConnection: true });
          } else {
            this.noteForm.setErrors({ unknownError: true });
          }
        });
    }
  }

  onCancel() {
    this.noteForm.reset();
    this.router.navigateByUrl('');
  }
}
