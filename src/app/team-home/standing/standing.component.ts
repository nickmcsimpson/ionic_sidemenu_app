import { Component, Input, OnInit } from '@angular/core';
import { Standing, Team, TournamentData } from 'src/app/services/tournaments.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-team-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss'],
})
export class StandingComponent implements OnInit {
  @Input() standing: Standing;
  @Input() tournamentData: TournamentData;
  @Input() team: Team;
  public allStandings: any[];
  public standings: any[];
  public teamRank: number;

  ngOnInit() {
    this.allStandings = _.chain(this.tournamentData.standings)
    .groupBy('division')
    .toPairs()
    .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    .value();

    this.standings = _.find(this.allStandings, { 'divisionName': this.team.division });
  }

}
