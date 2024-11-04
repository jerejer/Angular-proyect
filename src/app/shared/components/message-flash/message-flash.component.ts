import { Component, OnInit } from '@angular/core';
import { panotificar } from './message-flash';
import { NotificationService } from '../../../admin/services/notification.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-message-flash',
  standalone: true,
  imports: [NgClass,NgIf],
  templateUrl: './message-flash.component.html',
  styleUrl: './message-flash.component.css'
})
export class MessageFlashComponent implements OnInit {
    msg: panotificar = {
    titulo: '',
    tipo: "danger",
    show: false,
  }

constructor(private messageService: NotificationService){
}

ngOnInit(): void {
  this.messageService.informacion$.subscribe((notification) =>{
      this.msg = notification;
  });
}
close(){
  this.messageService.cerrarestatoatota();
}
}
