import { Component, OnInit } from '@angular/core';
import { Note } from '../models/Note';
import { NotesService } from '../services/notes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  notes: Note[];
  showCategory: boolean = false;
  categories: any[];
  userUid: string | null;

  categoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private notesService: NotesService,
    private categoriesService: CategoriesService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.userUid = user.uid;
      //get the data only if we have userUid
      this.notesService.getNotes(this.userUid).subscribe((notes) => {
        this.notes = notes;
      });

      this.categoriesService
        .getCategories(this.userUid)
        .subscribe((categories) => {
          this.categories = categories;
        });
    });
  }

  onFilter() {
    return this.notesService
      .filterNotes()
      .subscribe((filteredNotes) => (this.notes = filteredNotes));
  }

  onDelete(id: string) {
    this.notesService.deleteNote(id);
  }

  onAddNewNote() {
    this.router.navigateByUrl('/note');
  }

  onEdit(id: string) {
    this.router.navigateByUrl(`/note/${id}`);
  }

  onNewCategory() {
    this.showCategory = !this.showCategory;
    this.categoryForm.reset();
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }
    console.log(this.categoryForm.value);
    this.categoriesService
      .addNewCategory(this.categoryForm.value, this.userUid)
      .then(() => {
        this.categoryForm.reset();
      })
      .catch((err) => {
        if (!err.status) {
          this.categoryForm.setErrors({ noConnection: true });
        } else {
          this.categoryForm.setErrors({ unknownError: true });
        }
      });
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteSingleCategory(id);
  }
}
