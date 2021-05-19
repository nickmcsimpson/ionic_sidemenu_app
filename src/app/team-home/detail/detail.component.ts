import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Game, Standing, Team, Tournament, TournamentsService} from 'src/app/services/tournaments.service';

import * as _ from 'lodash';
import * as moment from 'moment';
import { AlertController, ToastController } from '@ionic/angular';
import { UserSettingsService } from 'src/app/services/user-settings.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit, OnChanges {
  @Input() team: Team;
  @Input() tournament: Tournament;
  @Input() teamStanding: Standing;
  public games: any[];
  public allGames: any[];
  public dateFilter: string; // I don't like this because it's hard to tell where to click on Android
  public useDateFilter = false;
  public isFollowing = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private userSetting: UserSettingsService,
  ) {}

  ngOnInit() {
    this.setData();
  }

  ngOnChanges() { // When input params change, need to re-establish the computed data
    this.setData();
  }

  setData() {
    // Filter team data from tourney info
    this.games = _.chain(this.tournament.data.games)
        .filter((g: Game) => g.team1Id === this.team.id || g.team2Id === this.team.id)
        .map((g: Game) => {
          const isTeam1 = (g.team1Id === this.team.id);
          const opponentname = isTeam1 ? g.team2 : g.team1;
          const scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
          return {
            gameId: g.id,
            opponent: opponentname,
            time: Date.parse(g.time),
            location: g.location,
            scoreDisplay,
            homeAway: (isTeam1 ? 'vs. ' : 'at ')
          };
        })
        .value();
    this.allGames = this.games;

    this.userSetting.isFavoriteTeam(this.team.id.toString()).then(value => this.isFollowing = value);
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      const teamScore = (isTeam1 ? team1Score : team2Score);
      const opponentScore = (isTeam1 ? team2Score : team1Score);
      const winIndicator = teamScore > opponentScore ? 'W: ' : 'L: ';
      return winIndicator + teamScore + '-' + opponentScore;
    } else {
      return '';
    }
  }

  dateChanged() {
    if (this.useDateFilter && this.dateFilter) {
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  getScoreWorL(game) {
    return game.scoreDisplay ? game.scoreDisplay[0] : 'TBD';
  }

  getScoreDisplayBadgeColor(game) {
    if (game.scoreDisplay === '') {
      return 'medium';
    } else {
      return game.scoreDisplay.indexOf('W:') === 0 ? 'success' : 'danger';
    }
  }

  getFollowButtonDisplayColor() {
    return this.isFollowing ? 'primary' : 'medium';
  }

  async toggleFollow() {
    if(this.isFollowing) {
      const confirm = await this.alertController.create({
        header: 'Unfollow',
        message: 'Are you sure you want to unfollow this team?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              this.userSetting.unfavoriteTeam(this.team);
            }
          },
          { text: 'No', role: 'cancel' }
        ]
      });

      await confirm.present();
    } else {
      this.isFollowing = true;
      this.userSetting.favoriteTeam(this.team, this.tournament.id, this.tournament.name);

      const toast = await this.toastController.create({
        message: 'You have followed this team.',
        duration: 3000,
        position: 'bottom',
        color: 'success',
      });

      await toast.present();
    }
  }

}
