import { Component, OnInit} from '@angular/core';
import { StoreService } from '../services/store.service';
import { CurrencyPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { SelectItemService } from '../services/select-item/select-item.service';

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
  itemsNoFiltrados:any[] = []
  categoria:string = ''

  constructor(private storeService:StoreService, public dialog: MatDialog, private selectItemService: SelectItemService){}

  ngOnInit(){
    this.storeService.getItems(this.itemsAmount).subscribe((data)=>{
      this.items = data;
      this.itemsNoFiltrados = data;
      this.getCategories();
      console.log("Success")
    })
  }

  limitItems(itemsAmount:any):void{
    const valorSeleccionado = itemsAmount.target.value;
    let selectElement: HTMLSelectElement = document.getElementById('ordenar-categorias') as HTMLSelectElement;
    console.log('Opción seleccionada:', valorSeleccionado);
    this.storeService.getItems(valorSeleccionado).subscribe((data)=>{
      this.items = data
      this.itemsNoFiltrados = data
      this.itemsAmount = valorSeleccionado
      this.getCategories();
      console.log(this.categoria)
      console.log("Categorias: " + this.categorias)
      if(this.categorias.includes(this.categoria) == true){
        this.sortItems(this.sortOpcion, false);
      }else{
        selectElement.selectedIndex = 0;
      }
    })
  }

  sortItems(opcion:any, method:boolean){
    let valorSeleccionado:any;
    if(method){ valorSeleccionado = opcion.target.value;}else{valorSeleccionado = opcion}
    this.items = this.itemsNoFiltrados;
    this.itemsNoFiltrados = this.items;
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
    this.sortByCategory(this.categoria, false);
  }

  sortByCategory(categoria:any, method:boolean){
    if(categoria!=''){
      let valorSeleccionado:any;
      if(method){ valorSeleccionado = categoria.target.value;}else{valorSeleccionado = categoria}
      this.categoria = valorSeleccionado;
      this.items = this.itemsNoFiltrados;
      this.itemsNoFiltrados = this.items;
      this.items = this.items.filter((item) => item.category === valorSeleccionado);
    }
  }

  getCategories(){
    this.categorias = []
    this.items = this.itemsNoFiltrados;
    this.items.forEach((item) => {
      if(this.categorias.includes(item.category) == false){this.categorias.push(item.category)}
    });
    this.categorias.sort();
  }

  showItem(id:number) {
    console.log("prueba")
    this.selectItemService.cambiarDatos(id);
    this.dialog.open(ModalComponent);
  }
}
