import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'My Teams', url: '/teams/My Teams', icon: 'heart' },
    { title: 'Tournaments', url: '/tournament', icon: 'git-branch' },
    { title: 'All Teams', url: '/teams/All', icon: 'list' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
