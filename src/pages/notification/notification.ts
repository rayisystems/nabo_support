import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {MapPage} from '../map/map';
import { removeSummaryDuplicates } from '@angular/compiler';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  userData:any;
  userMsg:any;
  constructor(public navCtrl: NavController, public AuthServiceProvider:AuthServiceProvider, public navParams: NavParams) {
    this.userData = JSON.parse(localStorage.getItem('userAllData'));
    this.getAlertMsg();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  home() {
    this.navCtrl.setRoot(MapPage);
  }

  getAlertMsg() {
    this.AuthServiceProvider.postData(this.userData, 'getAlertMsg').then((result) => {
      console.log(result);
      this.userMsg = result;
    }, (err) => {
      console.log(err);
    });
  }

}
