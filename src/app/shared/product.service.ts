import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FbResponse } from './Interfaces/FbResponse';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(product: any) {
    return this.http.post(`${environment.DbUrl}/products.json`, product)
    .pipe(
      map((response) => {
        return {
          ...product,
          id: this.getNameProperty(response),
          date: new Date(product.date),
        }
      })
    );
  }

  private getNameProperty(obj: any): String {
    type ObjectKey = keyof typeof obj;
    const myVar = 'name' as ObjectKey;
    return obj[myVar];
  }
}
