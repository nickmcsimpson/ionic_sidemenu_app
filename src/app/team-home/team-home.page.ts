import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {TournamentsService} from '../services/tournaments.service';
import {filter, map, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest} from 'rxjs';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamHomePage implements OnInit {
  private tournamentId: string;
  private teamId: number;
  // public team: Team;
  selectedTeam$ = this.tournamentsService.selectedTeam$;
  // public standing: Standing;
  selectedTeamStanding$ = this.tournamentsService.selectedTeamStanding$;
  // public segment: string = 'details';
  private segmentSelectedSubject = new BehaviorSubject<string>('details');
  segmentSelectedAction$ = this.segmentSelectedSubject.asObservable();
  public loading: any;

  selectedTournament$ = this.tournamentsService.selectedTournament$
    .pipe(
      tap(tournament => console.log('Tournament Loaded!')),
      filter(tournament => tournament.id === this.tournamentId),
      map(tournament => {
        if(this.loading) {
          this.loading.dismiss();
        }
        return tournament;
      })
    );

  vm$ = combineLatest([
    this.selectedTournament$,
    this.selectedTeam$,
    this.selectedTeamStanding$,
    this.segmentSelectedAction$,
  ]).pipe(
    filter(([tournament]) => Boolean(tournament)),
    map(([tournament, team, standing, segment]) =>
      ({ tournament, team, standing, segment })
    ),
  );

  constructor(private activatedRoute: ActivatedRoute,
    private tournamentsService: TournamentsService,
    private loadingController: LoadingController) { }

  ngOnInit() {
    console.log('Team home page loading...');
    this.tournamentId = this.activatedRoute.snapshot.paramMap.get('tournament_id');
    this.teamId = +this.activatedRoute.snapshot.paramMap.get('team_id');

    this.loadTeam(this.tournamentId, this.teamId);
  }

  async loadTeam(tournamentId, teamId, refresher=null, segment='details') {
    console.log(`Updating selections for tourney: ${tournamentId} and team: ${teamId}`);
    this.loading = await this.loadingController.create({
      message: 'Getting Team Details...'
    });
    if (!refresher) {
      await this.loading.present();
    }

    this.tournamentsService.selectedTournamentChanged(tournamentId);
    this.tournamentsService.selectedTeamChanged(teamId);
  }

  segmentChanged($event) {
    this.segmentSelectedSubject.next($event.target.value);
  }

  refreshAll(refresher) {
    // This pulls down the updated information but the screen isn't populated.
    // this.loadTeam(this.tournamentData.tournament.id, this.team.id, refresher);
  }

}
