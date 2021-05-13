import { Component, Input, OnInit } from '@angular/core';
import { Team, TournamentData } from 'src/app/services/tournaments.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-team-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() team: Team;
  @Input() tournamentData: TournamentData;
  public games: any[];

  constructor() { }

  ngOnInit() {
    // Filter team data from tourney info
    this.games = _.chain(this.tournamentData.games)
                  .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map(g => {
                    let isTeam1 = (g.team1Id === this.team.id);
                    let opponentname = isTeam1 ? g.team2 : g.team1;
                    let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
                    return {
                      gameId: g.id,
                      opponent: opponentname,
                      time: Date.parse(g.time),
                      location: g.location,
                      scoreDisplay: scoreDisplay,
                      homeAway: (isTeam1 ? 'vs. ' : 'at ')
                    }
                  })
                  .value();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      let teamScore = (isTeam1 ? team1Score : team2Score);
      let opponentScore = (isTeam1 ? team2Score : team1Score);
      let winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + '-' + opponentScore;
    } else {
      return "";
    }
  }

}
