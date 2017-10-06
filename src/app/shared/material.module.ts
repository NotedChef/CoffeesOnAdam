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
  MdTabsModule
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
  MdTabsModule],
  exports: [MdButtonModule,
  MdMenuModule,
  MdToolbarModule,
  MdIconModule,
  MdCardModule,
  MatInputModule,
  MatSelectModule,
  MatIconModule,
  MatListModule,
  MdTabsModule],
})
export class MaterialModule { }

