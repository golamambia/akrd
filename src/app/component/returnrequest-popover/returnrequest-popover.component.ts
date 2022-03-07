import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-returnrequest-popover',
  templateUrl: './returnrequest-popover.component.html',
  styleUrls: ['./returnrequest-popover.component.scss'],
})
export class ReturnrequestPopoverComponent implements OnInit {

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
