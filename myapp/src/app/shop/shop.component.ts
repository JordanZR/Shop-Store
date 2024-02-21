import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  items:any[] = []

  constructor(private storeService:StoreService){}

  ngOnInit(){
    this.storeService.getItems().subscribe((data)=>{
      this.items = data
      console.log(this.items)
    })
  }
}
