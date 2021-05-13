import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-team-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss'],
})
export class StandingComponent implements OnInit {
  @Input() team: Team;

  constructor() { }

  ngOnInit() {}

}
