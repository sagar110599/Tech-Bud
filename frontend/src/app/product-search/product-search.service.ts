import { Injectable } from '@angular/core';
import { Product, Review } from '../product-card/product';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {
  server: string = environment.apiURL + "api";
  constructor() { }

  search_product(query: string, website: string): Promise<Product[]> {
    return fetch(this.server + "/" + website + "?query=" + query)
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
  search_tweets(query: string): Promise<Review[]> {
    return fetch(this.server + "/twitter?query=" + query)
      .then(res => res.json())
      .then(data => {
        return data;
      });
  }
}
