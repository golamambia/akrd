import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-createleavegen-popover',
  templateUrl: './createleavegen-popover.component.html',
  styleUrls: ['./createleavegen-popover.component.scss'],
})
export class CreateleavegenPopoverComponent implements OnInit {

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
