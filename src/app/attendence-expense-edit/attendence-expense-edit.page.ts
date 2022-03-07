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
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
declare var window: any;

@Component({
  selector: 'app-attendence-expense-edit',
  templateUrl: './attendence-expense-edit.page.html',
  styleUrls: ['./attendence-expense-edit.page.scss'],
})
export class AttendenceExpenseEditPage implements OnInit {
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
 stindex:any='';
 depositImage:any = "";
 isToggled: boolean;
 projecy_list:any="";
 category_list:any='';
 category_text:any='';
 subcategory_list:any='';
 subcategory_text:any='';
 subcategory:any='';
 project_text:any='';
 uwe_from:any='';
 uwe_to:any='';
 uwe_where:any='';
 expense_date:any='';
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
       //public events: Events
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
  
        this.stindex = this.route.snapshot.paramMap.get('index');
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
        this.getprojectList();
        this.getcategoryList();
        }
      });
  this.reloadDepositData();
this.getLocation();
  }
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
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
	
if(!this.project){
  this.alertController.create({
    message:'Please select project',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.category){
  this.alertController.create({
    message:'Please select category',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.subcategory){
  this.alertController.create({
    message:'Please select type',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.category==1 && !this.uwe_from){
  this.alertController.create({
    message:'Please enter from',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.category==1 && !this.uwe_to){
  this.alertController.create({
    message:'Please enter to',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.category==4 && !this.uwe_where){
  this.alertController.create({
    message:'Please enter where',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(this.category==11 && !this.uwe_where){
  this.alertController.create({
    message:'Please enter where',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.expense_date){
  this.alertController.create({
    message:'Please select date',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}else if(!this.expense_amount){
  this.alertController.create({
    message:'Please enter amount',
     buttons: ['OK']
   }).then(resalert => {

     resalert.present();

   });
}
// else if(!this.work_description){
//   this.alertController.create({
//     message:'Please enter description',
//      buttons: ['OK']
//    }).then(resalert => {

//      resalert.present();

//    });
// }
else{


  var splitted = this.getDropDownText2(this.project, this.projecy_list); 
  var splitted2 = this.getDropDownTextsub(this.subcategory, this.subcategory_list); 
  //console.log(splitted)
  let localarray = {
    projectid : splitted[0].sub_project_id,
    project : this.project,
    project_full : this.project,
    project_text :splitted[0].project_id+' > '+splitted[0].sub_project_id,
    category : this.category,
    category_text : this.category_text,
    subcategory : this.subcategory,
    subcategory_text : splitted2[0].ec_name,
    uwe_from : this.uwe_from,
    uwe_to : this.uwe_to,
    uwe_where : this.uwe_where,
        expense_amount : this.expense_amount,
				work_description : this.work_description,
        depositImage:this.depositImage,
        address:this.address,
        expense_date:this.expense_date,
			
			};
      //console.log(this.end_time);

			let toBeUpload:any = '';

			await this.storage.forEach( (value, key, index) => {
				if(key == 'attendenceExpense'){
				
            toBeUpload=value;
            toBeUpload[this.stindex] = localarray;
				
				}
			});
			
      
			
     
      	this.storage.set("attendenceExpense",toBeUpload).then((r) => {
         
					this.navCtrl.back();
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
      //console.log(res);
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
      //console.log(res);
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
 // console.log(this.category_text);
  
}

  async reloadDepositData(){
    //let d
	await this.storage.forEach( (value, key, index) => {
      if(key == 'attendenceExpense'){
              
        value.forEach((element,index) => {
      if(index==this.stindex){
      
        this.project=element.project;
        this.project_text=element.project_text;
        this.category=element.category;
        this.category_text=element.category_text;
        this.subcategory=element.subcategory;
        this.subcategory_text=element.subcategory_text;
        this.uwe_from = element.uwe_from;
        this.uwe_to = element.uwe_to;
        this.uwe_where = element.uwe_where;
        this.expense_amount=element.expense_amount;
      
        this.work_description=element.work_description;
        this.depositImage=element.depositImage;
        this.address=element.address;
        this.expense_date=element.expense_date;
        //console.log(element.subcategory_text);
      }
     
      });
      }
		 
     
	  });

  } 
  deposit_slip_image(){
		let options: CameraOptions = {
			quality: 30,
			targetWidth: 768,
			targetHeight: 1360,
 			// allowEdit: true,
 			destinationType: this.camera.DestinationType.FILE_URI,
			sourceType: this.camera.PictureSourceType.CAMERA,
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
       // console.log(result[0]);
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

}
