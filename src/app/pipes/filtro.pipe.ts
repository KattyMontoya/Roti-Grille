import { Pipe, PipeTransform } from '@angular/core';
//import { User } from '../_model/user'

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(lista: any[], args: string): any[] {
    if (!args) return lista
    return lista.filter(emp => emp.apellido.toLowerCase().includes(args.toLowerCase()));
    //   {
    //   emp.apellido.toLowerCase().includes(args.toLowerCase());
    //   emp.nombre.toLowerCase().includes(args.toLowerCase());
    // })
  }
}
