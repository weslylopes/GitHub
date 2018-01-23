import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FormRestauranteComponent } from './components/formRestaurante/formRestaurante.component';
import { FormPratoComponent } from './components/formPrato/formPrato.component';
import { PratoComponent } from './components/prato/prato.component';
import { RestauranteComponent } from './components/restaurante/restaurante.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        PratoComponent,
        FormRestauranteComponent,
        FormPratoComponent,
        HomeComponent,
        RestauranteComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'prato', component: PratoComponent },
            { path: 'formPrato/:id', component: FormPratoComponent },
            { path: 'formPrato', component: FormPratoComponent },
            { path: 'restaurante', component: RestauranteComponent },
            { path: 'formRestaurante/:id', component: FormRestauranteComponent },
            { path: 'formRestaurante', component: FormRestauranteComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
