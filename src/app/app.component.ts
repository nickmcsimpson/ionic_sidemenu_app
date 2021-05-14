import { Component } from '@angular/core';
import { UserSettingsService } from './services/user-settings.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public favoriteTeams: any[];
  public appPages = [
    { title: 'My Teams', url: '/teams/My Teams', icon: 'heart' },
    { title: 'Tournaments', url: '/tournament', icon: 'git-branch' },
    { title: 'All Teams', url: '/teams/All', icon: 'list' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private userSettings: UserSettingsService) {
    // Subscribe to updates of Favorites:
    this.userSettings.getFavoritesSubject().subscribe((data) => {
      this.refreshFavorites();
    });

    this.refreshFavorites();
  }

  refreshFavorites() {
    this.favoriteTeams = this.userSettings.getAllFavorites();
  }
}
