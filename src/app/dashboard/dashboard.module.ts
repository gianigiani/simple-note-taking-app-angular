import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddNoteComponent } from '../add-note/add-note.component';
import { DashboardComponent } from './dashboard.component';
import { NoteComponent } from '../note/note.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { InputModule } from '../utils/input/input.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AddNoteComponent,
    DashboardComponent,
    NoteComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    InputModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
  ],
})
export class DashboardModule {}
