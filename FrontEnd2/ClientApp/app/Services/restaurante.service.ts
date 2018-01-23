import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import {IRestaurante} from '../Interface/restaurante.interface';

@Injectable()
export class RestauranteServices {

    constructor(private _http: Http) { }

    //get
    getRestaurante() {
        return this._http.get("http://localhost:58785/api/restaurante")
            .map(data => <IRestaurante[]>data.json());
    }  

    //get 
    getRestauranteId(restauranteId: number) {
        return this._http.get(`http://localhost:58785/api/restaurante/${restauranteId}`)
            .map(data => <IRestaurante>data.json());
    } 

    //get api/Restaurante/getName/joão
    getRestauranteNome(restauranteNome: string) {
        return this._http.get(`http://localhost:58785/api/restaurante/getName/${restauranteNome}`)
            .map(data => <IRestaurante[]>data.json());
    } 

    //put - alterar dados /api/restaurante/1
    editRestaurante(restaurante: IRestaurante) {
        console.log('put:' + restaurante);
        return this._http.put(`http://localhost:58785/api/restaurante/${restaurante.id}`, restaurante);
    }

    //post - incluir dados
    addRestaurante(restaurante: IRestaurante) {
        return this._http.post("http://localhost:58785/api/restaurante", restaurante);
    }

    //delete - deletar dados /api/restaurante/1
    deleteRestaurante(restauranteId: number) {
        return this._http.delete(`http://localhost:58785/api/restaurante/${restauranteId}`);
    }

}