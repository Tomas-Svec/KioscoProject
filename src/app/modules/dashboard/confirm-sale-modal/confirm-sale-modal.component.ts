import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {CompleteSaleDto} from '../../../core/services/CompleteSaleDto';



@Component({
  selector: 'app-confirm-sale-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatListModule, // Necesario si usas MatDialog
  ],
  templateUrl: './confirm-sale-modal.component.html',
  styleUrl: './confirm-sale-modal.component.css'
})
export class ConfirmSaleModalComponent {
  @Input() saleData!: { items: any[], total: number, user: any, date: Date };
  @Output() confirmSale = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ConfirmSaleModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { items: any[], total: number, user: any, date: Date }
  ) {
    this.saleData = data; // Asigna los datos recibidos
  }

  confirm(): void {
    if (!this.saleData || !this.saleData.items || this.saleData.items.length === 0) {
      console.error('No se pueden confirmar ventas sin productos.');
      return;
    }
    this.confirmSale.emit(this.saleData); // Emite los datos de la venta
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
  
}
