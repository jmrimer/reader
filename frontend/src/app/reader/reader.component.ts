import { Component, Input, NgZone, OnInit } from '@angular/core';
import { IntervalService } from './interval.service';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';
import { RSVPService } from '../rsvp-utils/rsvp.service';
import { Router } from '@angular/router';
import { OrpService } from './orp.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css'],
})
export class ReaderComponent implements OnInit {
  @Input()
  rsvpService: RSVPService;
  didStart: boolean = false;
  subscription: Subscription;
  wpm = 6000;
  textJoiner;
  textMeasurer;
  textElements;

  constructor(
    private ngZone: NgZone,
    private _intervalService: IntervalService,
    private orpService: OrpService,
  ) {
  }

  ngOnInit() {
    this.assignElementsById();
    this.setupIntervalService();
    this.setupCompletionActions();
  }

  private assignElementsById() {
    this.textJoiner = document.getElementById('text-joiner');
    this.textMeasurer = document.getElementById('text-measurer');
    this.textElements = {
      left: document.getElementById('text-left'),
      center: document.getElementById('text-center'),
      right: document.getElementById('text-right')
    };
  }

  private setupIntervalService() {
    this._intervalService.setInterval(
      this.wpm,
      () => {
        this.ngZone.run(() => {
          this.rsvpService.moveAhead();
          this.orpService.separateAndAlign(
            this.rsvpService.currentWord,
            this.textMeasurer,
            this.textElements,
            this.textJoiner
          );
          this.pauseReaderByPunctuation();
        })
      }
    );
  }

  private setupCompletionActions() {
    this.subscription = this.rsvpService.isComplete$
      .pipe(skip(1))
      .subscribe(this.finishReading);
  }

  private finishReading = () => {
    this._intervalService.clearInterval();
  }

  playReader() {
    this.didStart = true;
    this.ngZone.runOutsideAngular(() => {
      this._intervalService.runInterval();
    });
  }

  pauseReaderByPunctuation() {
    let pauseIncrement = this.rsvpService.calculatePause();
    if (pauseIncrement > 0) {
      this._intervalService.clearInterval();
      setTimeout(() => {
        this.playReader();
      }, pauseIncrement);
    }
  }
}
