import { Component, ViewChild,ElementRef } from '@angular/core';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 
import { NavController, NavParams,Platform,NavControllerBase, AlertController, LoadingController } from 'ionic-angular';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import { Http,Headers } from '@angular/http';
import { MAX_LENGTH_VALIDATOR } from '@angular/forms/src/directives/validators';
import { AlertmapPage } from '../alertmap/alertmap';
//import { GoogleMaps,GoogleMap} from '@ionic-native/google-maps';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  options : GeolocationOptions;
 currentPos : Geoposition;
  //places : Array<any> ; 
  regionals: any = [];
  currentregional: any;
@ViewChild('map') mapElement: ElementRef;
map: any;
userid:any;
address_id:any;
lat:any;
lng:any;
streetname:any;
city:any;
country:any;
zipcode:any;
LastLng1:any;
LastLat1:any;
alertmsg:any;
alertbtn:any;
alertdata:any = {};
confirmbtn:any;
data:any = {};
ddata:any = {};
deviceListObj:any = {};
marker:any;
mapview:any;
owner:any;
address:any;
resData:any;
responseData:any;
userData:any;
userAllData:any;
pushToAll:any;
owneralertsend:any;
push:any = {};
valueData:any;
nearData:any;
range:any;
rangeAvaUser:any;
resdata:any;
//userDeviceData = {"user_id": "", "deviceID": "", "msg": ""};
  constructor(public navCtrl: NavController,
    public AuthServiceProvider:AuthServiceProvider, 
    public http:Http,
    public loadingCtrl:LoadingController,
    private alertCtrl: AlertController,
    public navParams: NavParams,private geolocation: Geolocation) {
    this.maploadview();
    this. getUser();
    // console.log(userdata['user_id']);
    // console.log(userdata['alert_type']);
    
    // this.regionals = [{
    //   "title": "Marker 1",
    //   "latitude": 12.965363,
    //   "longitude": 80.201654,
    // }, {
    //   "title": "Marker 3",
    //   "latitude": 12.962378,
    //   "longitude": 80.194799,
    // }, {
    //   "title": "Marker 2",
    //   "latitude": 12.961730,
    //   "longitude": 80.187997
    // }];
   }
   getUser() {
    var userdata = JSON.parse(localStorage.getItem('userData'));
    this.AuthServiceProvider.postData(userdata,'getUser').then((result) => {
      console.log(result);
      this.userAllData = result[0];
      this.valueData=this.userAllData.distance;
      this.range=this.userAllData.distance;
      console.log(this.userAllData);
      localStorage.setItem('userAllData',JSON.stringify(this.userAllData));
      
    }, (err) => {
      console.log(err);
    });
   }
   
   jsonConcat(o1, o2) {
      for (var key in o2) {
      o1[key] = o2[key];
    }
    return o1;
  }

   pushSendAlert() {
    let alert = this.alertCtrl.create({
      title: 'SENT!',
      subTitle: 'your message sent successfully.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  pushSendAlertOwner() {
    let alert = this.alertCtrl.create({
      title: 'SENT!',
      subTitle: 'Message sent to your Neighbours.',
      buttons: ['Dismiss']
    });
    alert.present();
  }

   presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Cancel Alert',
      message: 'Do you want to Cancel Alert?',
      buttons: [
        {
          text: 'Yes',
          role: 'cancel',
          handler: () => {
            console.log('Yes clicked');
            this.mapReset();
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No clicked');
          }
        }
      ]
    });
    alert.present();
  }

  mapReset() {
    var userdata = JSON.parse(localStorage.getItem('userData'));
    var alertType = {
      "alert_type": "C",
      "user_id":userdata['user_id']
    };
    this.AuthServiceProvider.postData(alertType,'cancelAlert').then((result) => {
      console.log(result);
      this.responseData = result;
      if(true == this.responseData.status){
        console.log(this.responseData.status);
        var alertData = JSON.parse(localStorage.getItem('userData'));
        alertData['alert_type'] = "N";
        localStorage.setItem('userData', JSON.stringify(alertData));
        this.refresh();
      }else{
        // toast2.present();
        console.log("Operation failed");
      }
    }, (err) => {
      console.log(err);
    });
  }

  refresh() {
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    console.log('page refreshed');
  }

   maploadview(){
      var userdata= JSON.parse(localStorage.getItem('userData'));
      console.log(userdata);
      if(userdata['alert_type'] == 'N') {
        this.getUseraddress();
        this.mapview=true;
        this.owner=false;
        this.alertmsg=false;
        this.alertbtn=true;
        this.confirmbtn=false;
      } else if(userdata['alert_type'] == 'B') {
        this.mapview=false;
        this.owner=true;
        this.alertmsg=false;
        this.alertbtn=false;
        this.confirmbtn=false;
        this.data.msg = '';
      } else if(userdata['alert_type'] == 'S'){
        this.mapview=false;
        this.owner=true;
        this.alertmsg=false;
        this.alertbtn=false;
        this.confirmbtn=false;
        this.data.msg = '';
      } else if(userdata['alert_type'] == 'BC') {
        //this.getUseraddress();
        this.navCtrl.setRoot(AlertmapPage);
        // this.mapview=true;
        // this.owner=false;
        // this.alertmsg=false;
        // this.alertbtn=false;
        // this.confirmbtn=true;
      } else if(userdata['alert_type'] == 'SC') {
        this.navCtrl.setRoot(AlertmapPage);
      } else if(userdata['alert_type'] == 'BP') {
        console.log("Bp");
        this.navCtrl.setRoot(AlertmapPage);
      } else if(userdata['alert_type'] == 'SP') {
        this.navCtrl.setRoot(AlertmapPage);
      }
          
   }

   cancelpush(){
    this.mapview=true;
    this.owner=false;
    this.maploadview();
    this.presentAlert();
   }
   sendcurpush(){
     let loader = this.loadingCtrl.create({content: "Please wait.."});
     loader.present();
    var user = JSON.parse(localStorage.getItem('userData'));
     this.AuthServiceProvider.postData(user, 'getUser').then((result) => {
      this.pushToAll = result;
      console.log(this.pushToAll);
    }, (err) => {
      console.log(err);
    }); 
     console.log("sendpush");
     this.userAllData = JSON.parse(localStorage.getItem('userAllData'));
     console.log(this.userAllData);
     this.AuthServiceProvider.postData(this.userAllData,'pushNearuser').then((result) => {
            this.responseData = result;
            this.regionals=this.responseData;
            console.log(this.regionals);
            this.deviceListObj = this.regionals;
            localStorage.setItem('nearUserdata', JSON.stringify(this.deviceListObj));
            this.push = this.jsonConcat(this.deviceListObj, this.pushToAll);
            console.log( this.push[0]);
            this.http.post('http://rayi.in/naboApi/pushall.php',this.push).subscribe((result) => {
                this.responseData = result;
                if(200 == this.responseData.status){
                  console.log(this.responseData);
                  loader.dismiss();
                  this.pushSendAlertOwner();
                  this.refresh();
                  this.http.post('http://rayi.in/naboApi/changeAlertType',this.push).subscribe((result) => {
                    this.responseData = result;
                    console.log(this.responseData);
                    if(200 == this.responseData.status) {
                     console.log("page move");
                      this.navCtrl.setRoot(AlertmapPage);
                    }
                  }, (err) => {
                      // Error log
                      console.log(err);
                    });
                }else{
                  // toast2.present();
                  console.log("Not send push");
                }
              }, (err) => {
                // Error log
                console.log(err);
              });
            console.log(this.responseData);
            var count = this.responseData.length;
            count = count - 1;
            console.log("count " +count);
            var pushdata = {};
            this.userAllData = JSON.parse(localStorage.getItem('userAllData'));
            pushdata['user_id'] = this.userAllData['user_id'];
            pushdata['pushcount'] = count;
            this.AuthServiceProvider.postData(pushdata, 'updateCount').then((result) => {
              console.log(result);
            },
            (err) => {
              console.log(err);
            });
       });
       
      //  
     //console.log(this.regionals);
    //  
   }
   sendpush(){
    this.mapview=false;
    this.owner=false;
    this.owneralertsend=true;
    this.rangeUser("start");
   
     
   }
  getUseraddress(){
    this.AuthServiceProvider.getData('getUseraddress').then((result) => {
      console.log(this.regionals);
            this.responseData = result;
         this.regionals=this.responseData;
      
               this.regionals.forEach(function (o) {
                Object.keys(o).forEach(function (k) {
                    if (isFinite(o[k])) {
                        o[k] = +o[k];
                    }
                });
            });

            console.log(this.regionals);
      this.mapload();
       });
  }
  alert(){
    //alertdata['confirm_type']='C';
    this.alertmsg=false;
    var alertmsgdata = JSON.parse(localStorage.getItem('alertdata'));
    alertmsgdata['msg']=this.ddata['msg'];
    localStorage.setItem('alertdata',JSON.stringify(alertmsgdata));
    console.log("data:"+JSON.stringify(alertmsgdata));
    this.AuthServiceProvider.postData(alertmsgdata, 'alertmsg').then((result) => {
     
      console.log(result);
    });
    this.http.post('http://rayi.in/naboApi/push.php',alertmsgdata).subscribe((result) => {
      this.responseData = result;
      console.log(this.responseData);
      if(200 == this.responseData.status){
       console.log(this.responseData);
       this.pushSendAlert();
       this.updatePushMsg();
       this.refresh();
        // toast1.present();
        // this.navCtrl.push(SigninPage);
          // localStorage.setItem('userData', JSON.stringify(this.responseData));
        console.log(this.responseData.status);
      }else{
        // toast2.present();
        
      }
    }, (err) => {
      // Error log
      console.log(err);
    });
  //  localStorage.setItem("userDeviceData",JSON.stringify(this.ddata));
   //console.log(regional);
   //var userdevicedata= JSON.parse(localStorage.getItem('userDeviceData'));
     
  }
  updatePushMsg() {
    var senderdata = JSON.parse(localStorage.getItem('userData'));
    var pushmsg = JSON.parse(localStorage.getItem('alertdata'));
    pushmsg['sender_id'] = senderdata['user_id'];
    this.AuthServiceProvider.postData(pushmsg, 'updatePushMsg').then((result) => {
        console.log(result);
    });
  }

  burglery(){

    this.alertdata = JSON.parse(localStorage.getItem('alertdata'));
    this.alertdata['alert_type']="B";
    localStorage.setItem('alertdata', JSON.stringify(this.alertdata));
    this.alertmsg=true;
   // document.getElementById("iw-content").classList.add('MyClass');
    
   // document.getElementById("MyElement").classList.remove('MyClass');
  }
  Suspicious() {
    this.alertdata = JSON.parse(localStorage.getItem('alertdata'));
    this.alertdata['alert_type']="S";
    localStorage.setItem('alertdata', JSON.stringify(this.alertdata));
    this.alertmsg=true;
  }


  ionViewDidLoad() {
    
    console.log('ionViewDidLoad MapPage');
    //start
    console.log('getUser');
  
  }
  /*##Get user location map starts##*/
  mapload(){
   // this.loadMap(13.08648395538330,80.27350616455078 );
    this.options = {
         enableHighAccuracy : true
    };
 
     this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
 
         this.currentPos = pos;      
         console.log(pos);
         console.log(pos.coords.latitude+','+pos.coords.longitude)
         //this.addMap(pos.coords.latitude,pos.coords.longitude);
       this.loadMap(pos.coords.latitude,pos.coords.longitude);
     },(err : PositionError)=>{
        console.log("error : " + err.message);
     });
  
  }
/*##map end##*/
  //  addInfoWindow(marker, content){
    
  //   let infoWindow = new google.maps.InfoWindow({
  //     content: content
  //    });
    
  //    google.maps.event.addListener(marker, 'click', () => {
  //     infoWindow.open(this.map, marker);
  //    });
    
  //  }
   /*##create gmap marker##*/
   createMarker(place)
  {
     let marker = new google.maps.Marker({
       map: this.map,
     animation: google.maps.Animation.DROP,
     draggable: true,
       position: place.geometry.location
       });   
   }   
 /*##user location mark in map##*/
    addMarker(){
      let cur_img='http://rayi.in/naboApi/mapicon/mylocation2.png';
          let marker = new google.maps.Marker({
          map: this.map,
          draggable: false,
          icon:cur_img,
          animation: google.maps.Animation.DROP,
          position: this.map.getCenter()
          });
      
          let content = "<p>This is your current position !</p>";          
          let infoWindow = new google.maps.InfoWindow({
          content: content
          });
      
          google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
         });
      
      }

    //   lastLatLng(marker){
    //     let geocoder = new google.maps.Geocoder();
    //     google.maps.event.addListener(this.map, 'dragend', () =>{ 
    //       // this.LastLat1= marker.position.lat();
    //       // this.LastLng1= marker.position.lng();
    //       this.LastLat1=this.map.getCenter().lat();
    //       this.LastLng1= this.map.getCenter().lng();
    //       let latlng = new google.maps.LatLng(this.LastLat1, this.LastLng1);
    //       let request = { latLng: latlng };
    //     console.log(this.LastLat1+','+this.LastLng1);
    //     geocoder.geocode(request, (results, status) => {
    //       if (status == google.maps.GeocoderStatus.OK) {
    //         let result = results[0];
    //         let rsltAdrComponent = result.address_components;
    //         console.log(rsltAdrComponent);
    //         let resultLength = rsltAdrComponent.length;
    //         if (result != null) {
    //          // this.marker.buildingNum = rsltAdrComponent[resultLength-8].short_name;
    //        //  this.marker.streetName = rsltAdrComponent[resultLength -7].short_name;
    //        var data = new Array;
    //        var locationdata = new Array();
    //        for(var i = 0; i < rsltAdrComponent.length; i++) {
    //          var obj = rsltAdrComponent[i];
    //          data.push(obj.long_name);
             
    //        }
    //      //console.log(locdata);
    //        if(data.length == 8) {
    //          var locdata = {
    //                          hus:data[0],
    //                          street:data[1],
    //                          city:data[4]
    //                        };
    //          locationdata.push(locdata);
    //          console.log(locationdata);
    //        } else if(data.length == 9){
    //                var locdata = {
    //                              hus:data[0],
    //                              street:data[1],
    //                              city:data[3]
    //                              };
    //          locationdata.push(locdata);
    //          console.log(locationdata);
    //        } else if(data.length == 10){
    //                var locdata = {
    //                              hus:data[0],
    //                              street:data[1],
    //                              city:data[5]
    //                              };
    //          locationdata.push(locdata);
    //          console.log(locationdata);
    //        }
         
    //          console.log(locationdata);
    //         } else {
    //           alert("No address available!");
    //         }
    //       }
    //     });
    //  });
    //   }
/*##User location load##*/
loadMap(lat,long){
  localStorage.setItem('userDeviceData', "");
  console.log("lat and lang")
  let latLng= new google.maps.LatLng(lat, long);
  let mapOptions={
    center:latLng,
    zoom:15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
this.map=new google.maps.Map(this.mapElement.nativeElement,mapOptions);
this.addMarker();

let markers = [];
for (let regional of this.regionals) {
  regional.distance = 0;
  regional.visible = false;
  regional.current = false;
  let nabo_img='http://rayi.in/naboApi/mapicon/nabo_home.png';
  console.log(regional.latitude+','+regional.longitude);
  let markerData = {
    position: {
      lat: regional.latitude,
      lng: regional.longitude
    },
    map: this.map,
    icon:nabo_img,
    title: regional.username,
  };

  regional.marker = new google.maps.Marker(markerData);
  markers.push(regional.marker);
  //let content = regional.username; 

  //infoWindow.open(this.map, regional.marker);
  regional.marker.addListener('click', () => {
    this.alertbtn = true;
    for (let c of this.regionals) {
      console.log(c);
      c.current = false;
      //c.infoWindow.close();
    }
    this.regionals = regional;
    let alert_img='http://rayi.in/naboApi/mapicon/alert_home.png';
    let markerData = {
      position: {
        lat: regional.latitude,
        lng: regional.longitude
      },
      map: this.map,
      icon:alert_img,
      title: regional.title,
    };
    regional.marker = new google.maps.Marker(markerData);
    markers.push(regional.marker);
    console.log(regional.marker);
    console.log(regional);
    this.alertdata['user_id']=regional.user_id;
    this.alertdata['deviceID']=regional.deviceID;
    this.alertdata['address_id']=regional.address_id;
    this.alertdata['lat']=regional.latitude;
    this.alertdata['lng']=regional.longitude;
    this.alertdata['streetname']=regional.street_address;
    this.alertdata['city']=regional.city;
    this.alertdata['country']=regional.country;
    this.alertdata['zipcode']=regional.zipcode;
    //this.alertdata['alert_type']='B';
    this.alertdata['msg']=this.ddata['msg'];
    console.log(this.alertdata);
    localStorage.setItem('alertdata', JSON.stringify(this.alertdata));
    console.log(regional.latitude+','+regional.longitude);
    let content = "<div id='iw-content' class='iw-content'><div class='iw-subTitle'>"+regional.username +"</div><p>"+regional.street_address+"</p><p>"+regional.city+",</p><p>"+regional.country+","+regional.zipcode+"</p></div>'";                   
    let infoWindow = new google.maps.InfoWindow({
    content: content
    });
    infoWindow.open(this.map, regional.marker);
  //   this.ddata = {
  //     "user_id":regional.user_id,
  //     "deviceID":regional.deviceID
  //  };
  //  console.log("data:"+JSON.stringify(data));
  //  localStorage.setItem("userDeviceData",JSON.stringify(data));
   //console.log(regional);
   this.map.panTo(regional.marker.getPosition());
  //  var userdevicedata= JSON.parse(localStorage.getItem('userDeviceData'));
  //  this.http.post('http://localhost:80/push/push.php',userdevicedata).subscribe((result) => {
  //    console.log(regional);
  //    this.responseData = result;
  //    if(true == this.responseData.status){
    // console.log(this.responseData);
       // toast1.present();
       // this.navCtrl.push(SigninPage);
         // localStorage.setItem('userData', JSON.stringify(this.responseData));
  //      console.log(this.responseData.status);
  //    }else{
      
       
  //    }
  //  }, (err) => {
     
  //    console.log(err);
  //  });
  });
}
}

rangeUser(event) {
  //this.submitProfile = true;
  console.log(event);
  var simpleObject = {};
  for (var prop in event) {
    if (!event.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof (event[prop]) == 'object') {
      continue;
    }
    if (typeof (event[prop]) == 'function') {
      continue;
    }
    simpleObject[prop] = event[prop];
  }
  console.log(this.valueData);
  var user_detail = this.userAllData;
  console.log(user_detail);
  if(event != "start"){
   // alert("undifine");
    console.log(simpleObject);
    var value = JSON.stringify(simpleObject);
    this.valueData = JSON.parse(value)._value;
    user_detail['valuedata'] =this.valueData;
  }else{
  // alert("value");
    user_detail['valuedata'] = this.valueData;
  }
  
  console.log(user_detail);

  this.AuthServiceProvider.postData(user_detail, 'getNearuser').then((result) => {
    this.nearData = result;
    

    console.log(this.nearData.length);
    this.rangeAvaUser=this.nearData.length-1;
  
       for (let regional of this.nearData) {
      console.log(regional.latitude + ',' + regional.longitude);
  

     }
    this.AuthServiceProvider.postData(user_detail, 'rangevalue').then((result) => {
      this.resdata = result;
      console.log(this.resdata);
      if(true == this.resdata.status){
        this.getUser();
          }
    });

  }, (err) => {
   
  });
 
}
}
