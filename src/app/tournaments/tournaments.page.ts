import { Component, OnInit } from '@angular/core';
import { Tournament, TournamentsService } from '../services/tournaments.service';

@Component({
  selector: 'app-tournament',
  templateUrl: './tournaments.page.html',
  styleUrls: ['./tournaments.page.scss'],
})
export class TournamentsPage {
  title: 'Tournaments';
  tournaments$ = this.tournamentService.tournamentsWithData$;

  constructor(private tournamentService: TournamentsService) { }

  // Not necessary using observables
  // ngOnInit() { // implements OnInit
    // this.tournamentService.getTournaments().subscribe(
    //   (data: Tournament[]) => this.tournaments = data
    // );
  // }

  // List of other lifecycle events
  ionViewWillEnter() {}

  ionViewDidEnter() {}

  ionViewWillLeave() {}

  ionViewDidLeave() {}

  ngOnDestroy() {}

}
