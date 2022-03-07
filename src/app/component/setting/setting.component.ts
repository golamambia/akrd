import { Component, OnInit } from '@angular/core';
import { PopoverController,NavController } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit {
  site;

  constructor(
    private popoverController: PopoverController,
    public navCtrl: NavController,
    ) { }

  ngOnInit() {
    // this.siteInfo = this.navParams.get('site');
    //console.log(this.site);
  }

  wifiSetting() {
    // code for setting wifi option in apps
    this.popoverController.dismiss();
  }

  logout() {
    // code for logout
    this.popoverController.dismiss();
  }

  eventFromPopover() {
    this.popoverController.dismiss('edupala.com');
  }
  popDismiss(page){
		this.popoverController.dismiss();
		this.navCtrl.navigateForward('/'+page);
	}
}