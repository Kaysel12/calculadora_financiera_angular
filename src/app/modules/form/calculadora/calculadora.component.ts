import { Component, OnInit } from '@angular/core';
import HeaderComponent from '../../../shared/components/header/header.component';
import { ProductService } from '../../../core/services/product.service';
import { CalculadoraService } from '../../../core/services/calculadora.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsInterface } from '../../../shared/interfaces/products.interfaces';

@Component({
  selector: 'app-calculadora',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css']
})
export default class CalculadoraComponent implements OnInit {
  product: number = 1;
  enReinvestment: boolean = false;
  term: number | null = null;
  dateCreated: string = '';
  products: ProductsInterface[] = [];
  result: any = null;
  showModal: boolean = false;

  constructor(private productService: ProductService, private calculadoraService: CalculadoraService) {}

  ngOnInit() {
    this.productList();
  }

  productList() {
    this.productService.productList().subscribe({
      next: (response) => {
        this.products = response;
        console.log(response);
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }

  onSubmit() {
    if (this.product !== null && this.term !== null) {
      const isoDate = this.convertToISODate(this.dateCreated);
      const productId = parseInt(this.product.toString(), 10);

      this.calculadoraService.calculoFechaFinanciera(productId, this.enReinvestment, this.term, isoDate)
        .subscribe({
          next: (response) => {
            this.result = {
              ...response,
              fecha_inicio: this.formatDate(response.fecha_inicio),
              fecha_fin: this.formatDate(response.fecha_fin),
            };
            this.showModal = true;
          },
          error: (error) => console.error('Error calculating financial date:', error)
        });
    }
  }

  closeModal() {
    this.showModal = false;
  }

  private convertToISODate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString();
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }
}
