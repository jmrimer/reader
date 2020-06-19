import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from './rsvp.service';
import { ReaderService } from '../reader/reader.service';
import { PassageService } from '../passage/passage.service';
import { Subscription } from 'rxjs';
import { MetricsService } from '../metrics.service';
import { MetricInterface } from '../metric';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './rsvp-basic.component.html',
  styleUrls: ['./rsvp-basic.component.css'],
  providers: [MetricsService, PassageService, RSVPService]
})
export class RsvpBasicComponent implements OnInit {
  passage: Passage = new Passage();
  readerContent: string[] = [''];
  subscription: Subscription;

  constructor(
    public metricsService: MetricsService,
    private passageService: PassageService,
    public rsvpService: RSVPService
  ) {
  }

  ngOnInit() {
    this.passageService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.readerContent = this.rsvpService
          .transformToReadableContent(this.passage.content);
        this.rsvpService.contentLength = this.readerContent.length;
      });

    this.subscription = this.rsvpService.isComplete$
      .pipe(skip(1))
      .subscribe(this.postMetric);

  }

  private postMetric = () => {
    this.metricsService.postPassageCompletion(MetricInterface.RSVP_BASIC)
      .subscribe();
    this.subscription.unsubscribe();
  }
}
