import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Team, Tournament, TournamentData, TournamentsService } from '../services/tournaments.service';

import * as _ from 'lodash';
import { UserSettingsService } from '../services/user-settings.service';

@Component({
  selector: 'app-folder',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public title: string;
  public isTournament: boolean = false;
  // List of Unique List pages
  public teams_identifier_list = [
    'My Teams',
    'All Teams',
  ]  
  public favorites = [];

  // For Tournaments
  public tournament: Tournament;
  public teams: Team[];
  public data: TournamentData;
  public allTeamDivisions: any[];

  constructor(private activatedRoute: ActivatedRoute, private loadingController: LoadingController, 
    public tournamentsService: TournamentsService, private userSettings: UserSettingsService) { }

  ngOnInit() {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.teams_identifier_list.includes(identifier)) {
      this.title = identifier;
      // Set Favorites
    } else { // Is Tournament ID:
      this.loadTournamentData(identifier);
    }
  }

  ionViewDidEnter() {
    this.favorites = this.userSettings.getAllFavorites();
  }

  async loadTournamentData(identifier) {
    const loading = await this.loadingController.create({
      message: "Getting Team Details..."
    });

    await loading.present();
    
    this.tournamentsService.getTournamentData(identifier).subscribe((data: TournamentData) => {
      this.isTournament = true;
      this.data = data;
      this.teams = data.teams;
      this.teams.sort((a, b) => (a.name > b.name) ? 1 : -1);

      this.allTeamDivisions = _.chain(this.teams).groupBy('division').toPairs().map(
        item => _.zipObject(['divisionName', 'divisionTeams'], item)
      ).value();

      this.tournament = data.tournament;
      this.title = this.tournament.name;

      loading.dismiss();
    });
  }
}
