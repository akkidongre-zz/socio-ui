import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app-material.module';

import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [
    AppMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})
export class SharedModule { }
