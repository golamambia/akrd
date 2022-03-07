import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { host } from '../environments/environment';
import { image_path } from '../environments/environment';
import { logval } from '../environments/environment';
import { Events } from 'src/app/event/events.service';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { Network } from '@ionic-native/network/ngx';
import { UtilServiceService } from 'src/app/providers/network/util-service.service';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { WatcherServiceService } from 'src/app/providers/watch-possition/watcher-service.service';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
//import { UtilServiceService } from 'src/app/providers/network/util-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
page:any;
 userDetails: any;
 userId: any;
 isLoading = false;
 imag_path=image_path;
 logval=logval.production;
  text: string;
  disconnectSubscription:any='';
  networkAlert:any='';
  connectSubscription:any='';
  watch:any='';
  battery_status:any='';
  lat:any='';
  long:any='';
  ionVersionNumber: string;
  ionVersionCode: string|number;
  getVersionNumber: string;
  appversionAlert:any='';
  st_downloadlink:any='';
  constructor(
    private platform: Platform,
    //private splashScreen: SplashScreen,
    //private statusBar: StatusBar,
    private menu: MenuController,
    private navCtrl: NavController,
    public storage: Storage,
    public events: Events,
    private batteryStatus: BatteryStatus,
    public util : UtilServiceService,
    public network:Network,
    public nativeGeocoder: NativeGeocoder, 
    private locationAccuracy: LocationAccuracy,
    private geolocation: Geolocation,    
    private androidPermissions: AndroidPermissions,
    public watcherservice:WatcherServiceService,
    private http: HttpClient,
     private appVersion: AppVersion,
    public splashScreen: SplashScreen,
  )  {
    
    this.initializeApp();
  }
  initializeApp() {
    this.platform.ready().then(() => {
    setTimeout(()=>{
      //console.log(1234);
     
      this.checkInternetConnection();
      this.checkGpsConnection();
      this.utilService();
      this.getVersion();

    },6000);
    //console.log(123);
    this.getUserDetails();
   this.checkVersion();
   this.splashScreen.hide();
   });
  }
    ngOnInit() {
       
   // this.storage.create();
    
      
    this.events.subscribe('user:login', (data) => {
      
      //console.log(data);
      if(data){
        this.getUserDetails();
      }
     
    });
    this.events.subscribe('user:profile', (data) => {
      
      //console.log(data);
      if(data){
        this.getUserDetails();
      }
     
    });
  }
 checkVersion(){
   var headers = new HttpHeaders();
  headers.append('content-type', 'application/json; charset=utf-8');
   var data ={
          
    "userId": this.userId,
     //this.password
  }
//    this.http.post(host+'get-app-version', JSON.stringify(data),{ headers: headers })
//   .subscribe((res:any) => {
// //console.log(res);
// if(res.status){
// //console.log(res.response_data.st_appversion);
// this.getVersionNumber=res.response_data.st_appversion;
// this.st_downloadlink=res.response_data.st_downloadlink;
// }
//   });
 }
  getUserDetails() {
    this.storage.create();
   this.storage.get("arkduserDetails").then(val=>{
      if(val){
        //console.log(val.ID);
        //this.userDetails = val;
        this.userId=val.ID;

      var headers = new HttpHeaders();
      headers.append('content-type', 'application/json; charset=utf-8');
   
      var data ={
        
        "userid": this.userId,
        
        //this.password
      }
      this.http.post(host+'get-user-details', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
        //console.log(res);
     
      if(res.status == true){
       this.userDetails =res.response_data[0];
        
        }
      }, (err) => {
        //console.log(err);
       
      });
    

      }else{
         this.navCtrl.navigateForward('login');
        this.userDetails = null;
       
      }
    })

  }
 async getVersion(){
   // console.log(this.getVersionNumber);
   var msgtext='<a href="'+this.st_downloadlink+'"  > Download link </a>';
    this.appversionAlert = await this.util.createAlert('Please update your app or download latest version!',     false, msgtext,{
        text: '',
        role: '',
        cssClass: 'secondary',
        handler: async () => {}
      });
      
      //this.appversionAlert.present();
    this.appVersion.getVersionNumber().then(res => {
            this.ionVersionNumber = res;
if(res){
 if(this.getVersionNumber && this.ionVersionNumber){
            if(this.getVersionNumber!=this.ionVersionNumber){
              this.appversionAlert.present();
            }else{
              if(this.appversionAlert) {
        this.appversionAlert.dismiss();
        //this.checkUser();
      }
            }
          }

          }
            //console.log(this.getVersionNumber);
            //console.log(res);
          }).catch(error => {
           // alert(error);
          });

          this.appVersion.getVersionCode().then(res => {
            this.ionVersionCode = res;
             console.log(res);
          }).catch(error => {
           // alert(error);
          });
  }
logout(){

    this.storage.remove("arkduserDetails");
    //this.storage.set("checkin",0);
    //.then(() => { this.events.publish('user:login', false) });
    this.userDetails = null;
    this.navCtrl.navigateForward('login');
     this.menu.close();
     //this.events.publish('user:logout', true);
  }
  close(){
    this.menu.close();
  }

 checkInternetConnection(){
   //console.log(123);
   this.disconnectSubscription = this.network.onDisconnect().subscribe(async () => {
     // console.log('network was disconnected :-(');
      this.networkAlert = await this.util.createAlert('No Internet',     false, 'Please Check you internet Connection and try again',{
        text: '',
        role: '',
        cssClass: 'secondary',
        handler: async () => {}
      });
      //alert('Please Check you internet Connection and try again');
      this.networkAlert.present();
    });
    this.connectSubscription = this.network.onConnect().subscribe(() => {
     // console.log('network connected!');
      if(this.networkAlert) {
        this.networkAlert.dismiss();
        //this.checkUser();
      }
    });
 }
 checkGpsConnection(){
  this.watch = this.geolocation.watchPosition();
  this.watch.subscribe((data) => {
    // usable data
    //console.log(data.coords);
    this.lat=data.coords.latitude;
    this.long=data.coords.longitude;
    
    //alert(1+data)
  }, (error) => {
   // alert(error)
    // some error
  }, { timeout: 30000 });
 }
 public ngOnDestroy(): void {
  this.watch.unsubscribe();
}
utilService(){
  //console.log(123);
  setInterval(() => 
  //console.log('done') 
  this.statusPost()
  ,300000);
}
statusPost(){
  this.storage.get("arkduserDetails").then(val=>{
    if(val){
      this.userDetails = val;
      this.userId=val.ID;
      //console.log(val);
    }
  });
  this.watch = this.geolocation.watchPosition();
  this.watch.subscribe((data) => {
    // usable data
   // console.log(data);
    this.lat=data.coords.latitude;
    this.long=data.coords.longitude;
    //alert(1+data)300000
  });
  var headers = new HttpHeaders();
  headers.append('content-type', 'application/json; charset=utf-8');
  //console.log('done') ;
  this.batteryStatus.onChange().subscribe(status => {
    console.log('batteryStatus', status.level);
    this.battery_status=status.level;
  });
  var data ={
          
    "userId": this.userId,
    "battery_status":this.battery_status,
    "lat":this.lat,
    "long":this.long,
    //this.password
  }
//   this.http.post(host+'device-status-post', JSON.stringify(data),{ headers: headers })
//   .subscribe((res:any) => {
// //console.log(res);
//   });
}
}
