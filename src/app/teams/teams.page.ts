import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Team, Tournament, TournamentData, TournamentsService } from '../services/tournaments.service';

import * as _ from 'lodash';

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
  public favorites = [
    {
      team: { id: 6182, name: 'HC Elite 7th', coach: "Pimpson" },
      tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
      tournamentName: 'March Madness Tournament'
    },
    {
      team: { id: 805, name: 'HC Elite', coach: "Pimpson" },
      tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
      tournamentName: 'Holiday Hoops Challenge'
    }
  ]

  // For Tournaments
  public tournament: Tournament;
  public teams: Team[];
  public data: TournamentData;
  public allTeamDivisions: any[];

  constructor(private activatedRoute: ActivatedRoute, private loadingController: LoadingController, 
    public tournamentsService: TournamentsService) { }

  ngOnInit() {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.teams_identifier_list.includes(identifier)) {
      this.title = identifier;
      // Set Favorites
    } else { // Is Tournament ID:
      this.loadTournamentData(identifier);
    }
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
