import { Injectable } from "@angular/core";
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { IPrato } from '../Interface/prato.interface';

@Injectable()
export class PratoServices {

    constructor(private _http: Http) { }

    //get
    getPrato() {
        return this._http.get("http://localhost:58785/api/prato")
            .map(data => <IPrato[]>data.json());
    }

    //get 
    getPratoId(pratoId: number) {
        return this._http.get(`http://localhost:58785/api/prato/${pratoId}`)
            .map(data => <IPrato>data.json());
    }

    //get api/Prato/getName/joão
    getPratoNome(pratoNome: string) {
        return this._http.get(`http://localhost:58785/api/prato/getName/${pratoNome}`)
            .map(data => <IPrato[]>data.json());
    }

    //put - alterar dados /api/prato/1
    editPrato(prato: IPrato) {
        return this._http.put(`http://localhost:58785/api/prato/${prato.id}`, prato);
    }

    //post - incluir dados
    addPrato(prato: IPrato) {
        return this._http.post("http://localhost:58785/api/prato", prato);
    }

    //delete - deletar dados /api/prato/1
    deletePrato(pratoId: number) {
        return this._http.delete(`http://localhost:58785/api/prato/${pratoId}`);
    }

}