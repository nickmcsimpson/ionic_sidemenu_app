import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
// import { Events } from '@ionic/angular'; // Instead use Observables in rxjs

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private _storage: Storage | null = null;
  private _favoriteSubject = new Subject<any>();

  constructor(private storage: Storage) {
    this.init()
   }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  favoriteTeam(team, tournamentId, tournamentName) {
    let item = {
      team: team,
      tournamentId: tournamentId,
      tournamentName: tournamentName
    };

    this._storage.set(team.id.toString(), JSON.stringify(item)).then(() => this.broadcastChangeToFavorites(true));
    // this.events.publish('favorites:changed');
    // this.broadcastChangeToFavorites(true);
  }

  unfavoriteTeam(team) {
    this._storage.remove(team.id.toString()).then(() => this.broadcastChangeToFavorites(true));
    // this.events.publish('favorites:changed');
  }

  isFavoriteTeam(teamId: string): Promise<boolean> {
    return this._storage.get(teamId).then(value => !!value);
  }

  getAllFavorites() {
    let results = [];
    this._storage.forEach(data => {
      results.push(JSON.parse(data));
    });

    return results;
  }

  // Publish change to observable
  broadcastChangeToFavorites(data: any) {
    this._favoriteSubject.next(data);
  }

  // Get state of objservable:
  getFavoritesSubject(): Subject<any> {
    return this._favoriteSubject;
  }
}
