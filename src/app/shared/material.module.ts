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
  MatFormFieldModule
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
  MatFormFieldModule
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
  MatFormFieldModule],
})
export class MaterialModule { }

