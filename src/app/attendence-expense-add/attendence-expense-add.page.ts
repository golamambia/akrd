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
import * as _ from 'lodash';
import { ActionSheetController } from '@ionic/angular';
import { AddexpensePopoverComponent } from '../component/addexpense-popover/addexpense-popover.component';
import { PopoverController } from '@ionic/angular';
declare var window: any;
@Component({
  selector: 'app-attendence-expense-add',
  templateUrl: './attendence-expense-add.page.html',
  styleUrls: ['./attendence-expense-add.page.scss'],
})
export class AttendenceExpenseAddPage implements OnInit {
  maxDate = new Date(new Date().setDate(new Date().getDate())).toISOString();
  minDate=new Date(new Date().setDate(new Date().getDate() - 10)).toISOString();
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
 depositImage:any = "";
 isToggled: boolean;
 projecy_list:any="";
 category_list:any='';
 category_text:any='';
 subcategory_list:any='';
 subcategory_text:any='';
 subcategory:any='';
 uwe_from:any='';
 uwe_to:any='';
 uwe_where:any='';
 uwe_startkm:any='';
 uwe_endkm:any='';
 expense_date:any='';
 proof_doc:any='yes';
 uwe_vehicle_no:any='';
 imagePickerOptions = {
  maximumImagesCount: 1,
  quality: 50
};
 service_name:any='';
 s_age:any='';
 s_gender:any='';
 s_phone:any='';
 s_blood_group:any='';
 service_description:any='';
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
    this.storage.get("arkduserDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=val.ID;
        // this.getprojectList();
        // this.getcategoryList();
        }
      });
this.getLocation();
  }
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}
setMainTime(){
 // console.log(this.start_time);
  let tm=this.datePipe.transform(this.start_time, 'HH:mm');
  //console.log(tm);
  this.start_timenw = moment(tm, "HH:mm").add(1, 'minutes').format('HH:mm');
//console.log(this.start_timenw)
}
importFile(event,index) {
  console.log(event);
    if (event.target.files && event.target.files.length > 0) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length)
        return;

      var fileName = files[0].name.toUpperCase();
      // this.document[index] = files[0];
      // if (fileName.endsWith(".JPG") || fileName.endsWith(".JPEG") || fileName.endsWith(".PNG")) {
      //   //console.log(files[0]);
      //   this.document[index] = files[0];
       
      // } else {
      //  this.document[index] = null;
       
      // }
    }

  }

  async submit_mode(){
    const loading = await this.loadingController.create({
      message: 'Sending...'
    });
    
       
    var headers = new HttpHeaders();
    headers.append('content-type', 'application/json; charset=utf-8');
if(!this.service_name){
  this.alertController.create({
    message:'Please enter name',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.s_age){
  this.alertController.create({
    message:'Please enter age',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.s_gender){
  this.alertController.create({
    message:'Please select gender',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
else if(!this.s_phone){
  this.alertController.create({
    message:'Please enter phone no',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
else if(!this.s_blood_group){
  this.alertController.create({
    message:'Please select blood group',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
} 
else{
 
  
  //console.log(splitted)
  let localarray = {
    service_name : this.service_name,
    s_age : this.s_age,
    s_gender : this.s_gender,
    s_phone :this.s_phone,
    s_blood_group : this.s_blood_group,
    service_description : this.service_description,
     userid:this.userId
        
			};
     

      await loading.present();
      
      this.http.post(host+'user-blood-group-add', JSON.stringify(localarray),{ headers: headers })
      .subscribe((res:any) => {
       // console.log(res);
       loading.dismiss();
      if(res.status == true){
       
          
        this.alertController.create({
          message: 'Data save successful',
           buttons: ['OK']
         }).then(resalert => {
     
           resalert.present();
     
         });
       	this.navCtrl.back();
        
   
          this.service_name='';
          this.s_age='';
          this.s_gender='';
          this.s_phone='';
         this.s_blood_group='';
          this.service_description='';
          
         
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
      this.http.post(host+'user-project-get', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
        //console.log(res);
       loading.dismiss();
      if(res.status == true){
       
         this.projecy_list=res.response_data;
                 
       
        }else{

        // this.alertController.create({
        //  message: 'Something went wrong',
        //   buttons: ['OK']
        // }).then(resalert => {
    
        //   resalert.present();
    
        // });
        loading.dismiss();
        }
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });
    
    
    

} 
async getcategoryList(){
 
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
    this.http.post(host+'expense-category-get', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
    //  console.log(res);
     loading.dismiss();
    if(res.status == true){
     
       this.category_list=res.response_data;
               
     
      }else{

      // this.alertController.create({
      //  message: 'Something went wrong',
      //   buttons: ['OK']
      // }).then(resalert => {
  
      //   resalert.present();
  
      // });
      loading.dismiss();
      }
    }, (err) => {
      //console.log(err);
      loading.dismiss();
    });
  
  
  

} 
async getsubcategoryList(){
 
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
      "catid": this.category,
      //this.password
    }
    this.http.post(host+'expense-subcategory-get', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
     // console.log(res);
     loading.dismiss();
    if(res.status == true){
     
       this.subcategory_list=res.response_data;
               
     
      }else{

      // this.alertController.create({
      //  message: 'Something went wrong',
      //   buttons: ['OK']
      // }).then(resalert => {
  
      //   resalert.present();
  
      // });
      loading.dismiss();
      }
    }, (err) => {
      //console.log(err);
      loading.dismiss();
    });
  
  
  

} 
getDropDownText2(id, object){
  const selObj = _.filter(object, function (o) {
      return (_.includes(id,o.ID));
  });
  return selObj;

}
getDropDownText(id, object){
  const selObj = _.filter(object, function (o) {
      return (_.includes(id,o.ec_ID));
  });
  return selObj;

}
selectChange(id) {
  this.subcategory='';
this.getsubcategoryList();
  this.category_text = this.getDropDownText(id, this.category_list)[0].ec_name;
 // console.log(this.category_text);
  
}

getDropDownTextsub(id, object){
  const selObj = _.filter(object, function (o) {
      return (_.includes(id,o.ec_ID));
  });
  return selObj;

}
selectChangesub(id) {
//this.getsubcategoryList();
  this.subcategory_text = this.getDropDownTextsub(id, this.subcategory_list)[0].ec_name;
  console.log(this.subcategory_text);
  
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
        //console.log(result);
        this.address=result[0].subLocality+','+result[0].locality+','+result[0].postalCode+','+result[0].subAdministrativeArea
        +','+result[0].administrativeArea +','+result[0].countryName;
			}).catch((error: any) => console.log(error));
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  async getLocationRel(){
   const loading = await this.loadingController.create({
        message: ''
      });
   loading.present();
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      let options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 5
      };

      this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
         loading.dismiss();
        // let data = {'pincode':result[0].postalCode, 'userId':10, 'type':'location', 'lat':this.latitude, 'lng': this.longitude}
       // console.log(result[0]);
       this.address=result[0].subLocality+','+result[0].locality+','+result[0].postalCode+','+result[0].subAdministrativeArea
       +','+result[0].administrativeArea +','+result[0].countryName;
      }).catch((error: any) => //console.log(error)
       loading.dismiss()
      );
     }).catch((error) => {
        loading.dismiss();
       console.log('Error getting location', error);
     });
  }
  async settingsPopover(ev: any) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: AddexpensePopoverComponent,
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
