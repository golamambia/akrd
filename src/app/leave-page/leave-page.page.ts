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
import { SettingComponent } from '../component/setting/setting.component';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-leave-page',
  templateUrl: './leave-page.page.html',
  styleUrls: ['./leave-page.page.scss'],
})
export class LeavePagePage implements OnInit {
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
 search_date:any='';
 search_category:any='';
 search_status:any='';
 total_leave:any='';
 search_leavecat:any='';
 search_leavetype:any='';
 constructor(private http: HttpClient, public navCtrl: NavController,
    public storage: Storage,public loadingController: LoadingController,
    public alertController: AlertController,
       private menu: MenuController,private fb:FormBuilder,
       private datePipe: DatePipe,
       public actionSheetController: ActionSheetController,
       private popoverController: PopoverController
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
 
 onlyNumberKey(event:any) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
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
  ionViewDidEnter(){
  //  this.storage.clear();
  this.reloadDepositData();
      
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
          "search_date":this.search_date,
          "search_status":this.search_status,
          "leave_type":this.search_leavecat,
          "leaveday_type":this.search_leavetype,
          //this.password
        }
        this.http.post(host+'user-leave-application-get', JSON.stringify(data),{ headers: headers })
        .subscribe((res:any) => {
          //console.log(res);
         loading.dismiss();
        if(res.status == true){
         
           this.depositData=res.response_data;
            this.total_leave=res.total_leave;
          
         
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
  async doRefresh(event) {

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
      "search_date":this.search_date,
      "search_status":this.search_status,
      "leave_type":this.search_leavecat,
      "leaveday_type":this.search_leavetype,
      //this.password
    }
    this.http.post(host+'user-leave-application-get', JSON.stringify(data),{ headers: headers })
    .subscribe((res:any) => {
      //console.log(res);
      event.target.complete();
     //loading.dismiss();
    if(res.status == true){
     
       this.depositData=res.response_data;
        this.total_leave=res.total_leave;
      
     
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
  selectDate(dt) {

   // this.search_date = this.datePipe.transform(dt, 'Y-MM-dd');
   // console.log(jj);
   // this.reloadDepositData();
  }
  
  selectStatus(id) {
  
    this.search_status = id;
    //console.log(id);
    this.reloadDepositData();
  }
  selectCategory(id) {
  
    this.search_leavecat = id;
    //console.log(id);
    this.reloadDepositData();
  }
  selectLeavetype(id) {
  
    this.search_leavetype = id;
    //console.log(id);
    this.reloadDepositData();
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

  async detailsView(desc) {
    var button_array = [
      { text: 'Reason : '+desc},
     
  ];

 
    const actionSheet = await this.actionSheetController.create({
      header: "Short Details",
      cssClass: 'action-sheet-button22',
      buttons: button_array,
    });
    await actionSheet.present();
  }
  async settingsPopover(ev: any) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: SettingComponent,
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
 
          var dt = data.year.value+'-'+data.month.value+'-'+data.day.text;
          //convertDataToISO(this.datetimeValue);
         this.search_date= dt;
         this.reloadDepositData();
         // console.log(this.search_date);
        }
     }
  ]
    
  }
}
