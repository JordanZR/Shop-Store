import { Component, OnInit } from '@angular/core';
import { SelectItemService } from '../services/select-item/select-item.service';
import { StoreService } from '../services/store.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent implements OnInit{

  datos: any;
  item:any;
  constructor(private selectItemService: SelectItemService, private storeService: StoreService){}

  ngOnInit() {
    this.selectItemService.datosActuales.subscribe(datos => this.datos = datos);
    this.storeService.getItem(this.datos).subscribe((data)=>{
      this.item = data
    })
  }
}
