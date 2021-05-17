import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Location, Game, TournamentData, TournamentsService } from '../services/tournaments.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  public tournamentData: TournamentData;
  public game: Game;
  public location: Location;
  public map: any;

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
      this.location = this.tournamentData.locations[this.game.locationId];

      this.map = {
        lat: this.location.latitude,
        lng: this.location.longitude,
        zoom: 12,
        markerLabel: this.game.location
      };
      
      loading.dismiss();
    });
  }

}
