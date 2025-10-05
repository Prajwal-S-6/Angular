# Angular Practice and Testing Repository

This repository contains my practice code for **Angular development**, along with a focus on **testing strategies** using both **unit tests** and **end-to-end (E2E) tests with Cypress**.
The purpose of this repo is to explore Angular features hands-on while building strong habits around testing and code quality.

---

## ✅ What’s Included

* Angular components, services, and routing examples
* Unit tests written with **Jasmine + Karma**
* Integration of **HttpClientTestingModule** for mocking HTTP requests
* Resolver and DataSource testing (Subjects, Observables, RxJS operators)
* Async testing (`fakeAsync`, `tick`, `waitForAsync`)
* Event handling tests (paginator, sort, `fromEvent`)
* Cypress setup for **end-to-end testing**:

  * Component tests
  * Page interaction tests
  * API interception and mocking

---

## 🛠️ Running the Project

Install dependencies:

```bash
npm install
```

Run the Angular app locally:

```bash
ng serve
```

---

## 🧪 Running Unit Tests

Run unit tests:

```bash
npm run test
```

Run unit tests with coverage:

```bash
npm run test -- --code-coverage
```

Open coverage report:

```bash
coverage/<project-name>/index.html
```

---

## 🌐 Running Cypress Tests

Open Cypress in interactive mode:

```bash
npx cypress open
```

Run Cypress tests headless (useful for CI):

```bash
npx cypress run
```

## 🎯 Purpose

* Practice **Angular concepts** (components, services, RxJS, routing)
* Learn and apply **Angular unit testing best practices**
* Explore **Cypress E2E testing** for UI validation and API interaction
* Build confidence in writing maintainable, testable Angular code

---

## 🚀 Next Steps

* Expand Cypress tests for more complex scenarios
* Add CI pipeline integration for automated tests
* Try out **Jest** as an alternative test runner
* Add performance testing for critical Angular components

---
