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
import { ActionSheetController } from '@ionic/angular';
import { MyattendancelistPopoverComponent } from '../component/myattendancelist-popover/myattendancelist-popover.component';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-user-attendense-list',
  templateUrl: './user-attendense-list.page.html',
  styleUrls: ['./user-attendense-list.page.scss'],
})
export class UserAttendenseListPage implements OnInit {
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
 total_amount:any=0;
 total_work_hrs:any=0;
 total_work_min:any=0;
 project_list:any='';
 search_project:any='';
 search_date:any='';
 
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private datePipe: DatePipe,
       public actionSheetController: ActionSheetController,
       public popoverCtrl: PopoverController,
       private popoverController: PopoverController
       //public events: Events
    ) { 
   this.productForm = this.fb.group({
     
      quantities: this.fb.array([]) ,
    });
   
   }
   customPickerOptionFrom = {
    buttons: [
      {
        text: 'clear',
         
        handler: () => {
          this.search_date='';
          this.reloadDepositData();
           //this.ionCancel.emit();
        }
     },
     {
      text: 'cancel',
      role: 'cancel',
      handler: () => {
        //console.log(123);
        
      }
   },
     {
        text: 'Done',
        handler: (data: any) => {
         // console.log(data);
 
          var dt = data.year.value+'-'+data.month.value+'-'+data.day.value;
          //convertDataToISO(this.datetimeValue);
         this.search_date= dt;
         //this.datePipe.transform(dt, 'Y-MM-dd');
         this.reloadDepositData();
         // console.log(this.search_date);
        }
     }
  ]
    
  }
  ngOnInit() {
    this.storage.create();
    // this.storage.clear();
  }
 
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
}

  ionViewWillEnter(){
    
   this.storage.get("genuserDetails").then(val=>{
      if(val){
        this.userDetails = val;
        this.userId=val.ID;
        this.getprojectList();
         this.reloadDepositData();
        }
        });
   
  }
  ionViewDidEnter(){
  //  this.storage.clear();
    
    
  }
  async doRefresh(event) {
//event.target.complete();
     
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
        "search_project":this.search_project,
        "search_date":this.search_date,
        "checkout":''
        //this.password
      }
      this.http.post(host+'user-attendence-get', JSON.stringify(data),{ headers: headers })
      .subscribe((res:any) => {
       // console.log(res);
       event.target.complete();
       loading.dismiss();
      if(res.status == true){
       
         this.depositData=res.response_data;
          this.total_amount=res.total_amount;
        
       
        }else{
          this.depositData=res.response_data;
          this.total_amount=res.total_amount;
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
        
           
        var headers = new HttpHeaders();
        headers.append('content-type', 'application/json; charset=utf-8');
      //this.submitted = true;
      
         await loading.present();
        //var data ={}
        var data ={
          
          "userid": this.userId,
          "search_project":this.search_project,
          "search_date":this.search_date,
          "checkout":''
          //this.password
        }
        this.http.post(host+'user-attendence-get', JSON.stringify(data),{ headers: headers })
        .subscribe((res:any) => {
         // console.log(res);
         loading.dismiss();
        if(res.status == true){
         
           this.depositData=res.response_data;
            this.total_amount=res.total_amount;
          
         
          }else{
            this.depositData=res.response_data;
            this.total_amount=res.total_amount;
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
       
         this.project_list=res.response_data;
                 
       
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
selectProject(id) {

  this.search_project = id;
  //console.log(id);
  this.reloadDepositData();
} 
selectDate(dt) {

  //this.search_date = this.datePipe.transform(dt, 'Y-MM-dd');
 // console.log(dt);
 // this.reloadDepositData();
}
  gotorequestpage(){
    this.navCtrl.navigateForward(['/return-request', {
     // clientName: 'test',
     
    }]);
  }

  edit_attendence(i,data){
    this.navCtrl.navigateForward(['/attendence-single-edit', {
      index: i, 
    }]);
  }
  async detailsView(desc,locin,locout,project) {
    var button_array = [
      { text: 'Project : '+project},
      { text: 'Description : '+desc},
      { text: 'Location in : '+locin},
      { text: 'Location out : '+locout},
  ];

//  if(rejt){

// button_array.push({ text: 'Reject reason : '+rejt });
// }
    const actionSheet = await this.actionSheetController.create({
      header: "Short Details",
      cssClass: 'my-custom-class',
      buttons: button_array,
    });
    await actionSheet.present();
  }
  async settingsPopover(ev: any) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: MyattendancelistPopoverComponent,
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
