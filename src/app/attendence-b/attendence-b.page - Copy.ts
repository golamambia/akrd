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
  selector: 'app-attendence-b',
  templateUrl: './attendence-b.page.html',
  styleUrls: ['./attendence-b.page.scss'],
})
export class AttendenceBPage implements OnInit {
  today = new Date().toISOString();
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
  name:any='';
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
 checkin:number=0;
 leave_check:any='';
 holiday_check:any='';
assign_check:any='';
attendence_status:any=0;
attendence_statusmsg:any='';
checkinFirststaus:any='';  
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
  
        
   }

  ngOnInit() {
    this.storage.create();
     //this.storage.clear();
  }
       async submit(){
//console.log(this.subject_name);

const loading = await this.loadingController.create({
    message: 'Sending...'
  });
  
     
  var headers = new HttpHeaders();
  headers.append('content-type', 'application/json; charset=utf-8');
//this.submitted = true;
    if (this.name=='' && this.name==null) {
      this.alertController.create({
      
        message: 'Enter name',
        buttons: ['OK']
      }).then(resalert => {
  
        resalert.present();
  
      });
      loading.dismiss();
    }else{

      const alert = await this.alertController.create({
     
        message: 'Are you sure to final submit',
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

      
    loading.present();
  //var data ={}
  var data ={
		
		"ua_createdBy": this.userId,
		"deposit_data": this.depositData,
    //this.password
	}
  this.http.post(host+'user-attendence-add', JSON.stringify(data),{ headers: headers })
  .subscribe((res:any) => {
   // console.log(res);
   loading.dismiss();
  if(res.status == true){
    this.storage.remove("attendencebData");
      this.depositData=[];
      this.total_work_time='';
     this.reloadDepositData();
    this.alertController.create({
      message: 'Attendence successful',
       buttons: ['OK']
     }).then(resalert => {
 
       resalert.present();
 
     });
   
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
]
});

await alert.present();


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
    //this.reloadDepositData();
    //this.storage.clear();

  this.storage.get("genuserDetails").then(val=>{
    if(val){
      this.userDetails = val;
      this.userId=val.ID;
      this.getUser();
      }
      });
      this.getData(); 
      this.checkin_check();
  }

  ionViewDidEnter(){
    this.checkin_check();
    this.reloadDepositData();
    //this.getData(); 
    
    
  }
  gotorequestpage(){
    this.navCtrl.navigateForward(['/user-attendense-list', {
     // clientName: 'test',
     
    }]);
  }
  async  checkin_check(){
    await this.storage.get("checkin").then((val) => {
      if(val){
      
       this.checkin=1;
    //console.log(val);
    
      }else{
        this.checkin=0;
      }
    });
   
  }
  async reloadDepositData(){
   // this.checkin_check();
    //let d
   // console.log(1234);
	await this.storage.forEach( (value, key, index) => {
      if(key == 'attendencebData'){
       // console.log(value);
       var milliseconds=0;
       var lngth=0;
        this.depositData = value;
        value.forEach(element => {
          if(element.end_time && element.start_time){
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
    }
      });
      }
		 
     
	  });

  } 
  addAttendence(){
    this.navCtrl.navigateForward(['/attendence-b-add', {
     // clientName: 'test',
     
    }]);
  }

  edit_attendence(i,data){
    this.navCtrl.navigateForward(['/attendence-b-edit', {
      index: i, 
    }]);
  }
  edit_attendence2(i,data){
    this.navCtrl.navigateForward(['/attendence-b-update', {
      index: i, 
    }]);
  }
  async remove_attendence(id,chk:number){
    //console.log(chk);
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
              if(key == 'attendencebData'){
             
                value.forEach((val, key) => {
                 
                  if(key == id){
                 
                    this.depositData.splice(key, 1);
                    this.storage.remove(key).then((r) => {
                      if(id==0){
                       
                        this.total_work_time='';
                      }
                      this.storage.set('attendencebData', this.depositData).then((r) => {
                        if(chk!=0){
                          this.checkin=0;
                          this.storage.set("checkin",0).then((r) => {
                            this.reloadDepositData();
                           
                           //console.log('A');
                        });
                        }else{
                          this.reloadDepositData();
                          //console.log('b');
                        }
                      
                    
                     
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
  async getData(){
     
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
      
      
      //this.password
    }
    this.http.post(host+'assign-leave-check', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
     // console.log(res);
     loading.dismiss();
    if(res.status == true){
       
      this.holiday_check=res.holiday_leave;
      this.assign_check=res.assign_leave;
      if(this.holiday_check.length){
        
        if(this.assign_check.length){
          this.attendence_status=1;
          this.attendence_statusmsg='';
        }else{
          this.attendence_status=0;
          this.attendence_statusmsg='Today is holiday';
        }
      }else{
        this.attendence_statusmsg='';
        this.attendence_status=1;
      }
         
      }else{
      
    
      loading.dismiss();
      }
    }, (err) => {
      //console.log(err);
      loading.dismiss();
    });
  
  
  }
  async checkinFirst(){
     
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
            
      //this.password
    }
    this.http.post(host+'attendence-checkin-first', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
      console.log(res);
     loading.dismiss();
    if(res.status == true){
       
      this.checkinFirststaus=1;
    
         
      }else{
      
    
      loading.dismiss();
      }
    }, (err) => {
      //console.log(err);
      loading.dismiss();
    });
  
  
  }
  async getUser(){
     
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
            
      //this.password
    }
    this.http.post(host+'get-user-details', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
      console.log(res);
     loading.dismiss();
    if(res.status == true){
       if(res.response_data.log_status){
        this.checkinFirststaus=1;
       }else{
        this.checkinFirststaus=0;
       }
      //this.checkinFirststaus=1;
    
         
      }else{
      
    
      loading.dismiss();
      }
    }, (err) => {
      //console.log(err);
      loading.dismiss();
    });
  
  
  }

}
