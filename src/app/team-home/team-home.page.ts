import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Team, TournamentData, TournamentsService } from '../services/tournaments.service';
// import { Team, TeamsService } from '../services/teams.service';
// import { StandingsPage } from './standings/standings.page';
// import { TeamDetailPage } from './team-detail/team-detail.page';
import { TeamService } from './team-home.service';

@Component({
  selector: 'app-team-home',
  templateUrl: './team-home.page.html',
  styleUrls: ['./team-home.page.scss'],
})
export class TeamHomePage implements OnInit {
  // public teamDetailTab = TeamDetailPage;
  // public standingsTab = StandingsPage;
  public team: Team;
  public segment: string;

  constructor(private activatedRoute: ActivatedRoute, 
    private teamService: TeamService, 
    private tournamentsService: TournamentsService, 
    private loadingController: LoadingController) { }
    
  ngOnInit() {
    const tournament_id = this.activatedRoute.snapshot.paramMap.get('tournament_id');
    const team_id = this.activatedRoute.snapshot.paramMap.get('team_id');

    this.loadTeam(tournament_id, team_id);
  }

  async loadTeam(tournament_id, team_id) {
    const loading = await this.loadingController.create({
      message: "Getting Team Details..."
    });

    await loading.present();
    
    this.tournamentsService.getTournamentData(tournament_id).subscribe((data: TournamentData) => {
      this.teamService.setTeam(data.teams.find(team => team.id == team_id));
      this.team = this.teamService.getTeam();
      this.segment = 'details'; // Don't try to load details until this is finished
      loading.dismiss();
    });
  }

  segmentChanged($event) {
    this.segment = $event.target.value
  }

}
