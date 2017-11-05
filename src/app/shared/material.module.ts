import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatInputModule,
  MatSelectModule,
  MatListModule,
  MatTabsModule,
  MatChipsModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatDialogModule,
  MatAutocompleteModule,
  MatSnackBarModule
} from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  exports: [
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatSnackBarModule
  ],
  declarations: [SidenavComponent]
})
export class MaterialModule {}
