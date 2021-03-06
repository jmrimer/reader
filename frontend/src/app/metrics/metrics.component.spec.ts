import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricsComponent } from './metrics.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InterfaceName } from '../session/InterfaceName';
import { MetricsServiceStub } from './metrics-stub.service';
import { MetricsService } from './metrics.service';

describe('MetricsComponent', () => {
  let component: MetricsComponent;
  let fixture: ComponentFixture<MetricsComponent>;
  let rows;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MetricsComponent],
      providers: [
        {provide: MetricsService, useValue: new MetricsServiceStub()}
      ]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(MetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rows = await fixture.nativeElement.querySelectorAll('tr');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a table of interfaces and the times completed', async () => {
    expect(rows.length).toBe(5);
    expect(rows[0].cells[0].textContent).toBe(InterfaceName.BASELINE);
    expect(rows[0].cells[1].textContent).toBe('1');
    expect(rows[1].cells[0].textContent).toBe(InterfaceName.RSVP_BASIC);
    expect(rows[1].cells[1].textContent).toBe('2');
    expect(rows[2].cells[0].textContent).toBe(InterfaceName.RSVP_PROGRESS_BAR);
    expect(rows[2].cells[1].textContent).toBe('0');
    expect(rows[3].cells[0].textContent).toBe(InterfaceName.RSVP_SECTION_MARK);
    expect(rows[3].cells[1].textContent).toBe('0');
    expect(rows[4].cells[0].textContent).toBe(InterfaceName.RSVP_SUBWAY);
    expect(rows[4].cells[1].textContent).toBe('3');
  });

  it('should display the quiz count for each interface type', async () => {
    expect(rows.length).toBe(5);
    expect(rows[0].cells[0].textContent).toBe(InterfaceName.BASELINE);
    expect(rows[0].cells[2].textContent).toBe('11');
    expect(rows[1].cells[0].textContent).toBe(InterfaceName.RSVP_BASIC);
    expect(rows[1].cells[2].textContent).toBe('22');
    expect(rows[2].cells[0].textContent).toBe(InterfaceName.RSVP_PROGRESS_BAR);
    expect(rows[2].cells[2].textContent).toBe('33');
    expect(rows[3].cells[0].textContent).toBe(InterfaceName.RSVP_SECTION_MARK);
    expect(rows[3].cells[2].textContent).toBe('0');
    expect(rows[4].cells[0].textContent).toBe(InterfaceName.RSVP_SUBWAY);
    expect(rows[4].cells[2].textContent).toBe('0');
  });
});
