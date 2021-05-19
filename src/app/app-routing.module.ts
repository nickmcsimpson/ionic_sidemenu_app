import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'teams/My Teams',
    pathMatch: 'full'
  },
  {
    path: 'MyTeams',
    loadChildren: () => import('./teams/teams.module').then( m => m.TeamsPageModule)
  },
  {
    path: 'tournaments/:tournament_id/game/:game_id',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'tournaments',
    loadChildren: () => import('./tournaments/tournaments.module').then(m => m.TournamentPageModule)
  },
  {
    path: 'tournaments/:tournament_id/team-home/:team_id',
    loadChildren: () => import('./team-home/team-home.module').then( m => m.TeamHomePageModule)
  },
  {
    path: 'tournaments/:tournament_id/map/:game_id',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'plugins',
    loadChildren: () => import('./plugins/plugins.module').then( m => m.PluginsPageModule)
  },
  {
    path: 'tournaments/:tournament_id',
    loadChildren: () => import('./tournament-home/tournament-home.module').then( m => m.TournamentHomePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
