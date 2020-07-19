import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizComponent } from './quiz.component';
import { quizStub } from './Quiz';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizService } from './quiz.service';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { SessionServiceMock } from '../session/session-stub.service';
import { SessionService } from '../session/session.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;
  const quizServiceSpy = jasmine.createSpyObj('QuizService', ['getQuizzes', 'postAnswers']);
  quizServiceSpy.getQuizzes.and.returnValue(of([quizStub]));
  let sessionService: SessionServiceMock;

  beforeEach(async(() => {
    sessionService = new SessionServiceMock();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: QuizService, useValue: quizServiceSpy},
        {provide: SessionService, useValue: sessionService},
        {
          provide: ActivatedRoute, useValue: {
            paramMap: of(convertToParamMap({
              'interfaceName': 'rsvp-basic'
            }))
          }
        }
      ],
      declarations: [QuizComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch a quiz', () => {
    expect(component.quiz).toEqual(quizStub);
  });

  it('should display questions and choices', () => {
    expect(fixture.debugElement.queryAll(By.css('.sv_q_title')).length).toBe(2);
    expect(fixture.debugElement.queryAll(By.css('.sv_q_radiogroup_control_item')).length).toBe(8);
  });

  function completeQuiz() {
    let choices = fixture.debugElement.queryAll(By.css('input[type=radio]'));
    choices.map((choice) => {
      if (
        choice.nativeElement.value === 'answer1.1'
        || choice.nativeElement.value === 'answer2.2') {
        choice.nativeElement.click();
      }
    })
    let completeButton = fixture.debugElement.query(By.css("input[type=button][value='Complete']"));
    expect(completeButton).toBeTruthy();
    completeButton.nativeElement.click();
  }

  it('should submit a set of choices along with the quiz type', () => {
    completeQuiz();
    expect(quizServiceSpy.postAnswers).toHaveBeenCalledWith(jasmine.objectContaining(
      {
        passage: 'id1',
        answers: [
          {
            question: 'question1',
            answer: 'answer1.1'
          },
          {
            question: 'question2',
            answer: 'answer2.2'
          },
        ],
        interfaceName: 'rsvp-basic'
      })
    );
  });

  it('should set its interface type based on its routing', async () => {
    await fixture.detectChanges();
    expect(component.interfaceName).toBe('rsvp-basic');
  });

  it('should trigger a completion to the session on submission', () => {
    spyOn(sessionService, 'completeCurrentPair');
    fixture.detectChanges();
    completeQuiz();
    expect(sessionService.completeCurrentPair).toHaveBeenCalled();
  });
});
