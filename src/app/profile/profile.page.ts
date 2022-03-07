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
import { Events } from 'src/app/event/events.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
image_path=image_path;
minTime:any='';
  maxTime:any= '18:30';
  newminTime:any='';
  submitted = false;
  applyForm: FormGroup;
  productForm: FormGroup;
      quantities() : FormArray {
    return this.productForm.get("quantities") as FormArray
  }
   
  newQuantity(): FormGroup {
    return this.fb.group({
      qty: '',
      price: '',
    })
  }
   
  addQuantity() {
    this.quantities().push(this.newQuantity());
  }
   
  removeQuantity(i:number) {
    this.quantities().removeAt(i);
    }
   userDetails: any;
 userId: any;
 isLoading = false;
 res:any;
 project:any='';
 category:any='';
 start_time:any='';
 start_timenw:any='';
 end_time:any='';
 work_description:any='';
 clientID:any='';
 clientCode:any='';
 newMin:any='';
 address:any='';
 current_address:any='';
 expense_amount:any='';
 stindex:any='';
 depositImage:any = "";
  depositImage2:any = "";
 isToggled: boolean;
 projecy_list:any="";
 category_list:any='';
 category_text:any='';
 subcategory_list:any='';
 subcategory_text:any='';
 subcategory:any='';
 project_text:any='';
 proof_doc:any='yes';
 imagePickerOptions = {
  maximumImagesCount: 1,
  quality: 50
};
bank_name:any='';
 blood_group:any='';
 email:any='';
 full_name:any='';
 ifsc_code:any='';
 phone:any='';
 account_no:any='';
 password:any='';
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
       public events: Events,
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
   
        this.stindex = this.route.snapshot.paramMap.get('id');
        this.isToggled = false;
       
   }
   ngOnInit() {
 
    this.storage.create();
    //this.storage.set("mintime",'09:30');
  //  this.storage.clear();s
  }
  ionViewWillEnter(){
   this.storage.get("genuserDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=val.ID;

       this.reloadDepositData();
        }else{
        this.navCtrl.navigateForward('login');
      }
        });
 
 
  }
    async submit_mode(){
	const loading = await this.loadingController.create({
        message: ''
      });
      
         
      var headers = new HttpHeaders();
      headers.append('content-type', 'application/json; charset=utf-8');
 

	  await loading.present();
			let localarray = {
				"userid": this.userId,
				"depositImage2":this.depositImage2,
               "password":this.password,
         
			
			};
       

			this.http.post(host+'change-user-password', JSON.stringify(localarray),{ headers: headers })
      .subscribe((res:any) => {
       console.log(res);
       loading.dismiss();
      if(res.status == true){
            this.password='';
       this.alertController.create({
         message: 'Successfully updated',
          buttons: ['OK']
        }).then(resalert => {
    
          resalert.present();
    
        });
        this.events.publish('user:profile', true);
       // this.navCtrl.back();
        }else{

        this.alertController.create({
         message: 'Something went wrong',
          buttons: ['OK']
        }).then(resalert => {
    
          resalert.present();
    
        });
        loading.dismiss();
        }
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });     
			
    
		
	}
	 async reloadDepositData(){
 
    //console.log(this.subject_name);
    
    const loading = await this.loadingController.create({
        message: ''
      });
      
          await loading.present();
      var headers = new HttpHeaders();
      headers.append('content-type', 'application/json; charset=utf-8');
   
      var data ={
        
        "userid": this.userId,
        
        //this.password
      }
      this.http.post(host+'get-user-details', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
        //console.log(res);
       loading.dismiss();
      if(res.status == true){
      	this.bank_name=res.response_data.bank_name;
 this.blood_group=res.response_data.blood_group;
 this.email=res.response_data.email;
 this.full_name=res.response_data.full_name;
 this.ifsc_code=res.response_data.ifsc_code;
 this.phone=res.responres.response_data.phone; 
  this.account_no=res.responres.response_data.account_no;
 this.depositImage=image_path+res.response_data.profile_pic;
        
        }else{
      
        loading.dismiss();
        }
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });
    
    
    

} 
 deposit_slip_image(sourceType){
    let options: CameraOptions = {
      quality: 30,
      targetWidth: 768,
      targetHeight: 1360,
       // allowEdit: true,
       destinationType: this.camera.DestinationType.FILE_URI,
       sourceType: sourceType,
      //sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
       mediaType: this.camera.MediaType.PICTURE
     };
     this.camera.getPicture(options).then(imageData => {
      
      this.base64.encodeFile(imageData).then((base64File: string) => {
        this.depositImage = base64File;
        this.depositImage2 = base64File;
        //this.proof_doc=base64File;
        // this.form.controls.ddImage = this.ddImage;				
      }, (err) => {
      //	this.showToastWithCloseButton("Image capture failed. Please try again.");
      });
  
     }, error => {
       console.log('ERROR -> ' + JSON.stringify(error));
     });
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.deposit_slip_image(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.deposit_slip_image(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
  imageViewer(imageToView,text=''){
    this.photoViewer.show(imageToView, text);
  }
}
