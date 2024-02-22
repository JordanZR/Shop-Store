import { Component, OnInit } from '@angular/core';
import { SelectItemService } from '../services/select-item/select-item.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})

export class ModalComponent implements OnInit{

  datos: any;
  constructor(private selectItemService: SelectItemService){}

  ngOnInit() {
    this.selectItemService.datosActuales.subscribe(datos => this.datos = datos);

  }
}
