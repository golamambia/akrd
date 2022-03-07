import { Component, OnInit } from '@angular/core';
//import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { NavController} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { host } from '../../environments/environment';
import { DomSanitizer} from '@angular/platform-browser';
import { IonSlides } from '@ionic/angular';
import { image_path } from '../../environments/environment';
import { FormBuilder, FormArray, FormGroup, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { Injectable } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import * as _ from 'lodash';
declare var window: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  locationCordinates: any;
  timestamp: any;
  address:any;
   userId: any;
 isLoading = false;
 total_abn:any=0;
total_abp:any=0;
total_all:any=0;
total_an: any=0;
total_ap:any=0;
total_bn:any=0;
total_bp:any=0;
total_on:any=0;
total_op:any=0;
constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private route: ActivatedRoute,
       private datePipe: DatePipe,
       public nativeGeocoder: NativeGeocoder, 
       public geolocation: Geolocation,
       public camera: Camera,
       private photoViewer: PhotoViewer,
       private base64: Base64,
       public sanitizer: DomSanitizer,
       private file: File,
       public actionSheetController: ActionSheetController,
    
   ) {
    this.locationCordinates = {
      latitude: "",
      longitude: "",
      accuracy: "",
      timestamp: ""
    }
    this.timestamp = Date.now();
   }
   ionViewWillEnter(){
 
   
   this.storage.get("arkduserDetails").then(val=>{
    if(val){
      //console.log(val);
      this.userId=val.ID;
      this.getprojectList();
      }else{
        this.navCtrl.navigateForward('login');
      }
    });

   }


  ngOnInit() {
    
  
  }
     
openMenu() {
   this.menu.open();
 }

async getprojectList(){
 
    //console.log(this.subject_name);
    
    const loading = await this.loadingController.create({
        message: ''
      });
      
         
      var headers = new HttpHeaders();
      headers.append('content-type', 'application/json; charset=utf-8');
    //this.submitted = true;
    
      // await loading.present();
      //var data ={}
      var data ={
        
        "userid": this.userId,
        
        //this.password
      }
      this.http.post(host+'user-blood-group-count', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
        //console.log(res);
       loading.dismiss();
      if(res.status == true){
       
         this.total_abn=res.total_abn;
this.total_abp=res.total_abp;
this.total_all=res.total_all;
this.total_an=res.total_an;
this.total_ap=res.total_ap;
this.total_bn=res.total_bn;
this.total_bp=res.total_bp;
this.total_on=res.total_on;
this.total_op=res.total_op;
                 
       
        } 
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });
    
    
    

} 
}
