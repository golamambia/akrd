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
  selector: 'app-attendence-expense',
  templateUrl: './attendence-expense.page.html',
  styleUrls: ['./attendence-expense.page.scss'],
})
export class AttendenceExpensePage implements OnInit {
  today = Date.now();
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
       await loading.present();
      //var data ={}
      var data ={
        
        "uwe_createdBy": this.userId,
        "deposit_data": this.depositData,
        //this.password
      }
      this.http.post(host+'user-work-expense-add', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
       // console.log(res);
       loading.dismiss();
      if(res.status == true){
        this.storage.remove("attendenceExpense");
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
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  ionViewWillEnter(){
    // let gg=this.datePipe.transform(this.today, 'yyyy-MM-dd');
    // console.log(gg);
    this.storage.get("genuserDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=val.ID;
       
        }
      });
  }
  ionViewDidEnter(){
  //  this.storage.clear();
    this.reloadDepositData();
  
    
  }
  gotorequestpage(){
    this.navCtrl.navigateForward(['/workexpense-list', {
     // clientName: 'test',
     
    }]);
  }
  async reloadDepositData2(){
    //let d
	// await this.storage.forEach( (value, key, index) => {
  //     if(key == 'attendenceExpense'){
  //       //console.log(value.length);
     
  //       this.depositData = value;
        
  //     }
		 
     
	//   });

  } 
  async reloadDepositData(){
 
    //console.log(this.subject_name);
    
    const loading = await this.loadingController.create({
        message: ''
      });
      
         
      var headers = new HttpHeaders();
      headers.append('content-type', 'application/json; charset=utf-8');
    //this.submitted = true;
    
       await loading.present();
      //var data ={}
      var data ={
        
        "userid": this.userId,
        "search_project":'',
        "search_date":this.datePipe.transform(this.today, 'yyyy-MM-dd'),
        "search_category":'',
        "search_status":'',
        //this.password
      }
      this.http.post(host+'user-work-expense-get', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
       // console.log(res);
       loading.dismiss();
      if(res.status == true){
       
         this.depositData=res.response_data;
       
        
       
        }else{
          this.depositData=res.response_data;
         
       
        loading.dismiss();
        }
      }, (err) => {
        //console.log(err);
        loading.dismiss();
      });
    
    
    

}
  addAttendence(){
    this.navCtrl.navigateForward(['/attendence-expense-add', {
     // clientName: 'test',
     
    }]);
  }

  edit_attendence(i,data){
    this.navCtrl.navigateForward(['/attendence-expense-edit', {
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
              if(key == 'attendenceExpense'){
             
                value.forEach((val, key) => {
                 
                  if(key == id){
                  
                    this.depositData.splice(key, 1);
                    this.storage.remove(key).then((r) => {
                      this.storage.set('attendenceExpense', this.depositData).then((r) => {;
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
