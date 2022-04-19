import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { CategoriesService } from '../services/categories.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  userUid: string;
  // categories: string[] = ['Reminders', 'Shopping List', 'Todo'];

  categories: any[];

  noteForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private notesService: NotesService,
    private authService: AuthService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((item) => {
      if (item) {
        this.userUid = item.uid;
      }
    });

    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
    });
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      return;
    }

    this.notesService
      .addNewNote(this.noteForm.value, this.userUid)
      .then(() => {
        this.noteForm.reset();
        this.router.navigateByUrl('/');
      })
      .catch((err) => {
        if (!err.status) {
          this.noteForm.setErrors({ noConnection: true });
        } else {
          this.noteForm.setErrors({ unknownError: true });
        }
      });
  }

  onCancel() {
    this.noteForm.reset();
    this.router.navigateByUrl('');
  }

  getSingleDocData() {
    // get id from route
    // const singleNote =  this.notesService.getSingleDoc(id);
    // console.log(singleNote.data());
  }
}
