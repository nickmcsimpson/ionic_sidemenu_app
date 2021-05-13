import { Component, OnInit } from '@angular/core';
import { Tournament, TournamentsService } from '../services/tournaments.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.page.html',
  styleUrls: ['./tournament.page.scss'],
})
export class TournamentPage implements OnInit {
  public tournaments: Tournament[];

  constructor(private tournamentService: TournamentsService) { }

  ngOnInit() {
    this.tournamentService.getTournaments().subscribe(
      (data: Tournament[]) => this.tournaments = data
    );
  }

  // List of other lifecycle events
  ionViewWillEnter() {}

  ionViewDidEnter() {}

  ionViewWillLeave() {}

  ionViewDidLeave() {}

  ngOnDestroy() {}

}
