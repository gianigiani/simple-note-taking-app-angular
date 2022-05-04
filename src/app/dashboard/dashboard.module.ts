import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AddNoteComponent } from '../add-note/add-note.component';
import { DashboardComponent } from './dashboard.component';
import { CategoryComponent } from '../category/category.component';
import { NoteComponent } from '../note/note.component';
import { NotFoundComponent } from '../not-found/not-found.component';
import { InputModule } from '../utils/input/input.module';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddCategoryComponent } from '../add-category/add-category.component';

@NgModule({
  declarations: [
    AddNoteComponent,
    DashboardComponent,
    NoteComponent,
    CategoryComponent,
    AddCategoryComponent,
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
    MatTooltipModule,
    MatSnackBarModule,
  ],
})
export class DashboardModule {}
