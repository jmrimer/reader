import { Component, DoCheck, Input, KeyValueDiffers, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { Section } from '../rsvp-utils/Section';

declare var cytoscape: any;

@Component({
  selector: 'app-cytoscape-component',
  templateUrl: './cytoscape.component.html',
  styleUrls: ['./cytoscape.component.css'],
})
export class CytoscapeComponent implements OnInit, OnChanges, DoCheck {

  public constructor(
    private renderer: Renderer2,
    private differs: KeyValueDiffers
  ) {
  }

  @Input() public currentSection: Section;
  @Input() public elements: any;
  @Input() public currentSectionCompletion;
  @Input() public sections: Section[] = [];
  style = [
    {
      selector: 'node',
      style: {
        height: 30,
        width: 30,
        'text-valign': 'center',
        'text-halign': 'center',
        'background-color': 'white',
        'border-width': 0.5,
        'border-color': 'black',
        shape: 'ellipse',
        content: 'data(name)',
      }
    },
    {
      selector: 'edge',
      style: {
        'line-color': '#ffffff',
        'line-fill': 'linear-gradient',
        'line-gradient-stop-colors': '#FFC600 #FFC600 #FBF97F',
        'line-gradient-stop-positions': `0% 0% 0%`,
        'opacity': '1',
        'line-cap': 'round',
        width: 32
      },
    }
  ];
  layout = {
    name: 'preset',
  };
  cytoscapeObject: any;
  differ: any;

  private static makeGradient(section) {
    return {
      'line-color': '#FBF97F',
      'line-fill': 'linear-gradient',
      'line-gradient-stop-colors': '#FFC600 #FFC600 #FBF97F',
      'line-gradient-stop-positions': `0% ${section.percentRead}% ${section.percentRead}%`,
    };
  }

  private static animateEdges(cy, section: Section) {
    const edge = cy.$(`#edge-${section.rank}`);
    edge.style(CytoscapeComponent.makeGradient(section));
  }

  public ngOnInit() {
    this.differ = {};
    this.sections.forEach((section, index) => {
      this.differ[index] = this.differs.find(section).create();
    });
    const cy_container = this.renderer.selectRootElement('#cy');
    this.cytoscapeObject = this.createCytoscape(cy_container);
  }

  public ngOnChanges(): any {
    this.sections.forEach((section, index) => {
      if (this.differ) {
        const differ = this.differ[index];
        const changes = differ.diff(section);
        if (changes) {
          CytoscapeComponent.animateEdges(this.cytoscapeObject, section);
        }
      }
    });
  }

  public ngDoCheck() {
    if (this.cytoscapeObject && this.currentSection) {
      this.colorNode(this.cytoscapeObject, this.currentSection);
    }
  }

  private createCytoscape(cy_container) {
    const cy = cytoscape({
      container: cy_container,
      layout: this.layout,
      style: this.style,
      elements: this.elements,
    });

    cy.panningEnabled(false);
    cy.autoungrabify(true);
    cy.autounselectify(true);
    return cy;
  }

  private colorNode(cy: any, section: Section) {
    if (section.rank <= this.currentSection.rank) {
      cy.$(`#section-${section.rank}`).style({'background-color': 'black'});
    }

    const isLastSection = (sect: Section) => {
      return this.sections.findIndex(s => s === sect) === this.sections.length - 1;
    };

    function isComplete(sect: Section) {
      return sect.percentRead === 1000;
    }

    if (isLastSection(section) && isComplete(section)) {
      cy.$(`#section-${section.rank + 1}`).style({'background-color': 'black'});
    }
  }

}
