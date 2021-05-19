import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  public teams = [
    { name: 'St. Louis Blues', id: 3, color: 'slb'}, 
    { name: 'Las Vegas Golden Knights', id: 4, color: 'lvgk'},
    { name: 'Kansas Jayhawks', id: 1, color: 'ku'}, 
    { name: 'Oregon Ducks', id: 2, color: 'ore'},
  ]

  constructor() { }

  getByIds(ids: Array<number | string>) {
    return this.teams.filter(team => ids.includes(team.id))
  }

  getById(id: number | string) {
    return this.teams.find(team => team.id == id)
  }
}

export interface Team {
  id: number;
  name: string;
  color: string;
}