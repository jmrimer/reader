import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { RsvpComponent } from '../rsvp-utils/rsvp.component';
import { MetricInterface } from '../metrics/metric';
import {
  centerOf,
  flipVerticallyAroundCenterOf,
  rotate180AroundCenterOf,
  translatePointsToNewCenter
} from './GraphTranslator';
import { Point } from './Point';

@Component({
  selector: 'app-rsvp-subway',
  templateUrl: './rsvp-subway.component.html',
  styleUrls: ['./rsvp-subway.component.css']
})
export class RsvpSubwayComponent extends RsvpComponent implements OnChanges {
  node_name: string;

  rawPoints = [
    new Point(32, 32),
    new Point(32, 132),
    new Point(132, 132),
    new Point(132, 32),
  ];

  translatedPoints = flipVerticallyAroundCenterOf(
    rotate180AroundCenterOf(
      this.rawPoints
    )
  );

  nodes = this.translatedPoints.map((point, index) => {
    return {
      data: {id: `section-0${index + 1}`, name: `0${index + 1}`},
      position: {x: point.x, y: point.y},
    }
  });

  graphData = {
    nodes: this.nodes,
    // nodes: [
    //
    //   {
    //     data: {id: 'section-01', name: '01'},
    //     position: {x: 100, y: 100},
    //   },
    //   {
    //     data: {id: 'section-02', name: '02'},
    //     position: {x: 100, y: 200},
    //   },
    //
    //   {
    //     data: {id: 'section-03', name: '03'},
    //     position: {x: 200, y: 200},
    //   },
    //   {
    //     data: {id: 'section-04', name: '04'},
    //     position: {x: 200, y: 100},
    //   },
    // ],
    edges: [
      {data: {id: 'edge-1', source: 'section-01', target: 'section-02', colorCode: 'blue', strength: 10},},
      {data: {id: 'edge-2', source: 'section-02', target: 'section-03', colorCode: 'blue', strength: 10},},
      {data: {id: 'edge-3', source: 'section-03', target: 'section-04', colorCode: 'blue', strength: 10},},
    ]
  };


  ngOnInit(): void {
    super.ngOnInit();
    this.rsvpType = MetricInterface.RSVP_SUBWAY
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("change");
  }

  nodeChange(event) {
    this.node_name = event;
    console.log('hello');
  }
}
