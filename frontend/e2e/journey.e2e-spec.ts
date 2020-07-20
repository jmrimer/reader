import { browser, by, element } from 'protractor';
import * as _ from 'lodash';
import { useAndTestInterface } from './e2e-helpers';

describe('Reader App', () => {
  it('should take a user on a multi-interface journey', () => {
    browser.waitForAngularEnabled(false);
    let expectUrls = new Set([
      'http://localhost:4200/baseline/1',
      'http://localhost:4200/rsvp-basic/1',
      'http://localhost:4200/rsvp-progress-bar/1',
      'http://localhost:4200/rsvp-section-mark/1',
      'http://localhost:4200/rsvp-subway/1',
    ]);
    let actualUrls = new Set();
    visitAllPages(expectUrls, actualUrls)
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

  let visitAllPages = (expectedUrls, actualUrls) => {
    if (actualUrls.size > 30) {
      expect(false).toBeTruthy('Visiting all page took more than 50 attempts.');
    }

    if (_.isEqual(expectedUrls, actualUrls)) {
      return;
    }
    browser.get('/')
      .then(() => element(by.className('button--start')).click())
      .then(() => browser.getCurrentUrl())
      .then((u) => {
        actualUrls.add(u);
        useAndTestInterface(u, expectedUrls).then(() => {
          visitAllPages(expectedUrls, actualUrls);
        });
      });
    // browser.get('/')
    //   .then(() => element(by.className('button--start')).click())
    //   .then(() => browser.getCurrentUrl())
    //   .then((u) => {
    //     actualUrls.add(u);
    //     useAndTestInterface(u, expectedUrls).then(() => visitAllPages(expectedUrls, actualUrls));
    //   });
  }
});