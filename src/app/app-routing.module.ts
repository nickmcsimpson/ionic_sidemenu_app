import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams/My Teams',
    pathMatch: 'full'
  },
  {
    path: 'teams/:id',
    loadChildren: () => import('./teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'team-detail/:id',
    loadChildren: () => import('./team-detail/team-detail.module').then( m => m.TeamDetailPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'tournament',
    loadChildren: () => import('./tournament/tournament.module').then( m => m.TournamentPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
