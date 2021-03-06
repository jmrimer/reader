import { visitAllPages } from './e2e-helpers';

describe('Reader App', () => {
  it('should take a user on a multi-interface journey', async () => {
    const allInterfaces = [
      'baseline',
      'rsvp-basic',
      'rsvp-progress-bar',
      'rsvp-section-mark',
      'rsvp-subway'
    ];

    const expectedUrls = new Set([
      'http://localhost:4200/baseline/1',
      'http://localhost:4200/rsvp-basic/1',
      'http://localhost:4200/rsvp-progress-bar/1',
      'http://localhost:4200/rsvp-section-mark/1',
      'http://localhost:4200/rsvp-subway/1',
    ]);

    let actualUrls = new Set<string>();

    console.log('1');
    visitAllPages(allInterfaces, actualUrls, expectedUrls).then((urls) => {
      console.log('2');
      actualUrls = urls;
      expect(actualUrls).toEqual(expectedUrls);
    });
    //    nav to homepage
    //    start
    //    log to which interface it takes us
    //    highjack interface and use test passage on that interface for speed TODO consider varying the wpm (when we have multiple Passages we'll need to test no repeat passages, too)
    //    grab current metrics (started, finished, quiz)
    //    read through
    //    take quiz
    //    grab new metrics (started, finished, quiz)
    //    return to home page
    //  }
    //  expect logged interfaces to contain all the interfaces
    //  expect completion message because user cannot take any more (taints results)
  });


});
