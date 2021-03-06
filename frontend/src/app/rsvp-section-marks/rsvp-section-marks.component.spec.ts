import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RsvpSectionMarksComponent } from './rsvp-section-marks.component';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReaderComponent } from '../reader/reader.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RsvpSectionMarksComponent', () => {
  let component: RsvpSectionMarksComponent;
  let fixture: ComponentFixture<RsvpSectionMarksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        RsvpSectionMarksComponent,
        ReaderComponent,
      ],
      providers: [RSVPService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RsvpSectionMarksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
