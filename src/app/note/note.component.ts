import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../models/Note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  @Input() note: Note | null = null;
  @Output('delete') deleteClicked = new EventEmitter();

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {}

  onDelete() {
    this.deleteClicked.emit();
  }
}
