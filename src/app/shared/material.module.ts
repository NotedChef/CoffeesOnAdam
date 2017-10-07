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
  MdChipsModule
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
  MdChipsModule],
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
  MdChipsModule],
})
export class MaterialModule { }

