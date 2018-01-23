import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router,  RouterLink } from '@angular/router';

import { RestauranteServices } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Interface/restaurante.interface';

@Component({
    selector: 'restaurante',
    templateUrl: './restaurante.component.html'
})

export class RestauranteComponent implements OnInit {

    restaurantes: IRestaurante[];
    
    filtro: string;

    constructor(private restauranteServices: RestauranteServices) { }

    private getRestaurantes() {
        this.restauranteServices.getRestaurante().subscribe(
            data => this.restaurantes = data,
            error => alert(error),
            () => console.log(this.restaurantes)
        );
    }

    private getRestaurantesNome(nome: string) {
        this.restauranteServices.getRestauranteNome(nome).subscribe(
            data => this.restaurantes = data,
            error => alert(error),
            () => console.log(this.restaurantes)
        );
    }

    ngOnInit() {
        this.getRestaurantes();
    }

    pesquisar() {
        if (!this.filtro)
            this.getRestaurantes();
        else
            this.getRestaurantesNome(this.filtro);
    }

    delete(restaurante: IRestaurante) {
        this.restauranteServices.deleteRestaurante(restaurante.id)
            .subscribe(response => {
                this.getRestaurantes();
            });
    }
    
}