import { Component, OnInit } from '@angular/core';
import { Note } from '../models/Note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  notes: Note[];

  constructor(private notesService: NotesService) {}

  ngOnInit(): void {
    this.notesService.note.subscribe((item) => {
      this.notes = item;
      console.log(this.notes);
    });
  }
}
