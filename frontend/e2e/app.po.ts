import { browser } from 'protractor';

export class FrontendPage {
  navigateTo() {
    return browser.get('/');
  }
}
