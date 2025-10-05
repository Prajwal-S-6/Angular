
# Angular Testing Course – Unit Tests

This project contains **unit tests** written for the Angular Testing Course codebase.
The goal of these tests is to validate core functionality, demonstrate best practices in Angular testing, and ensure reliable, maintainable code.

---

## ✅ What’s Covered

* Component testing with **Jasmine + Karma**
* Service testing with **HttpClientTestingModule**
* Resolver testing with **Angular’s inject() API and TestBed.runInInjectionContext**
* DataSource testing (including `loadLessons` and `disconnect` methods)
* Observables, RxJS operators, and async behavior (`fakeAsync`, `tick`)
* Event handling (`fromEvent`, paginator/sort events)

---

## 🛠️ Running the Tests

Make sure you have all dependencies installed:

```bash
npm install
```

Run unit tests:

```bash
npm run test
```

Run unit tests with coverage:

```bash
npm run test:coverage
```

After running with coverage, open the generated report:

```bash
coverage/<project-name>/index.html
```

---

## 📂 Coverage

The `coverage/` folder contains detailed HTML reports showing how much of the codebase is tested.
These tests include validation of:

* Component lifecycle (`ngOnInit`)
* Resolver functions
* RxJS streams (debounce, distinctUntilChanged, finalize)
* Subject completion and cleanup

---

## 🎯 Purpose

These unit tests were written as part of the **Angular Testing Course** to:

1. Learn and practice Angular testing strategies.
2. Ensure correctness of course example code.
3. Provide a reference for testing Angular applications effectively.

---

## 🚀 Next Steps

* Add **integration tests** for end-to-end workflows.
* Increase coverage for edge cases and error handling.
* Explore migrating to Jest for faster test execution.

---



