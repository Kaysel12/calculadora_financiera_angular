import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { ProductsInterface } from '../../shared/interfaces/products.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private PRODUCT_URL = "http://localhost:8000/api/productos/";

  constructor(private httpClient: HttpClient, private router: Router, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  productList(): Observable<ProductsInterface[]> {
    return this.httpClient.get<any>(this.PRODUCT_URL, { headers: this.getAuthHeaders() }).pipe(
      tap(response => console.log(response)),
      catchError(error => {
        console.error('Error fetching products:', error);
        return throwError(() => new Error('Error fetching products'));
      })
    );
  }
  
}
