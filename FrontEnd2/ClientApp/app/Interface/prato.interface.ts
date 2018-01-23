
import { IRestaurante } from '../Interface/restaurante.interface';

export class IPrato {
    id: number;
    nome: string;
    valor: number;
    restauranteId: number;
    restaurante: IRestaurante; 

    constructor(restaurante: IRestaurante){
        this.restaurante = restaurante;
    }


}