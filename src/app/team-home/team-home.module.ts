import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamHomePageRoutingModule } from './team-home-routing.module';

import { TeamHomePage } from './team-home.page';
import { DetailComponent } from './detail/detail.component';
import { StandingComponent } from './standing/standing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamHomePageRoutingModule
  ],
  declarations: [TeamHomePage, DetailComponent, StandingComponent]
})
export class TeamHomePageModule {}
