import { Component, OnInit } from '@angular/core';
import { Note } from '../models/Note';
import { NotesService } from '../services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  notes: Note[];

  constructor(private notesService: NotesService, private router: Router) {}

  ngOnInit(): void {
    this.notesService.getNotes().subscribe((notes) => {
      this.notes = notes;
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
}
