import {fakeAsync, flush, flushMicrotasks, tick} from "@angular/core/testing";
import {of } from "rxjs";
import {delay} from "rxjs/operators";

describe('Async example test', () => {
  it('should test async behavior which uses setTimeOut', (done) => {
    let someVar = false;
    setTimeout(() => {
      // this is some async operation happening
      someVar = true;
      expect(someVar).toBeTruthy();
      done();
    }, 500)
  });

  it('should test async behavior which uses setTimeOut - fakeAsync zone', fakeAsync(() => {
    let someVar = false;
    setTimeout(() => {
      // this is some async operation happening
      someVar = true;
    }, 1000);
    //tick(1000)
    flush();
    expect(someVar).toBeTruthy();
  }));

  it('Async test example without fakeAsync- promise, setTimeout, Observable', () => {
    let value = false;

    console.log('Evaluating test');

    setTimeout(() => {
      console.log('Evaluating setTimeOut');
    })
    Promise.resolve().then(() => {
      console.log('Evaluating promise');

    })
    of(true).subscribe(() => {
      console.log('Evaluating observable');
      value = true;
    })
    console.log('Evaluating result');
    expect(value).toBeTruthy()
  });

  it('Async test example with fakeAsync 1- promise, setTimeout, Observable', fakeAsync(() => {
    let value = false;

    console.log('Evaluating test');

    setTimeout(() => {
      console.log('Evaluating setTimeOut');
    })
    Promise.resolve().then(() => {
      console.log('Evaluating promise');
      value = true;
    })
    of(true).subscribe(() => {
      console.log('Evaluating observable');
    })
    flushMicrotasks();
    console.log('Evaluating result');
    expect(value).toBeTruthy()
  }));

  it('Async test example with fakeAsync 2- promise, setTimeout, Observable', fakeAsync(() => {
    let value = false;

    console.log('Evaluating test');

    setTimeout(() => {
      console.log('Evaluating setTimeOut');
      value = true;
    })
    Promise.resolve().then(() => {
      console.log('Evaluating promise');
    })
    of(true).subscribe(() => {
      console.log('Evaluating observable');
    })
    flush();
    console.log('Evaluating result');
    expect(value).toBeTruthy()
  }));

  it('Async test example with fakeAsync - Observable', fakeAsync(() => {
    let value = false;


    of(true)
      .pipe(delay(5000))
      .subscribe((res) => {
      console.log('Evaluating observable');
      value = res;
    })

    tick(5000);
    console.log('Evaluating result');
    expect(value).toBeTruthy()
  }));


})
