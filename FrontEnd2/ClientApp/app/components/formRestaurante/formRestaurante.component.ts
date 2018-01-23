import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

import { RestauranteServices } from '../../Services/restaurante.service';
import { IRestaurante } from '../../Interface/restaurante.interface';

@Component({
    selector: 'app-restaurante',
    templateUrl: './formRestaurante.component.html'
})
export class FormRestauranteComponent implements OnInit {

    
    restaurante: IRestaurante = <IRestaurante>{};
    
    formLabel: string;
    isEditMode: boolean = false;
    form: FormGroup;
    id: number;

    constructor(private restauranteService: RestauranteServices,
        private routeActive: ActivatedRoute,
        private route: Router,
        private fb: FormBuilder) {
        this.form = fb.group({
            nome: ["", Validators.required]            
        });

        this.formLabel = "Adicionar Cliente";
    }

    ngOnInit() {
        var id = this.routeActive.params.subscribe(params => {
            var id = params['id']; 

            this.formLabel = id ? 'Editar Restaurante' : 'Novo Restaurante';

            if (!id)
                return;

            this.id = id;
            this.isEditMode = true;
            this.restauranteService.getRestauranteId(this.id)
                .subscribe(data => this.restaurante = data,
                error => alert(error),
                () => console.log(this.restaurante)
                );
        })
    };   

    salvar() {
        if (!this.form.valid)
        {
            alert("Preencha o campo nome!");
            return;
        }
        this.restaurante.nome = this.form.controls["nome"].value;
       
            if (this.isEditMode) {
            this.restauranteService.editRestaurante(this.restaurante)
                .subscribe(
                response => {
                    this.form.reset()
                },
                Error => alert(Error),
                () => this.route.navigate(['/restaurante'])

            );
        } else {
            this.restauranteService.addRestaurante(this.restaurante)
                .subscribe(
                response => {
                    this.form.reset()
                },
                Error => alert(Error),
                () => this.route.navigate(['/restaurante'])
                );
        }
    }

    edit(restaurante: IRestaurante) {
        this.formLabel = "Editar Restaurante";
        this.isEditMode = true;
        this.restaurante = restaurante;
    };

    cancel() {
        this.formLabel = "Novo Restaurante"
        this.isEditMode = false;
        this.restaurante = <IRestaurante>{};
        this.form.controls["nome"].setValue('');
        this.route.navigate(['/restaurante']);
    }

    
}