import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Game, TournamentData, TournamentsService } from '../services/tournaments.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public tournamentData: TournamentData;
  public game: Game;

  constructor(private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService, 
    private loadingController: LoadingController) { }
    
  ngOnInit() {
    const tournament_id = this.activatedRoute.snapshot.paramMap.get('tournament_id');
    const game_id = this.activatedRoute.snapshot.paramMap.get('game_id');

    this.loadTeam(tournament_id, game_id);
  }

  async loadTeam(tournament_id, game_id) {
    const loading = await this.loadingController.create({
      message: "Getting Game Details..."
    });

    await loading.present();
    
    this.tournamentsService.getTournamentData(tournament_id).subscribe((data: TournamentData) => {
      this.tournamentData = data;
      this.game = data.games.find(game => game.id == game_id);
      loading.dismiss();
    });
  }

  goToDirections() {
    // placeholder
  }

  goToMap() {
    // placeholder
  }

  isWinner(score1, score2) {
    return Number(score1) > Number(score2) ? 'success' : 'danger'
  }

}
