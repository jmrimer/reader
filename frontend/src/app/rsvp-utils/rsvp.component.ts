import { Component, OnInit } from '@angular/core';
import { PassageService } from './passage.service';
import { RSVPService } from './rsvp.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { InterfaceName } from '../session/InterfaceName';
import { MetricsService } from '../metrics/metrics.service';
import { SessionService } from '../session/session.service';

@Component({
  selector: 'app-rsvp-component',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.css'],
})
export class RsvpComponent implements OnInit {
  rsvpType: InterfaceName;
  protected subscription: Subscription;
  private passageId: number;

  constructor(
    private metricsService: MetricsService,
    private passageService: PassageService,
    public rsvpService: RSVPService,
    public sessionService: SessionService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.passageId = parseInt(params.get('passageId'), 10);
    });

    this.passageService
      .getPassage(this.passageId)
      .subscribe(passage => {
        this.rsvpService.hydrate(
          passage,
          this.rsvpType
        );
        this.subscription = this.rsvpService.isComplete$
          .subscribe(() => {
            this.postMetric();
          });
      });

  }

  private postMetric = () => {
    this.metricsService.postPassageCompletion(
      this.rsvpType,
      this.sessionService.user
    )
      .subscribe();
    this.subscription.unsubscribe();
  }
}
