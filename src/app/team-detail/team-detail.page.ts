import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team, TeamsService } from '../services/teams.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.page.html',
  styleUrls: ['./team-detail.page.scss'],
})
export class TeamDetailPage implements OnInit {
  public team: Team;

  constructor(private activatedRoute: ActivatedRoute, private teamsService: TeamsService) { }

  ngOnInit() {
    debugger;
    this.team = this.teamsService.getById(this.activatedRoute.snapshot.paramMap.get('id'));
  }

}
