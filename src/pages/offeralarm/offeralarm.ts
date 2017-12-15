import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MapPage} from '../map/map';
/**
 * Generated class for the OfferalarmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-offeralarm',
  templateUrl: 'offeralarm.html',
})
export class OfferalarmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  home() {
    this.navCtrl.setRoot(MapPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferalarmPage');
  }

}
