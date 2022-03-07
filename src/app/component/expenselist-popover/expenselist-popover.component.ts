import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';
@Component({
  selector: 'app-expenselist-popover',
  templateUrl: './expenselist-popover.component.html',
  styleUrls: ['./expenselist-popover.component.scss'],
})
export class ExpenselistPopoverComponent implements OnInit {

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
