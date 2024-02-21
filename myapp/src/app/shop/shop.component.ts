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
  itemsAmount:number = 9
  constructor(private storeService:StoreService){}

  ngOnInit(){
    this.limitItems(this.itemsAmount)
  }

  limitItems(itemsAmount:number):void{
    this.storeService.getItems(itemsAmount).subscribe((data)=>{
      this.items = data
      this.itemsAmount = itemsAmount
      console.log("test")
    })
  }

  prueba(){
    window.location.href = 'https://www.google.com';
  }
}
