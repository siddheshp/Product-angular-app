import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {
  private apiUrl = 'http://localhost:50913/api/products';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
      .pipe(tap(products => console.log('Products fetched. Count='
        + products.length)),
        catchError(this.handleError('getProducts', [])));
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => console.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  addProduct(product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product, this.httpOptions).pipe(
      tap((product: Product) => console.log(`Added product with id=${product.Id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct(id, product): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, product, this.httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct(id): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    console.log(url);
    return this.http.delete<Product>(url).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
}