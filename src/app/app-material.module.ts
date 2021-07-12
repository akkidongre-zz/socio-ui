import { NgModule } from "@angular/core";

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    imports: [
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule
    ],
    exports: [
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatToolbarModule
    ]
})
export class AppMaterialModule{ }