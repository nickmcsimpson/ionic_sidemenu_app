import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {
  private _storage: Storage | null = null;

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

    this._storage.set(team.id.toString(), JSON.stringify(item));
  }

  unfavoriteTeam(team) {
    this._storage.remove(team.id.toString());
  }

  isFavoriteTeam(teamId: string): Promise<boolean> {
    return this._storage.get(teamId).then(value => value ? true : false);
  }

  getAllFavorites() {
    let results = [];
    this._storage.forEach(data => {
      results.push(JSON.parse(data));
    });

    return results;
  }
}
