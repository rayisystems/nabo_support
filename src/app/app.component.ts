import { Component, ViewChild } from '@angular/core';
import { Platform,MenuController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';

import { MapPage } from '../pages/map/map';
import { SigninPage } from '../pages/signin/signin';
import {MyaccountPage} from '../pages/myaccount/myaccount';
import{ AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import{ ContactusPage } from '../pages/contactus/contactus';
import{ ShopPage } from '../pages/shop/shop';
import { OfferalarmPage } from '../pages/offeralarm/offeralarm'; 
import { SecurityPage } from '../pages/security/security';
import { AlertmapPage } from '../pages/alertmap/alertmap';
import{NotificationPage} from '../pages/notification/notification';
import { SettingPage } from '../pages/setting/setting';

declare var google:any;
export interface PageInterface {
  title: string;
  component: any;
  icon: string;
}
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = SigninPage;
  pages:Array<{title:string,component:any,icon:any}>;
  deviceID:any;
  @ViewChild(Nav) nav: Nav;
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  isLoggedIn:any;
  userData:any;
  responseData:any;
  //rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, private facebook: Facebook,public AuthServiceProvider: AuthServiceProvider,
    private googlePlus: GooglePlus,splashScreen: SplashScreen, private push: Push) {
    
    this.pages = [
      { title: 'My Account', component: MyaccountPage, icon: 'ios-contact-outline' },
      { title: 'Notification', component: NotificationPage, icon: 'ios-notifications-outline' },
      { title: 'My Contacts', component: ContactPage, icon: 'ios-contacts-outline' },
      { title: 'Become a paid member', component: MapPage, icon: 'cash' },
      { title: 'Security devices', component: SecurityPage, icon: 'ios-nuclear-outline' },
      { title: 'Shop', component: ShopPage, icon: 'ios-cart-outline' },
      { title: 'Offer & Alarm', component: OfferalarmPage, icon: 'ios-pricetags-outline' },
      { title: 'About', component: AboutPage, icon: 'ios-information-circle-outline' },
      { title: 'Contact', component: ContactusPage, icon: 'ios-call-outline' },
      { title: 'User Setting', component: SettingPage, icon: 'settings' },
      { title: 'Alertmap', component: AlertmapPage, icon: 'settings' }
 //     { title: 'Logout',  component: SigninPage, icon: 'log-out' }
      
    // { title: 'logout', component: null, icon: 'log-out' }
  
    ];
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.push.hasPermission()
    .then((res: any) => {
  
      if (res.isEnabled) {
        console.log('We have permission to send push notifications');
      } else {
        console.log('We do not have permission to send push notifications');
      }
  
    });
    localStorage.setItem('deviceID', "");
    
    const options: any = {
      android: {
      },
      ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
      },
      windows: {},
      browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
   };
   
   const pushObject: PushObject = this.push.init(options);
   
   pushObject.on('notification').subscribe((notification: any) => {
      localStorage.setItem('victimData',JSON.stringify(notification.additionalData['vData']));
      alert(notification['title']+'\n'+notification.additionalData['subtitle']);
      console.log('Received a notification', notification)
    });
   
   pushObject.on('registration').subscribe((registration: any) => { 
     console.log('Device registered', registration);
     this.deviceID = {};
    this.deviceID["deviceid"] = registration['registrationId'];
     //this.deviceID["deviceid"]='cxHIRxjGUdE:APA91bGJqzhwsBbhxDLnaBXwcl7PLHZu3fDbm9pZ4QMN1kzRiJP5MFRAksg37aySQvhHoKfHTaDlt80AreZIeP9JG5MJc0AYGWAM1v3kT58sQsEgxZO74RdwNAaVazG2PZPlkKqE9m4M';
     //console.log("deviceid ="+this.deviceID["deviceid"]);
     localStorage.setItem('deviceID', this.deviceID["deviceid"]);
     console.log(localStorage.getItem('deviceID'));
    });
   
   pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
  }
  openPage(page){
    this.nav.setRoot(page.component);
  } 
  logout(){
  //  alert("logout");
    
     this.userData = JSON.parse(localStorage.getItem('userData'));
     this.AuthServiceProvider.postData(this.userData, 'logout').then((result) => {
      this.responseData = result;
      if (true == this.responseData.status) {
        console.log(this.responseData);
        localStorage.setItem('userData', "");
        localStorage.setItem('alertdata', "");
        localStorage.setItem('userFBData', "");
        localStorage.setItem('userGoogleData', "");
        this.FBlogout();
        this.Googlelogout();
         this.nav.setRoot(SigninPage);
      //  toast1.present();
       // this.navCtrl.push(SigninPage);
        // localStorage.setItem('userData', JSON.stringify(this.responseData));
        //console.log(this.responseData.status);
      } else {
       
      }
    }, (err) => {
      // Error log
    });
  
  }
  FBlogout() {
    this.facebook.logout()
      .then(res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }
  Googlelogout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }
}

