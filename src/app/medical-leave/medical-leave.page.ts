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
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
declare var window: any;
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { CreateleavegenPopoverComponent } from '../component/createleavegen-popover/createleavegen-popover.component';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-medical-leave',
  templateUrl: './medical-leave.page.html',
  styleUrls: ['./medical-leave.page.scss'],
})
export class MedicalLeavePage implements OnInit {
  minDate = new Date().toISOString();
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
 project:any;
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
 depositImage:any = "";
 isToggled: boolean;
 total_amount:any=0;
 uw_mode:any='';
 uw_txnno:any='';
 modelist:any='';
 leave_date:any='';
 leave_description:any='';
 total_leave:any='';
 leave_no:any='';
 leave_type:any='';
 
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
       private popoverController: PopoverController
       //public events: Events
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
 
        //this.clientID = this.route.snapshot.paramMap.get('clientName');
       // console.log(this.clientID);
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
this.getAmount();
        }else{
        this.navCtrl.navigateForward('login');
      }
      });
 // this.getcashMode();

  }
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
setMainTime(){
 // console.log(this.start_time);
  let tm=this.datePipe.transform(this.start_time, 'HH:mm');
  console.log(tm);
  this.start_timenw = moment(tm, "HH:mm").add(1, 'minutes').format('HH:mm');
//console.log(this.start_timenw)
}



  async submit_mode(){
    const loading = await this.loadingController.create({
      message: 'Sending...'
    });
    
       
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');

   if(!this.leave_type){
  this.alertController.create({
    message:'Please select leave create',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.leave_date){
  this.alertController.create({
    message:'Please select date',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.leave_description){
  this.alertController.create({
    message:'Please enter reason',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
else if(!this.depositImage){
  this.alertController.create({
    message:'Please select image',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
else{
  await loading.present();

			var data = {
				
        leave_type : this.leave_type,
				leave_date : this.leave_date,
        userId:this.userId,
        leave_description : this.leave_description,
        depositImage:this.depositImage,
        la_leave_type:'med',
        
			};
      this.http.post(host+'user-leave-application-create', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
        //console.log(res);
       loading.dismiss();
      if(res.status == true){
        this.leave_type='';
        this.leave_date='';
        this.leave_description='';
         this.getAmount();
        this.alertController.create({
          message: 'Request successful',
           buttons: ['OK']
         }).then(resalert => {
     
           resalert.present();
     
         });
         this.navCtrl.back();
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
      // this.form.controls.ddImage = this.ddImage;        
    }, (err) => {
    //  this.showToastWithCloseButton("Image capture failed. Please try again.");
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
  async getAmount(){
     
    const loading = await this.loadingController.create({
      message: ''
    });
    
       
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');
  //this.submitted = true;
  
     //await loading.present();
    //var data ={}
    var data ={
      
      "userid": this.userId,
      "search_date":'',
      "search_status":'',
      "leave_type":'',
      
      //this.password
    }
    this.http.post(host+'user-leave-application-get', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
     // console.log(res);
     loading.dismiss();
    if(res.status == true){
          
      this.total_leave=res.total_leave;
           
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
  getLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      let options: NativeGeocoderOptions = {
				useLocale: true,
				maxResults: 5
			};

      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
			.then((result: NativeGeocoderResult[]) => {
				// let data = {'pincode':result[0].postalCode, 'userId':10, 'type':'location', 'lat':this.latitude, 'lng': this.longitude}
       // console.log(result[0]);
        this.address=result[0].thoroughfare+','+result[0].postalCode+','+result[0].subAdministrativeArea
        +','+result[0].administrativeArea +','+result[0].countryName;
			}).catch((error: any) => console.log(error));
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  getModeval(val){
//console.log(val);
  }
  async settingsPopover(ev: any) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: CreateleavegenPopoverComponent,
      event: ev,
      cssClass: 'popover_setting',
      componentProps: {
        site: siteInfo
      },
      translucent: true
    });

    popover.onDidDismiss().then((result) => {
      //console.log(result.data);
    });

    return await popover.present();
    /** Sync event from popover component */

  }

}
