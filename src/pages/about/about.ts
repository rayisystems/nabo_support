import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MapPage} from '../map/map';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(public navCtrl: NavController) {

  }
home() {
  this.navCtrl.setRoot(MapPage);
}
}
