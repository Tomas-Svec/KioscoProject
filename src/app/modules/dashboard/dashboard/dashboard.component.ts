/* src/app/modules/dashboard/dashboard/dashboard.component.ts */
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ThemeService } from '../../../core/services/theme.service';
import { ManageStockComponent } from "../../manage-stock/manage-stock/manage-stock.component";
import { AddSaleModalComponent } from "../../add-sale-modal/add-sale-modal.component";
import { MatDialog } from '@angular/material/dialog';
import { RouteNavigatorService } from '../../../core/services/route-navigator.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { DiscountModalComponent } from '../discount-modal/discount-modal.component';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ManageStockComponent,
    AddSaleModalComponent,
    DiscountModalComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isDarkMode: boolean = false;
  ventas: any[] = []; // Historial de ventas
  cartItems: any[] = []; // Productos en el carrito
  total: number = 0; // Total de la venta actual
  productos: any[] = []; // Productos en stock
  

  constructor(
    private authService: AuthService,
    public dialog: MatDialog,
    private routeNavigator: RouteNavigatorService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loadSalesHistory(); // Cargar historial de ventas
  }

   // Método para agregar un producto al carrito
onProductAdded(product: any): void {
  console.log('Producto agregado:', product);

  // Verificar si el producto ya existe en el carrito
  const existingItem = this.cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.cantidad += product.cantidad; // Incrementa la cantidad
  } else {
    this.cartItems.push({ ...product, stock: product.stock }); // Agrega el producto con su stock
  }

  // Actualizar el total
  this.calculateTotal();
  console.log('Carrito:', this.cartItems);
}
  
    // Método para calcular el total del carrito
    calculateTotal(): void {
      this.total = this.cartItems.reduce(
        (sum, item) => sum + item.precio * item.cantidad,
        0
      );
    }


  // Método para eliminar un producto del carrito
removeFromCart(item: any): void {
  this.cartItems = this.cartItems.filter((i) => i.id !== item.id);
  this.calculateTotal();
}

// Método para aplicar descuento
applyDiscount(item: any): void {
  const dialogConfig = {
    width: '400px',
    data: item // Pasa el producto seleccionado al modal
  };

  const dialogRef = this.dialog.open(DiscountModalComponent, dialogConfig);

  dialogRef.afterClosed().subscribe((result) => {
    if (result) {
      this.applyDiscountToProduct(result.product, result.discount);
    }
  });
}

// Método para aplicar o limpiar el descuento al precio del producto
applyDiscountToProduct(product: any, discount: number | null): void {
  if (discount !== null) {
    // Aplicar descuento
    const originalPrice = product.precioOriginal || product.precio; // Usar el precio original si existe
    const discountAmount = (originalPrice * discount) / 100;
    product.precio = originalPrice - discountAmount;

    // Guardar el precio original si no está guardado
    if (!product.precioOriginal) {
      product.precioOriginal = originalPrice;
    }

    console.log(`Descuento aplicado: ${discount}%`);
    console.log(`Nuevo precio: $${product.precio.toFixed(2)}`);
  } else {
    // Limpiar descuento
    if (product.precioOriginal) {
      product.precio = product.precioOriginal; // Restaurar el precio original
      delete product.precioOriginal; // Eliminar la referencia al precio original
      console.log('Descuento limpiado. Precio restaurado.');
    }
  }

  this.calculateTotal(); // Actualiza el total del carrito
}





   // Cargar historial de ventas
   loadSalesHistory(): void {
    //this.apiService.getSales().subscribe(
      //(data: any[]) => {
        //this.ventas = data;
      //},
     //(error) => {
        //console.error('Error al cargar historial de ventas:', error);
      //}
    //);
  }
  

  // Abrir modal de nueva venta
  openNewSaleModal(): void {
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)');
    const dialogConfig = {
      width: isMobile ? '95%' : '80%',
      height: isMobile ? '95%' : '80%',
      maxWidth: isMobile ? 'none' : '1200px',
      maxHeight: isMobile ? 'none' : '90vh',
      panelClass: 'custom-dialog-container',
    };
  
    // Abre el modal y escucha los resultados
    const dialogRef = this.dialog.open(AddSaleModalComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onProductAdded(result); // Maneja el producto agregado
      }
    });
  }

  
// Método para aumentar la cantidad de un producto con validación de stock
incrementQuantity(item: any): void {
  if (item.cantidad < item.stock) {
    item.cantidad += 1; // Incrementa la cantidad si hay suficiente stock
    this.calculateTotal(); // Actualiza el total
  } else {
    alert('No hay suficiente stock para este producto.');
    console.log('No hay suficiente stock para:', item);
  }
}

// Método para disminuir la cantidad de un producto
decrementQuantity(item: any): void {
  if (item.cantidad > 1) {
    item.cantidad -= 1; // Disminuye la cantidad si es mayor que 1
    this.calculateTotal(); // Actualiza el total
  }
}

  
  //Modal del stock
  openManageStockModal(): void {
    const isMobile = this.breakpointObserver.isMatched('(max-width: 768px)'); // Detecta si es móvil

    const dialogConfig = {
      width: isMobile ? '95%' : '80%', // Ancho para móviles y escritorios
      height: isMobile ? '95%' : '80%', // Altura para móviles y escritorios
      maxWidth: isMobile ? 'none' : '1200px', // Máximo ancho (ninguno para móviles)
      maxHeight: isMobile ? 'none' : '90vh', // Máxima altura (ninguna para móviles)
      panelClass: 'custom-dialog-container', // Clase personalizada
    };

    this.dialog.open(ManageStockComponent, dialogConfig);
  }




  logout(): void {
    this.authService.logout();
    window.location.href = '/auth/login';
  }

  
}

