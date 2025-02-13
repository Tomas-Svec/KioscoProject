import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// Material Design
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-confirm-sale-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule, // Necesario si usas MatDialog
    BrowserAnimationsModule
  ],
  templateUrl: './confirm-sale-modal.component.html',
  styleUrl: './confirm-sale-modal.component.css'
})
export class ConfirmSaleModalComponent {
  @Input() saleData!: { items: any[], total: number, user: any, date: Date };
  @Output() confirmSale = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<ConfirmSaleModalComponent>) {}
}
