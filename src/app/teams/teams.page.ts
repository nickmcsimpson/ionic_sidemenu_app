import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Team, Tournament, TournamentData, TournamentsService } from '../services/tournaments.service';

import * as _ from 'lodash';
import { UserSettingsService } from '../services/user-settings.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-folder',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public title = "My Teams";
  public isTournament: boolean = false;
  // List of Unique List pages
  public teams_identifier_list = [
    'MyTeams',
    'All Teams',
  ];
  public favorites = [];

  // For Tournaments
  public tournament: Tournament;
  public teams: any[];
  public data: TournamentData;
  public allTeamDivisions: any[];
  public queryText: string;

  constructor(private activatedRoute: ActivatedRoute, private loadingController: LoadingController,
    public tournamentsService: TournamentsService, private userSettings: UserSettingsService) { }

  ngOnInit() {
    // Use event handler to watch updates:
    // This doesn't seem to have 'this' context and can't update anything
    // const searchbar = document.querySelector('ion-searchbar');
    // searchbar.addEventListener('ionInput', this.updateTeams);
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
      this.teams = this.allTeamDivisions;

      loading.dismiss();
    });
  }

  updateTeams() {
    // This doesn't update live
    console.log(`State: ${this.queryText}`);
    let queryTextLower = this.queryText.toLowerCase();
    let filteredTeams = [];

    _.forEach(this.allTeamDivisions, td => {
      let teams = _.filter(td.divisionTeams, t => t.name.toLowerCase().includes(queryTextLower));
      if(teams.length) {
        filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
      }
    });

    this.teams = filteredTeams;
  }
}
