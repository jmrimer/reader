import { Component, OnInit } from '@angular/core';
import { Passage } from '../passage/passage';
import { RSVPService } from './rsvp.service';
import { ReaderService } from '../reader/reader.service';
import { PassageService } from '../passage/passage.service';

@Component({
  selector: 'app-basic-rsvp',
  templateUrl: './rsvp-basic.component.html',
  styleUrls: ['./rsvp-basic.component.css'],
  providers: [PassageService, RSVPService, ReaderService]
})
export class RsvpBasicComponent implements OnInit {
  passage: Passage = new Passage();
  readerContent: string[] = [''];
  readerService: ReaderService;

  constructor(
    private passageService: PassageService,
    private _rsvpService: RSVPService,
    public _readerService: ReaderService) {
    this.readerService = _readerService;
  }

  ngOnInit() {
    this.passageService.getPassages()
      .subscribe(passages => {
        this.passage = passages[0];
        this.readerContent = this._rsvpService
          .transformToReadableContent(this.passage.content);
      });
  }
}
