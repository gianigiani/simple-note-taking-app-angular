import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../models/Note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note | null = null;
  @Output('delete') deleteClicked = new EventEmitter();
  @Output('edit') editClicked = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onEdit() {
    this.editClicked.emit();
  }

  onDelete() {
    this.deleteClicked.emit();
  }
}
