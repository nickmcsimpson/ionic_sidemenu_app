import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Team, TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-folder',
  templateUrl: './teams.page.html',
  styleUrls: ['./teams.page.scss'],
})
export class TeamsPage implements OnInit {
  public teams_identifier: string;
  // List of Unique List pages
  public teams_identifier_list = [
    'My Teams',
    'All Teams',
  ]
  // Map of teams to display for tournaments
  public teams_tournaments = {
    'March Madness': [1,2],
    'Stanley Cup': [3,4],
  };
  public teams: Array<Team>;

  constructor(private activatedRoute: ActivatedRoute, private nav: NavController, public teamService: TeamsService) { }

  ngOnInit() {
    this.teams_identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.teams_identifier_list.includes(this.teams_identifier)) {
      this.teams = [];
    } else {
      this.teams = this.teamService.getByIds(this.teams_tournaments[this.teams_identifier]);
    }
  }

}
