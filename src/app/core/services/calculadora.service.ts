import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { FinancialInterface } from '../../shared/interfaces/financial.interfaces';
import { FinancialResponseInterface } from '../../shared/interfaces/financialResponse.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {
  private CALCULADORA_URL = "http://localhost:8000/api/calcular-inversion/";

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  calculoFechaFinanciera(producto: number, en_reinversion: boolean, plazo: number, fecha_creacion: string): Observable<FinancialResponseInterface> {
    const body = {
      producto,
      en_reinversion,
      plazo,
      fecha_creacion
    };
  
    return this.httpClient.post<any>(this.CALCULADORA_URL, body, { headers: this.getAuthHeaders() }).pipe(
      tap(response => console.log(response)),
      catchError(error => {
        console.error('Error calculating financial date:', error);
        return throwError(() => new Error('Error calculating financial date'));
      })
    );
  }
}
