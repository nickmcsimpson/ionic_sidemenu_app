import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
// import { Team, TeamsService } from '../services/teams.service';
import { Team, Tournament, TournamentData, TournamentsService } from '../services/tournaments.service';

@Component({
  selector: 'app-folder',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public title: string;
  // List of Unique List pages
  public teams_identifier_list = [
    'My Teams',
    'All Teams',
  ]
  // Map of teams to display for tournaments
  // public teams_tournaments = {
  //   'March Madness': [1,2],
  //   'Stanley Cup': [3,4],
  // };
  public tournament: Tournament;
  public teams: Array<Team>;
  public data: TournamentData;

  constructor(private activatedRoute: ActivatedRoute, private nav: NavController, 
    public tournamentsService: TournamentsService) { }

  ngOnInit() {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    // debugger;
    if (this.teams_identifier_list.includes(identifier)) {
      this.title = identifier;
      this.teams = [];
    } else {
      // This is a tournament ID, so search for the data
      this.tournamentsService.getTournamentData(identifier).subscribe((data: TournamentData) => {
        this.data = data;
        this.teams = data.teams;
        this.teams.sort((a, b) => (a.name > b.name) ? 1 : -1);
        this.tournament = data.tournament;
        this.title = this.tournament.name;
      });

      // this.teams = this.teamService.getByIds(this.teams_tournaments[identifier]);
    }
  }

}
