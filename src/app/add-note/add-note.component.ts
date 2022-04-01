import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})
export class AddNoteComponent implements OnInit {
  userUid: string;

  noteForm = new FormGroup({
    content: new FormControl('', [Validators.required]),
  });

  constructor(
    private notesService: NotesService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.notesService.user.subscribe((item) => {
      this.userUid = item.uid;
    });
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      return;
    }

    this.notesService
      .addNote(this.noteForm.value, this.userUid)
      .then(() => this.noteForm.reset());
  }
}
