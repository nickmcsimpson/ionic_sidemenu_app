import { Injectable } from '@angular/core';
import { Team } from '../services/tournaments.service';
// import { Team } from '../services/teams.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public team: Team;

  constructor() { }

  setTeam(team: Team) {
    this.team = team
  }

  getTeam() {
    return this.team;
  }
}