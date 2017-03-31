import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";

import {AuthGuard} from '../auth/auth.module';

import {TvComponent} from './tv.component';
// import {DataService} from "../common/data.service";
import {MomentModule} from "angular2-moment";

const routes: Routes = [
    // {path: '',   redirectTo: '/tv', pathMatch: 'full'},
    {path: 'tv', component: TvComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [
        TvComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        FlexLayoutModule,
        MomentModule,
        RouterModule.forChild(routes)
    ],
    providers: [
        // DataService
    ]
})
export class TvModule { }

// export {DataService};
