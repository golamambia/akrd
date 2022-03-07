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
import { FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
})
export class AttendencePage implements OnInit {
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
  name:any;
 subject_name:any=[];
 marks:any=[];
 percentage:any=[];
 document:any=[];
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder
       //public events: Events
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
   this.storage.get("userDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=this.userDetails.response_data.id;
        }
        });
   }

  ngOnInit() {
  }
       async submit(){
//console.log(this.subject_name);

const loading = await this.loadingController.create({
    message: 'Sending...'
  });
  
     
var headers = new Headers();
//this.submitted = true;
    if (this.name=='' && this.name==null) {
      return;
    } 
else{
   await loading.present();
  //var data ={}
   const data = new FormData();
    
    data.append("subject_name", JSON.stringify(this.subject_name));
    data.append("marks", JSON.stringify(this.marks));
    data.append("percentage", JSON.stringify(this.percentage));
     

    for(let i=0; i< this.document.length; i++){
      data.append("document[]", this.document[i]);
    }
   //formData.append('data', JSON.stringify(data));
  this.http.post(host+'post-apply-form', data)
  .subscribe((res:any) => {
    //console.log(res.json());
    res = res.json();
    if(res.status == false){
    loading.dismiss();
    this.alertController.create({
      
      message: res.message,
      buttons: ['OK']
    }).then(resalert => {

      resalert.present();

    });
    
    }else if(res.status == true){
   //     this.fname='';
   //     this.email='';
   // this.phone='';
   //  this.message='';
   // this.alertController.create({
      
   //    message: res.message,
   //    buttons: ['OK']
   //  }).then(resalert => {

   //    resalert.present();

   //  });
   this.navCtrl.navigateForward('form-success/'+res.response_data);
    loading.dismiss();
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
       this.document[index] = files[0];
      // if (fileName.endsWith(".JPG") || fileName.endsWith(".JPEG") || fileName.endsWith(".PNG")) {
      //   //console.log(files[0]);
      //   this.document[index] = files[0];
       
      // } else {
      //  this.document[index] = null;
       
      // }
    }

  }
}
