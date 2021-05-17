import { Component, OnInit } from '@angular/core';
import { Plugins, HapticsImpactStyle } from '@capacitor/core';
import { Vibration } from '@ionic-native/vibration/ngx';

const { Haptics } = Plugins;

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.page.html',
  styleUrls: ['./plugins.page.scss'],
})
export class PluginsPage implements OnInit {

  constructor( private vibration: Vibration) {}

  ngOnInit() {}

  hapticVibrate() {
    Haptics.vibrate();
  }

  cordovaVibrate() {
    this.vibration.vibrate(2000);
  }

  cordovaVibratePattern() {
    this.vibration.vibrate([2000, 1000, 500]);
  }

}
