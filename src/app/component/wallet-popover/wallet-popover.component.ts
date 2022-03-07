import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-wallet-popover',
  templateUrl: './wallet-popover.component.html',
  styleUrls: ['./wallet-popover.component.scss'],
})
export class WalletPopoverComponent implements OnInit {

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
