import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent implements OnInit{

  items:any[] = []

  constructor(private storeService:StoreService){}

  ngOnInit(){
    this.storeService.getItems().subscribe((data)=>{
      this.items = data
      console.log(data)
    })
  }
}
