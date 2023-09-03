import { Component, OnInit } from '@angular/core';
import { Product, Review } from '../product-card/product';
import { ProductSearchService } from './product-search.service';
import { environment } from '../../environments/environment';
@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {
  results: Product[] = [];
  reviews: Review[] = [];

  products: Product[][] = [
    [
      {
        "name": "Mi A2 (Red, 128 GB)",
        "url": "https://www.flipkart.com/mi-a2-red-128-gb/p/itmfghsgrkphksag?pid=MOBFD94CUVXZYMZH&lid=LSTMOBFD94CUVXZYMZHBVMGJ1&marketplace=FLIPKART&srno=s_1_1&otracker=search&fm=organic&iid=fbb03e4a-4ea5-4102-984c-57d56519cb97.MOBFD94CUVXZYMZH.SEARCH&ssid=tj9eobkuv40000001612012071321&qH=fddbc481ee481715",
        "image": "https://rukminim1.flixcart.com/image/312/312/jrgo4280/mobile/m/z/h/mi-a2-a2-original-imafd92uetypzxma.jpeg?q=70",
        "price": "15999",
        "site": "flipkart"
      },
      {
        "name": "Mi A2 (Gold, 64 GB)",
        "url": "https://www.flipkart.com/mi-a2-gold-64-gb/p/itmfghsggejqrygr?pid=MOBF95FK8R3ZZZDW&lid=LSTMOBF95FK8R3ZZZDWJZBPB6&marketplace=FLIPKART&srno=s_1_2&otracker=search&fm=organic&iid=fbb03e4a-4ea5-4102-984c-57d56519cb97.MOBF95FK8R3ZZZDW.SEARCH&ssid=tj9eobkuv40000001612012071321&qH=fddbc481ee481715",
        "image": "https://rukminim1.flixcart.com/image/312/312/jmf76vk0/mobile/z/d/w/mi-a2-na-original-imaf9c7jhzrvhhy8.jpeg?q=70",
        "price": "11790",
        "site": "flipkart"
      },
      {
        "name": "Mi A2 (Black, 64 GB)",
        "url": "https://www.flipkart.com/mi-a2-black-64-gb/p/itmfghsgahzh9byg?pid=MOBF95FKVHJGXWEW&lid=LSTMOBF95FKVHJGXWEWWGZVSG&marketplace=FLIPKART&srno=s_1_3&otracker=search&fm=organic&iid=fbb03e4a-4ea5-4102-984c-57d56519cb97.MOBF95FKVHJGXWEW.SEARCH&ssid=tj9eobkuv40000001612012071321&qH=fddbc481ee481715",
        "image": "https://rukminim1.flixcart.com/image/312/312/jrjizrk0/mobile/q/9/r/mi-a2-a2-original-imaf8zwaxz8hh5mx.jpeg?q=70",
        "price": "11995",
        "site": "flipkart"
      }
    ],
    [
      {
        "name": "Mi A2 (Blue, 4GB RAM, 64GB Storage)",
        "url": "https://www.amazon.in/Mi-A2-Blue-64GB-Storage/dp/B07DJCJ9VN/ref=sr_1_1?dchild=1&keywords=mi+a2&qid=1612012073&sr=8-1",
        "image": "https://m.media-amazon.com/images/I/91XRU7pm+PL._AC_UY218_.jpg",
        "price": "11999",
        "site": "amazon"
      },
      {
        "name": "Redmi 9 (Carbon Black, 4GB RAM, 64GB Storage)",
        "url": "https://www.amazon.in/Redmi-Carbon-Black-64GB-Storage/dp/B086985T6R/ref=sr_1_2?dchild=1&keywords=mi+a2&qid=1612012073&sr=8-2",
        "image": "https://m.media-amazon.com/images/I/71uZrDPrsRL._AC_UY218_.jpg",
        "price": "8999",
        "site": "amazon"
      },
      {
        "name": "Samsung Galaxy M31 (Ocean Blue, 6GB RAM, 128GB Storage)",
        "url": "https://www.amazon.in/Samsung-Galaxy-Ocean-128GB-Storage/dp/B07HGGYWL6/ref=sr_1_3?dchild=1&keywords=mi+a2&qid=1612012073&sr=8-3",
        "image": "https://m.media-amazon.com/images/I/71-Su4Wr0HL._AC_UY218_.jpg",
        "price": "16499",
        "site": "amazon"
      }
    ],
    [
      {
        "name": "Vivo U10 (Thunder Black,5000 mAH 18W Fast Charge Battery, 3GB RAM, 32GB Storage)",
        "url": "https://www.amazon.in/Test-Exclusive-738/dp/B07DJL15MJ/ref=sr_1_4?dchild=1&keywords=mi+a2&qid=1612012073&sr=8-4",
        "image": "https://m.media-amazon.com/images/I/51EnyMldjGL._AC_UY218_.jpg",
        "price": "9990",
        "site": "amazon"
      },
      {
        "name": "Samsung Galaxy M31 (Space Black, 6GB RAM, 128GB Storage)",
        "url": "https://www.amazon.in/Samsung-Galaxy-Space-Black-Storage/dp/B07HGN617M/ref=sr_1_5?dchild=1&keywords=mi+a2&qid=1612012073&sr=8-5",
        "image": "https://m.media-amazon.com/images/I/71OxJeyywSL._AC_UY218_.jpg",
        "price": "16499",
        "site": "amazon"
      }
    ]
  ];
  server: string = environment.apiURL + "api";
  query: string = "";
  loading: number = 3;

  constructor(private productSearchService: ProductSearchService) { }

  onChange(query: string) {
    this.query = query;
  }

  search() {
    this.reviews = [];
    this.results = [];
    this.products = [];
    this.loading = 0;
    this.productSearchService.search_product(this.query, "amazon")
      .then(data => {
        this.results.push(...data);
        this.divide();
        this.loading++;
      });
    this.productSearchService.search_product(this.query, "flipkart")
      .then(data => {
        this.results.push(...data);
        this.divide();
        this.loading++;
      });

    this.productSearchService.search_tweets(this.query)
      .then(data => {
        this.reviews.push(...data);
        this.loading++;
      });
  }

  divide() {
    console.log("Dividing");
    console.log(this.results);
    while (this.results.length > 0)
      this.products.push(this.results.splice(0, 3));
    console.log(this.products);
  }
  ngOnInit(): void {
  }
}
