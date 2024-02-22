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
  constructor(private storeService:StoreService){}

  ngOnInit(){
    this.storeService.getItems(this.itemsAmount).subscribe((data)=>{
      this.items = data
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
        console.log(this.sortOpcion)
      }
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
        this.sortOpcion = valorSeleccionado;
        break;
      case "PreAsc":
        this.items.sort((a, b) => {
          return a.price - b.price;
        });
        this.sortOpcion = valorSeleccionado;
        break;
      case "NameA-Z":
        this.items.sort((a, b) => a.title.localeCompare(b.title));
        this.sortOpcion = valorSeleccionado;
        break;
    }
  }
}
