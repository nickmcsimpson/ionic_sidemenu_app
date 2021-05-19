import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { UserSettingsService } from './services/user-settings.service';
import { Vibration } from '@ionic-native/vibration/ngx';
import {TournamentsService} from './services/tournaments.service';

const appInitializerFn = (userSettings: UserSettingsService) => {
  return () => {
    return userSettings.init();
  }
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicStorageModule.forRoot()],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, UserSettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [UserSettingsService]
    },
    Vibration,
    TournamentsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
