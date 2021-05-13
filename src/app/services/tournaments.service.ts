import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  private baseUrl = 'https://elite-schedule-app-f4e3f-default-rtdb.firebaseio.com'
  private currentTournament: Tournament;
  // private tournaments: any = [];

  constructor(public http: HttpClient) {}

  // refreshTournaments() {
  //   fetch(this.baseUrl+'tournaments.json').then(res => {
  //     debugger;
  //     this.tournaments = res.json()
  //   });
  // }

  // async getTournaments() {
  //   const res = await fetch(`${this.baseUrl}/tournaments.json`);
  //   return await res.json();
  // }
  getTournaments() { //Should be an observable
    return this.http.get<Tournament[]>(`${this.baseUrl}/tournaments.json`, {responseType: 'json'});
  }

  // Using RxJs
  getTournamentData(tourneyId): Observable<any> {
    return this.http.get<TournamentData>(`${this.baseUrl}/tournaments-data/${tourneyId}.json`, {responseType: 'json'})
  }
}

export interface Tournament {
  id: number;
  name: string;
}

export interface TournamentData {
  games: Array<Game>;
  locations: Array<Location>;
  standings: Array<Standing>;
  teams: Array<Team>;
  tournament: Tournament;
}

export interface Game {
  id: number;
  location: string;
  locationId: string;
  team1: string;
  team1Id: number;
  team1Score: string;
  team2: string;
  team2Id: number;
  team2Score: string;
  time: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  name: string;
}
export interface Standing {
  teamId: number;
  division: string;
  teamName: string;
  wins: number;
  losses: number;
  pointsAgainst: number;
  pointsDiff: number;
  pointsFor: number;
  winningPct: string;
}
export interface Team {
  id: number | string;
  coach: string;
  division: string;
  name: string;
}
