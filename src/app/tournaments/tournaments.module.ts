import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TournamentPageRoutingModule } from './tournaments-routing.module';

import { TournamentsPage } from './tournaments.page';
import {PageHeaderComponent} from '../components/page-header/page-header.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TournamentPageRoutingModule
  ],
  declarations: [TournamentsPage, PageHeaderComponent]
})
export class TournamentPageModule {}
