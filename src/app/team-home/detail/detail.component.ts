import { Component, Input, OnInit } from '@angular/core';
import { Game, Standing, Team, TournamentData } from 'src/app/services/tournaments.service';

import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-team-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() team: Team;
  @Input() tournamentData: TournamentData;
  public teamStanding: Standing;
  public games: any[];
  public allGames: any[];
  public dateFilter: string; // I don't like this because it's hard to tell where to click on Android
  public useDateFilter: boolean = false;

  constructor() {}

  ngOnInit() {
    // Filter team data from tourney info
    this.games = _.chain(this.tournamentData.games)
                  .filter((g: Game) => g.team1Id === this.team.id || g.team2Id === this.team.id)
                  .map((g: Game) => {
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
    this.allGames = this.games;
    this.teamStanding = _.find(this.tournamentData.standings, { 'teamId': this.team.id }) as Standing;
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

  dateChanged() {
    if (this.useDateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
    
  }

}
