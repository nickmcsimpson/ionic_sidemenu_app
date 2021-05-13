import { Component, Input, OnInit } from '@angular/core';
import { Standing } from 'src/app/services/tournaments.service';

@Component({
  selector: 'app-team-standing',
  templateUrl: './standing.component.html',
  styleUrls: ['./standing.component.scss'],
})
export class StandingComponent implements OnInit {
  @Input() standing: Standing;

  constructor() { }

  ngOnInit() {}

}
