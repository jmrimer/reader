import { Component, NgZone } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { IntervalService } from '../reader/interval.service';
import { MetricsService } from '../metrics/metrics.service';
import { PassageService } from '../rsvp-utils/passage.service';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { ActivatedRoute } from '@angular/router';
import { InterfaceName } from '../session/InterfaceName';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-baseline',
  templateUrl: './baseline.component.html',
  styleUrls: ['./baseline.component.css'],
})
export class BaselineComponent extends RsvpComponent {
  didStart = false;
  wpm = 250;

  constructor(
    metricsService: MetricsService,
    passageService: PassageService,
    rsvpService: RSVPService,
    route: ActivatedRoute,
    sessionService: SessionService,
    private intervalService: IntervalService,
    private ngZone: NgZone,
  ) {
    super(
      metricsService,
      passageService,
      rsvpService,
      sessionService,
      route
    );
  }

  ngOnInit() {
    super.ngOnInit();
    this.rsvpType = InterfaceName.BASELINE;
    this.setupIntervalService();
  }

  playReader() {
    this.didStart = true;
    this.ngZone.runOutsideAngular(() => {
      this.intervalService.runInterval();
    });
  }

  displayPassage = () => {
    return this.didStart && !this.rsvpService.isCompleteSubject;
  }

  private setupIntervalService() {
    this.intervalService.setInterval(
      this.wpm,
      this.playFunctions
    );
  }

  private playFunctions = () => {
    this.ngZone.run(() => {
      this.rsvpService.moveAhead();
      this.pauseReaderByPunctuation();
      this.checkComplete();
    });
  }

  private checkComplete() {
    if (this.rsvpService.isCompleteSubject) {
      this.intervalService.clearInterval();
      this.intervalService.setInterval(0, () => {
      });
    }
  }

  pauseReaderByPunctuation() {
    this.intervalService.pause(
      this.rsvpService.calculatePauseAmount()
    );
  }
}
