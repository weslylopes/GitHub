import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, RouterLink } from '@angular/router';

import { PratoServices } from '../../Services/prato.service';
import { IPrato } from '../../Interface/prato.interface';

@Component({
    selector: 'prato',
    templateUrl: './prato.component.html'
})
export class PratoComponent implements OnInit {

    private pratos: IPrato[];
    private prato: IPrato;

    constructor(private pratoServices: PratoServices) { }

    ngOnInit() {
        this.getPratos();
    }

    getPratos() {
        this.pratoServices.getPrato().subscribe(
            data => this.pratos = data,
            Error => alert(Error),
            () => console.log(this.pratos)
        );
    }

    delete(prato: IPrato) {
        this.pratoServices.deletePrato(prato.id).subscribe(
            Response => {
                this.getPratos();
            }
        );
    }
    
}
