import {AboutComponent} from "../../src/app/about/about.component";
import {mount} from "cypress/angular";

describe('About Component', () => {
  beforeEach(() => {
    mount(AboutComponent)
  })
  it('should display About page with welcome header and paragraph', () => {
    cy.get("[data-cy=welcome-header]").contains('Welcome!');
    cy.get("[data-cy=welcome-description]").contains("Welcome to the Angular Testing Course")
  });

  it('should contain angular testing image', () => {
    cy.get("[data-cy=course-logo]")
      .should("be.visible")
      .and("have.attr", "src", "https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png")
  });
});
