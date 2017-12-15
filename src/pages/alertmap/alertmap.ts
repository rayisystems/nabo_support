import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,Events } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { MapPage } from '../map/map';

/**
 * Generated class for the AlertmapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-alertmap',
  templateUrl: 'alertmap.html',
})
export class AlertmapPage {
  @ViewChild('map') mapElement: ElementRef;
  public _red = "";
  public _brown = "";
  public _blue = "";
  public _grey = "";
  public btn = "";
  public btn1="";
  userAllData:any = {};
  victimData:any = {"user_id":""};
  alerttype:any;
  options : GeolocationOptions;
  currentPos : Geoposition;
  confirmbtn:any;
  ownerbtn:any;
  map: any;
  constructor(public navCtrl: NavController,public events:Events, public navParams: NavParams,public geolocation: Geolocation,public AuthServiceProvider: AuthServiceProvider) {
    this.userAllData = JSON.parse(localStorage.getItem("userAllData"));
    this.victimData = JSON.parse(localStorage.getItem("victimData"));
    //this.victimData = {"user_id":243,"username":"rayi","password":123,"email_id":"rayi@gmail.com","photo":"assets/imgs/user.jpg","is_active":1,"token":"34a340958f4129e0d604a727bb8e7fc3","expires":"2017-12-09 11:33:17","paid_member":"","created_on_date":"2017-12-09 11:23:17","do_not_distrub":0,"out_of_home":"","distance":10,"user_type_id":2,"alert_type":"SP","address_id":116,"street_address":"Bhuvaneshwari Nagar 3rd Main Road","zipcode":600042,"city":"Chennai","country":"India","latitude":12.96953201293945,"longitude":80.22004699707031,"status_id":1,"owner_alert_status":"","neighbour_alert_mapview":"","Alert_response":"","saw_the_same":0,"not_suspicious":0,"push_success":0};
    console.log(this.userAllData);
    
    // setInterval(this.progress, 30000);
  }
  progress(){
    console.log(this.victimData);
   // if(this.victimData['user_id'] == "" || this.victimData['user_id']==null || this.victimData == undefined) {
    if(this.victimData==null ) {
      console.log("owner")
      var not=this.userAllData.not_suspicious;
      var same=this.userAllData.saw_the_same;
      var usertotal=this.userAllData.push_success;
      var restotal=not+same;
      var samevalue =((same/usertotal) * 100);
      var notvalue=((not/usertotal) * 100);
      var validres=usertotal/2;
      var i;
      console.log(this.userAllData.not_suspicious, this.userAllData.saw_the_same, this.userAllData.push_success);
      //tb = document.getElementById("tb"),
     this.btn=this.userAllData.alert_type;
     console.log(this.btn);
     if(this.btn=="BP" || this.btn=="BC" || this.btn=="B"){
        if(validres<not){

          this.btn1="C";
          this._red = "phase1";
          this._brown = "phase2";
          this._blue = "phase3";
          this._grey = "phase4";
        }else{
          console.log("test"+samevalue);
          for(i=0;samevalue>=i;++i){

          if(i<=25){

            this._red = "phase1";
          console.log("test"+i);
  
          }else if(25<i && 50>=i){
            this._brown = "phase2";
          console.log("test1"+i);
  
          }else if(50<i && 75>=i){
            this._blue = "phase3";
          console.log("test2"+i);
  
          }
          else if(75<i && 100>=i){
            this._grey = "phase4";
          console.log("test3"+i);
  
          }
        
          }
        }
     
     }else if(this.btn=="SP" || this.btn=="SC" || this.btn=="S"){
      if(validres<not){
        this.btn1="C";
        this._red = "phase1";
        this._brown = "phase2";
        this._blue = "phase3";
        this._grey = "phase4";
              }else{
                console.log("test"+samevalue);
                for(i=0;samevalue>=i;++i){
                if(i<=25){
                  this._red = "phase1";
                console.log("test"+i);
        
                }else if(25<i && 50>=i){
                  this._brown = "phase2";
                console.log("test1"+i);
        
                }else if(50<i && 75>=i){
                  this._blue = "phase3";
                console.log("test2"+i);
        
                }
                else if(75<i && 100>=i){
                  this._grey = "phase4";
                console.log("test3"+i);
        
                }
                
                
                }
              }
     }
    } else {
      
      var notv=this.victimData['not_suspicious'];
      var samev=this.victimData['saw_the_same'];
      var usertotalv=this.victimData['push_success'];
      var restotal=notv+samev;
      var samevalue =((samev/usertotal) * 100);
      var notvalue=((notv/usertotal) * 100);
      var validres=usertotal/2;
      var i;
      //tb = document.getElementById("tb"),
     this.btn= this.victimData['alert_type'];
     console.log(this.btn);
     if(this.btn=="B" || this.btn=="BP"){
        if(validres<not){
          this.btn1="C";
          this._red = "phase1";
          this._red = "phase1";
          this._brown = "phase2";
          this._blue = "phase3";
          this._grey = "phase4";
        }else{
          console.log("test"+samevalue);
          for(i=0;samevalue>=i;++i){
          if(i<=25){
            this._red = "phase1";
          console.log("test"+i);
  
          }else if(25<i && 50>=i){
            this._brown = "phase2";
          console.log("test1"+i);
  
          }else if(50<i && 75>=i){
            this._blue = "phase3";
          console.log("test2"+i);
  
          }
          else if(75<i && 100>=i){
            this._grey = "phase4";
          console.log("test3"+i);
  
          }
        
          }
        }
     
     }else if(this.btn=="S" || this.btn=="SP"){
      if(validres<not){
        this.btn1="C";
        this._red = "phase1";
        this._brown = "phase2";
        this._blue = "phase3";
        this._grey = "phase4";
              }else{
                console.log("test"+samevalue);
                for(i=0;samevalue>=i;++i){
                if(i<=25){
                  this._red = "phase1";
                console.log("test"+i);
        
                }else if(25<i && 50>=i){
                  this._brown = "phase2";
                console.log("test1"+i);
        
                }else if(50<i && 75>=i){
                  this._blue = "phase3";
                console.log("test2"+i);
        
                }
                else if(75<i && 100>=i){
                  this._grey = "phase4";
                console.log("test3"+i);
        
                }
                
                
                }
              }
     }
    }
  
    
  }
  getOwnerPosition(){
    this.options = {
      enableHighAccuracy : true
    };

    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {

        this.currentPos = pos;      
        console.log(pos.coords.latitude+','+pos.coords.longitude);
      //this.userAllData = JSON.parse(localStorage.getItem("userAllData"));
       this.addMap(this.userAllData['latitude'],this.userAllData['longitude']);

    },(err : PositionError)=>{
      console.log("error : " + err.message);
    });
}

  getUserPosition(){
    this.options = {
         enableHighAccuracy : true
    };
 
     this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
 
         this.currentPos = pos;      
         console.log(pos.coords.latitude+','+pos.coords.longitude);
        //this.userAllData = JSON.parse(localStorage.getItem("userAllData"));
        this.addMap(this.victimData['latitude'],this.victimData['longitude']);
 
     },(err : PositionError)=>{
        console.log("error : " + err.message);
     });
 }
 
 addMap(lat,long){
  
      let latLng = new google.maps.LatLng(lat, long);
      let mapOptions = {
      center: latLng,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
      }
  
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.addMarker();
    }
    
    addMarker(){
          let alert_img='http://rayi.in/naboApi/mapicon/alert_home.png';
          let marker = new google.maps.Marker({
          map: this.map,
          draggable: false,
          icon:alert_img,
          position: this.map.getCenter()
          });
      
         // this.lastLatLng(marker)
         
      
      }
  ionViewDidLoad() {
  
    console.log('ionViewDidLoad AlertmapPage');
    console.log(this.victimData);
  // if(this.victimData['user_id'] == "" ||this.victimData['user_id']==null || this.victimData == undefined) {
    if( this.victimData==null ) {    
  console.log("owner");
      this.getOwnerPosition();
      this.progress();
    } else {
      console.log("neigh");
      this.getUserPosition();
      this.progress();
    }
    
   // this.alerttype="N";
   console.log(this.userAllData['alert_type']);
    if(this.userAllData['alert_type']=="SP"||this.userAllData['alert_type']=="BP"||this.userAllData['alert_type']=="B"||this.userAllData['alert_type']=="S"){
      this.confirmbtn=false;
      this.ownerbtn=true;
    }else{
      this.confirmbtn=true;
      this.ownerbtn=false;
    }
   // this.getUserPosition();
  }
  saw(){
    var userdata=this.victimData;
    //userdata['cur_user_id'] = JSON.parse(localStorage.getItem('userData'))['user_id'];
    userdata['res']="true";
    userdata['cur_user_id'] = this.userAllData['user_id'];
    console.log(userdata);
    this.AuthServiceProvider.postData(userdata, 'Alertresponse').then((result) => {
      console.log(result);
      this.navCtrl.setRoot(MapPage);
      
     }, (err) => {
       // Error log
     });
  }
  notsusp(){
    var userdata=this.userAllData;
    // userdata['cur_user_id'] = JSON.parse(localStorage.getItem('userData'))['user_id'];
    userdata['res']="false";
    console.log(userdata);
    this.AuthServiceProvider.postData(userdata, 'Alertresponse').then((result) => {
      console.log(result);
      this.navCtrl.setRoot(MapPage);
      
     }, (err) => {
       // Error log
     });
  }
  ownercancel(){
    
   var canData= JSON.parse(localStorage.getItem("nearUserdata"));
   console.log("user"+canData);
   this.AuthServiceProvider.postData(canData, 'cancelAlertType').then((result) => {
   console.log(result);
   this.navCtrl.setRoot(MapPage);
   
  }, (err) => {
    // Error log
  });
  }

  refresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    console.log('page refreshed');
  }

 }
