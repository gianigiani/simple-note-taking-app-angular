import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from '../models/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  @Input() category: Category;
  @Output('delete') deleteCategoryClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDeleteCategory() {
    this.deleteCategoryClicked.emit();
  }
}
