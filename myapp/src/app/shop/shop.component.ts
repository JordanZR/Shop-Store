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
  sortOpcion:any = ''
  categorias:any[] = []

  constructor(private storeService:StoreService){}

  ngOnInit(){
    this.storeService.getItems(this.itemsAmount).subscribe((data)=>{
      this.items = data
      this.getCategories();
      console.log("Success")
    })
  }

  limitItems(itemsAmount:any):void{
    const valorSeleccionado = itemsAmount.target.value;
    console.log('Opción seleccionada:', valorSeleccionado);
    this.storeService.getItems(valorSeleccionado).subscribe((data)=>{
      this.items = data
      this.itemsAmount = valorSeleccionado
      if(this.sortOpcion != ''){
        this.sortItems(this.sortOpcion, false)
      }
      this.getCategories();
    })
  }

  sortItems(opcion:any, method:boolean){
    let valorSeleccionado:any;
    if(method){ valorSeleccionado = opcion.target.value;}else{valorSeleccionado = opcion}
    switch(valorSeleccionado){
      case "PreDesc":
        this.items.sort((a, b) => {
          return b.price - a.price;
        });
        break;
      case "PreAsc":
        this.items.sort((a, b) => {
          return a.price - b.price;
        });
        break;
      case "NameA-Z":
        this.items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "NameZ-A":
        this.items.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
    this.sortOpcion = valorSeleccionado;
    this.getCategories();
  }

  getCategories(){
    this.categorias = []
    this.items.forEach((item) => {
      console.log(item.category)
      if(this.categorias.includes(item.category) == false){this.categorias.push(item.category)}
    });
  }
}
