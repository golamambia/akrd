import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyattendancelistPopoverComponent } from './myattendancelist-popover.component';

describe('MyattendancelistPopoverComponent', () => {
  let component: MyattendancelistPopoverComponent;
  let fixture: ComponentFixture<MyattendancelistPopoverComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MyattendancelistPopoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyattendancelistPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
