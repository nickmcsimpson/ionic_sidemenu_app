import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PluginsPage } from './plugins.page';

const routes: Routes = [
  {
    path: '',
    component: PluginsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PluginsPageRoutingModule {}
