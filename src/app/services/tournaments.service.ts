import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, combineLatest, from, Observable, of, Subject} from 'rxjs';
import {filter, map, mergeMap, shareReplay, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentsService {
  private baseUrl = 'https://elite-schedule-app-f4e3f-default-rtdb.firebaseio.com'
  // private currentTournament: Tournament;
  // private tournaments: any = [];

  // Replacing all the 'get' methods with some observables
  tournaments$ = this.http.get<Tournament[]>(`${this.baseUrl}/tournaments.json`, {responseType: 'json'})
    .pipe(
      tap(data => console.log('Tournaments', JSON.stringify(data))),
      shareReplay(1)
    );

  allTournamentsData$ = this.http.get<TournamentData[]>(`${this.baseUrl}/tournaments-data.json`, {responseType: 'json'})
    .pipe(
      // tap(data => console.log('All Tournaments Data', JSON.stringify(data))),
      shareReplay(1)
    );

  tournamentsWithData$ = combineLatest([
    this.tournaments$,
    this.allTournamentsData$,
  ]).pipe(
    map(([tournaments, allTournamentsData]) =>
      tournaments.map(tourney => ({
        ...tourney,
        data: allTournamentsData[tourney.id]
      }) as Tournament)
    )
  );

  // tournamentData$ = this.http.get<TournamentData>(`${this.baseUrl}/tournaments-data/${tourneyId}.json`, {responseType: 'json'})
  // Need to fetch data for selected tourney
  private tournamentSelectedSubject = new Subject<string>();
  tournamentSelectedAction$ = this.tournamentSelectedSubject.asObservable();

  selectedTournament$ = combineLatest([
    this.tournamentsWithData$,
    this.tournamentSelectedAction$,
  ]).pipe(
      map(([tournaments, selectedTournamentId]) =>
        tournaments.find(tourney => tourney.id === selectedTournamentId)
      ),
      tap(tourney => console.log('selectedTournament', tourney)),
    );

  private teamSelectedSubject = new Subject<number>();
  teamSelectedAction$ = this.teamSelectedSubject.asObservable();

  selectedTeam$ = combineLatest([
    this.selectedTournament$,
    this.teamSelectedAction$,
  ]).pipe(
    map(([tournament, selectedTeamId]) =>
      tournament.data.teams.find(team => team.id === selectedTeamId)
    ),
    tap(team => console.log('selectedTeam', team)),
  );

  selectedTeamStanding$ = combineLatest([
    this.selectedTournament$,
    this.selectedTeam$,
  ]).pipe(
    map(([tournament, team]) =>
      tournament.data.standings.find(standing => standing.teamId === team.id)
    ),
    tap(team => console.log('selectedTeamStanding', team)),
  );

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

  selectedTournamentChanged(selectedTourneyId: string): void {
    this.tournamentSelectedSubject.next(selectedTourneyId);
  }

  selectedTeamChanged(selectedTeamId: number): void{
    this.teamSelectedSubject.next(selectedTeamId);
  }
}

export interface Tournament {
  id: string;
  name: string;
  data?: TournamentData;
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
  id: number;
  coach: string;
  division: string;
  name: string;
}
