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
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.page.html',
  styleUrls: ['./attendence.page.scss'],
})
export class AttendencePage implements OnInit {
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
  name:any;
 subject_name:any=[];
 marks:any=[];
 percentage:any=[];
 document:any=[];
 depositData:any = [];
 clientCode = "";
 clientName:'';
 total_work_time:any='';
 total_work_hrs:any=0;
 total_work_min:any=0;
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private datePipe: DatePipe,
       //public events: Events
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
   this.storage.get("userDetails").then(val=>{
      if(val){
        this.userDetails = val;
       // this.userId=this.userDetails.response_data.id;
        }
        });
   }

  ngOnInit() {
    this.storage.create();
    // this.storage.clear();
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
  ionViewWillEnter(){
    this.storage.get("mintime").then((val) => {
      if(val){
       let tm=this.datePipe.transform(val, 'hh:mm');
       this.newminTime = moment(tm, "hh:mm").add(1, 'minutes').format('hh:mm'); 
       this.minTime=tm;
       //moment(tm, "hh:mm").add(1, 'minutes').format('hh:mm');;
   //console.log( this.newminTime);
      }else{
       this.minTime='09:30';
       this.newminTime ='09:31';
      }
       });
  }
  ionViewDidEnter(){
  //  this.storage.clear();
    this.reloadDepositData();
  
    
  }

  async reloadDepositData(){
    //let d
	await this.storage.forEach( (value, key, index) => {
      if(key == 'attendenceData'){
        //console.log(value.length);
       var milliseconds=0;
       var lngth=0;
        this.depositData = value;
        value.forEach(element => {
        var parsedServerOutTime = moment(element.end_time24, "HH:mm");
    var parsedServerInTime = moment(element.start_time24, "HH:mm");
   
     milliseconds += parsedServerOutTime.diff(parsedServerInTime)/ 1000;
      lngth +=1;
      if(value.length==lngth){
        let hours   = Math.floor(milliseconds / 3600); // get hours
     let minutes = Math.floor((milliseconds - (hours * 3600)) / 60);
     if(hours){
      this.total_work_time=Math.abs(hours)+' hrs '+Math.abs(minutes)+' min';
      this.total_work_hrs=Math.abs(hours);
      this.total_work_min=Math.abs(minutes);
     }else{
      this.total_work_time=Math.abs(minutes)+' mins';
      this.total_work_hrs=Math.abs(hours);
      this.total_work_min=Math.abs(minutes);
     }
       
      }
    //console.log(lngth);
        //let min=
      });
      }
		 
     
	  });

  } 
  addAttendence(){
    this.navCtrl.navigateForward(['/attendence-single', {
     // clientName: 'test',
     
    }]);
  }

  edit_attendence(i,data){
    this.navCtrl.navigateForward(['/attendence-single-edit', {
      index: i, 
    }]);
  }
  async remove_attendence(id){
    
    const alert = await this.alertController.create({
     
      message: 'Are you sure to delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            //console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            //console.log('Confirm Okay');
          	 this.storage.forEach( (value, key, index) => {
              if(key == 'attendenceData'){
             
                value.forEach((val, key) => {
                 
                  if(key == id){
                 
                    this.depositData.splice(key, 1);
                    this.storage.remove(key).then((r) => {
                      if(id==0){
                        this.storage.set("mintime",'');
                        this.total_work_time='';
                      }else{
                        value.forEach((val2, key2) => {
                        if(key2==(id-1)){
                          //console.log(val2.mintime);
                          this.storage.set("mintime",val2.mintime);
                        }
                      });
                      }
                      this.storage.set('attendenceData', this.depositData).then((r) => {;
                      this.reloadDepositData();
                     // this.storage.set("mintime",'06:30');
                    });
                    });
                  }
                });
              }
             
             
            });
            
          }
        }
      ]
    });

    await alert.present();

  } 


}
