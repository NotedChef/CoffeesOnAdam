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
  MatSlideToggleModule
 } from '@angular/material';

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
  MatSlideToggleModule
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
  MatSlideToggleModule],
})
export class MaterialModule { }

