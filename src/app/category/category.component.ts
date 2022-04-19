import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

interface Category {
  id: string;
  category: string;
}

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
