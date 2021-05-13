import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  @Input() team: Team;

  constructor() { }

  ngOnInit() {}

}
