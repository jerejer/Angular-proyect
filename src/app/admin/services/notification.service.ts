import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { notificacion } from '../../shared/components/message-flash/message-flash';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificacion = new BehaviorSubject<notificacion>({ titulo:'', tipo:'', show: false });
  informacion$: Observable<notificacion> = this.notificacion.asObservable();
  private delay: number = 5000;

  constructor() {}

  private mostreichon(msg: notificacion){
    if (msg.delay){
      this.delay = msg.delay;
    }else{
      msg.delay = this.delay;
    }
    
    this.notificacion.next(msg);

    if (msg.show){
      setTimeout(() => {
        this.cerrarestatoatota();
      }, msg.delay);
    }

  }
  
  cerrarestatoatota(){
    this.notificacion.next({ titulo:'', tipo:'', show: false });
  }
  peligreichon(msg: string, delay?: number){
    this.mostreichon({ titulo: msg, tipo: 'danger',
       show: true, 
       delay:delay,
       class:'alert-info'});
  }

  aviseichon(msg: string, delay?: number){
    this.mostreichon({ titulo: msg, 
      tipo: 'info', 
      show: true, 
      delay:delay,
      class:'alert-info' });
  }

  // succeichon(msg: string, delay?: number){
  //   this.mostreichon({
  //     titulo: msg,
  //     tipo:'success',
  //     show: true, 
  //     delay: delay, 
  //     class:'alert-success'
  //   });
  //   console.log(msg);
  // }
   succes(message: string, delay?: number){
    this.mostreichon({
      titulo: message,
      tipo:'success',
      show: true,
      delay: delay,
      class:'alert-success'
    });
   }


}


