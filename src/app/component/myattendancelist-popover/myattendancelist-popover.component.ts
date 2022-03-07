import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-myattendancelist-popover',
  templateUrl: './myattendancelist-popover.component.html',
  styleUrls: ['./myattendancelist-popover.component.scss'],
})
export class MyattendancelistPopoverComponent implements OnInit {

 constructor(
    private popoverController: PopoverController,
    public navCtrl: NavController,
    ) { }


  ngOnInit() {}
popDismiss(page){
		this.popoverController.dismiss();
		this.navCtrl.navigateForward('/'+page);
	}
}
