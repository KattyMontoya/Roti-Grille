import { Ingredientes } from './ingredientes';

export class Plato{
    id:string;
    nombre:string;
    precio:number;
    detalle:string;
    id_categoria?:string;
    categoria:string;
    estado:boolean;
    imagen:string;
    //observacion:string;
    //ingredientes: Ingredientes[];
    ingredientes = [];

}