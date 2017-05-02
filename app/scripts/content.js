// console.log('Hello from content script.');

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/filter';

document.body.backgroundColor = 'red';

const keyDowns = Observable.fromEvent(document, 'keydown');
const keyUps = Observable.fromEvent(document, 'keyup');
const keyActions = Observable
  .merge(keyDowns, keyUps)
  .filter((function() {
      const keysPressed = {};
      return function(e) {
          const k = e.key || e.which;
          if (e.type == 'keyup') {
              delete keysPressed[k];
              return true;
          } else if (e.type == 'keydown') {
              if (keysPressed[k]) {
                  return false;
              } else {
                  keysPressed[k] = true;
                  return true;
              }
          }
      };
  })());

keyActions.subscribe(function(e) {
  console.log(e.type, e.key || e.which, e.keyIdentifier);
});
