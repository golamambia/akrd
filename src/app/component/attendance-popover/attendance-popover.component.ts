import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-attendance-popover',
  templateUrl: './attendance-popover.component.html',
  styleUrls: ['./attendance-popover.component.scss'],
})
export class AttendancePopoverComponent implements OnInit {

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
