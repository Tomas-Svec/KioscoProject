import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { RouteNavigatorService } from '../../../core/services/route-navigator.service';
import { CommonModule, Location } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-stock',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {
  
  @ViewChild('form') form!: NgForm; // Referencia fuerte al formulario

  productos: any[] = [];
  categorias: any[] = [];
  selectedProduct: any = {};
  proveedores: any[] = [];
  showCategoryModal = false; // Controla la visibilidad del modal de categorías
  showProductForm = false; // Controla la visibilidad del formulario de productos
  currentCategory: any = {}; // Objeto para almacenar los datos de la categoría actual
  showModal = false; // Controla la visibilidad del modal general
  

  constructor(
    private apiService: ApiService,
    private routeNavigator: RouteNavigatorService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  

  // Método para cargar productos desde el backend
  loadProducts(): void {
    this.apiService.getProducts().subscribe(
      (data: any[]) => {
        this.productos = data; // Almacena los productos en el array
        console.log('Productos cargados:', this.productos);
      },
      (error) => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  // Cargar categorías desde el backend
  loadCategories(): void {
    this.apiService.getCategories().subscribe(
      (data) => {
        this.categorias = data;
      },
      (error) => {
        console.error('Error al cargar categorías:', error);
      }
    );
  }

  // Lógica para abrir y cerrar el modal general
  openModal() {
    this.showModal = true; // Abre el modal
  }

  closeModal() {
    this.showModal = false; // Cierra el modal
  }

  // Abrir el modal de categorías
  openCategoryModal(): void {
    this.showCategoryModal = true; // Muestra el modal de categorías
    this.currentCategory = {}; // Limpiar la categoría actual
  }

  // Cerrar el modal de categorías
  closeCategoryModal(): void {
    this.showCategoryModal = false; // Cierra el modal de categorías
    this.currentCategory = {}; // Limpiar los datos de la categoría
  }

  

  // Guardar una nueva categoría o actualizar una existente
  saveCategory(): void {
    if (this.currentCategory.id) {
      this.apiService.updateCategory(this.currentCategory.id, this.currentCategory).subscribe(
        () => {
          this.loadCategories(); // Recargar categorías
          this.closeCategoryModal(); // Cerrar el modal
        },
        (error) => {
          console.error('Error al actualizar categoría:', error);
        }
      );
    } else {
      this.apiService.createCategory(this.currentCategory).subscribe(
        () => {
          this.loadCategories(); // Recargar categorías
          this.closeCategoryModal(); // Cerrar el modal
        },
        (error) => {
          console.error('Error al crear categoría:', error);
        }
      );
    }
  }

  // Editar una categoría
  editCategory(category: any): void {
    this.currentCategory = { ...category }; // Copiar los datos de la categoría seleccionada
  }

  // Editar un producto
  editProduct(product: any): void {
    this.selectedProduct = { ...product }; // Copiar los datos del producto seleccionado
    console.log('Producto seleccionado para edición:', this.selectedProduct);
  }

  // Eliminar un producto
  deleteProduct(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.apiService.deleteProduct(id).subscribe(
        () => {
          this.loadProducts(); // Recargar los productos
        },
        (error) => {
          console.error('Error al eliminar producto:', error);
        }
      );
    }
  }

  // Cancelar la edición de una categoría
  cancelCategoryEdit(): void {
    this.currentCategory = {}; // Limpiar el formulario
  }

  // Eliminar una categoría
  deleteCategory(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta categoría?')) {
      this.apiService.deleteCategory(id).subscribe(
        () => {
          this.loadCategories(); // Recargar categorías
        },
        (error) => {
          console.error('Error al eliminar categoría:', error);
        }
      );
    }
  }

  // Obtener el nombre de la categoría por ID
  getCategoriaNombre(id: number): string {
    const categoria = this.categorias.find((c) => c.id === id);
    return categoria ? categoria.nombre : 'Sin categoría';
  }

 

  // Enviar el formulario de producto
  onSubmit(): void {
    if (!this.selectedProduct.categoriaId) {
      alert('Por favor, selecciona una categoría.');
      return;
    }
  
    if (this.selectedProduct.id) {
      this.apiService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe(
        () => {
          this.loadProducts();
          this.selectedProduct = {};
        },
        (error) => {
          console.error('Error al actualizar producto:', error);
        }
      );
    } else {
      this.apiService.createProduct(this.selectedProduct).subscribe(
        () => {
          this.loadProducts();
          this.selectedProduct = {};
        },
        (error) => {
          console.error('Error al crear producto:', error);
        }
      );
    }
  }
}
