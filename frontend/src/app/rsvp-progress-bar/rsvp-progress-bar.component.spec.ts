import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpProgressBarComponent } from './rsvp-progress-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReaderComponent } from '../reader/reader.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { By } from '@angular/platform-browser';
import { RSVPService } from '../rsvp-basic/rsvp.service';
import { PassageService } from '../passage/passage.service';
import { PassageServiceStub } from '../passage/passage-stub.service';
import { passageStub } from '../rsvp-basic/PassageStub';

describe('RSVPProgressBarComponent', () => {
  let component: RsvpProgressBarComponent;
  let fixture: ComponentFixture<RsvpProgressBarComponent>;
  let rsvpService;

  beforeEach(async(() => {
    rsvpService = new RSVPService();
    rsvpService.hydrate(passageStub);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatProgressBarModule
      ],
      declarations: [
        RsvpProgressBarComponent,
        ReaderComponent,
      ],
      providers: [
        {provide: PassageService, useValue: new PassageServiceStub()},
        {provide: RSVPService, useValue: rsvpService}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', async () => {
    await expect(component).toBeTruthy();
  });

  it('should have a progress bar', async () => {
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let completionMeter = fixture.debugElement.query(By.css('#completion-meter'));
      expect(completionMeter).toBeTruthy();
      expect(completionMeter.attributes['aria-valuenow']).toBe('12.5');
    })
  });
});
