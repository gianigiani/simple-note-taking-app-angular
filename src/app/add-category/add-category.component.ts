import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { CategoriesService } from '../services/categories.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  @Input() userUid: string;

  categoryForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
  });

  constructor(
    private categoriesService: CategoriesService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.categoryForm.invalid) {
      return;
    }
    console.log(this.categoryForm.value);
    from(
      this.categoriesService.addNewCategory(
        this.categoryForm.value,
        this.userUid
      )
    ).subscribe({
      next: () => {
        this.categoryForm.reset();
        this._snackBar.open('New category added', '', {
          duration: 3000,
        });
      },
      error: (err) => {
        if (!err.status) {
          this.categoryForm.setErrors({ noConnection: true });
        } else {
          this.categoryForm.setErrors({ unknownError: true });
        }
      },
      complete: () => console.log('Add new category COMPLETED'),
    });
  }
}
