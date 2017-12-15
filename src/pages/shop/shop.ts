import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MapPage} from '../map/map';
/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {
  shop:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.shop="random";
  }
  home() {
    this.navCtrl.setRoot(MapPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }

}
