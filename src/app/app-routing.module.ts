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
  // {
  //   path: 'team-home/:id/details',
  //   loadChildren: () => import('./team-home/team-detail/team-detail.module').then( m => m.TeamDetailPageModule)
  // },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'tournament',
    loadChildren: () => import('./tournament/tournament.module').then( m => m.TournamentPageModule)
  },
  // {
  //   path: 'team-home/:id/standings',
  //   loadChildren: () => import('./team-home/standings/standings.module').then( m => m.StandingsPageModule)
  // },
  {
    path: 'tournaments/:tournament_id/team-home/:team_id',
    loadChildren: () => import('./team-home/team-home.module').then( m => m.TeamHomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
