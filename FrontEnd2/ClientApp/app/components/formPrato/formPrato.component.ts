import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { IPrato } from '../../Interface/prato.interface';
import { PratoServices } from '../../Services/prato.service';
import { IRestaurante } from '../../Interface/restaurante.interface';
import { RestauranteServices } from '../../Services/restaurante.service';


@Component({
    selector: 'app-prato',
    templateUrl: './formPrato.component.html',
    styleUrls:['./formPrato.component.css']
})

export class FormPratoComponent implements OnInit {

    prato: IPrato = <IPrato>{};
    restaurantes: IRestaurante[];
    restaurante: IRestaurante;
    
    formLabel: string;
    isEditMode: boolean = false;
    form: FormGroup;
    id: number;

    constructor(private pratoService: PratoServices,
        private restauranteService: RestauranteServices,
        private routeActive: ActivatedRoute,
        private route: Router,
        private fb: FormBuilder) {
        this.form = fb.group({
            nome: ["", [Validators.required, Validators.maxLength(20)]],
            valor: ["", Validators.required],
            rest:[""]
        });

        this.formLabel = "Adicionar Prato";
        this.getRestaurantes();

    }

    ngOnInit() {
        var id = this.routeActive.params.subscribe(params => {
            var id = params['id'];
            this.formLabel = id ? 'Editar Prato' : 'Novo Prato';

            if (!id)
                return;

            this.id = id;
            this.isEditMode = true;
            this.pratoService.getPratoId(this.id)
                .subscribe(data => this.prato = data,
                error => alert(error),
                () => console.log(this.prato)
                );
        })
    }

    private getRestaurantes() {
        return this.restauranteService.getRestaurante().subscribe(
            data => this.restaurantes = data,
            error => alert(error),
            () => console.log(this.restaurantes)
        );
    }

    salvar() {
        if (!this.form.valid) {
            alert("Preencha os campos!");
            return;
        }
            this.prato.nome = this.form.controls["nome"].value;
            this.prato.valor = +this.form.controls["valor"].value;
            this.prato.restauranteId = +this.form.controls["rest"].value;

            if (this.isEditMode) {
                this.pratoService.editPrato(this.prato)
                    .subscribe(
                    response => {
                        this.form.reset()
                    },
                    Error => alert(Error),
                    () => this.route.navigate(['/prato']));
            } else {
                this.pratoService.addPrato(this.prato)
                    .subscribe(
                    response => {
                        this.form.reset()
                    },
                    Error => alert(Error),
                    () => this.route.navigate(['/prato'])
                    );
            }
        
    }

    edit(prato: IPrato) {
        this.formLabel = "Editar Prato";
        this.isEditMode = true;
        this.prato = prato;
        //this.form.controls["nome"].setValue(prato.nome);
        //this.form.controls["valor"].setValue(prato.valor);
    };

    cancel() {
        this.formLabel = "Novo Prato"
        this.isEditMode = false;
        this.prato = <IPrato>{};
        this.form.controls["nome"].setValue('');
        this.route.navigate(['/prato']);
    }
}
