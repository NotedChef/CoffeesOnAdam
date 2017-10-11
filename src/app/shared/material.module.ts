import { NgModule } from '@angular/core';

import { MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatListModule,
  MdTabsModule,
  MdChipsModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatDialogModule,
  MatAutocompleteModule
 } from '@angular/material';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatListModule,
  MdTabsModule,
  MdChipsModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatDialogModule,
  MatAutocompleteModule
],
  exports: [MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatListModule,
  MdTabsModule,
  MdChipsModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatDialogModule,
  MatAutocompleteModule
  ],
  declarations: [SidenavComponent],
})
export class MaterialModule { }

