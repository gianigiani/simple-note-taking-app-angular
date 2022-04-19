import { Component, OnInit } from '@angular/core';
import { Note } from '../models/Note';
import { NotesService } from '../services/notes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  notes: Note[];
  showCategory: boolean = false;
  categories: any[];

  categoryForm = new FormGroup({
    category: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private notesService: NotesService,
    private categoriesService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
    });

    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
      console.log(categories);
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
    console.log('go to the /new/:id and show the content of the note');
    // this.router.navigateByUrl(`/note/:${id}`);
    // get docData after id and populate the form
  }

  onNewCategory() {
    this.showCategory = !this.showCategory;
    this.categoryForm.reset();
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }

    this.categoriesService
      .addNewCategory(this.categoryForm.value)
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
