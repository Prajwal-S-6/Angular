import {mount} from "cypress/angular";
import * as mockCoursesData from '../../../../src/unitTestUtilities/mockData/mockCoursesData.json'
import {of} from "rxjs";
import {HomeComponent} from "./home.component";
import {CoursesModule} from "../courses.module";
import {CoursesService} from "../services/courses.service";

class MockCoursesService {
  mockCourses = Object.assign(mockCoursesData);
  findAllCourses() {
    return of(this.mockCourses.allCourses);
  }
}
describe('Home Component', () => {
  let mockCourses = Object.assign(mockCoursesData);
  beforeEach(() => {
    mount(HomeComponent,
      {
        providers: [{provide: CoursesService, useClass: MockCoursesService}],
        imports: [CoursesModule]
      })
  })

  it('should display two tabs with correct headers', () => {
    cy.get('[role=tab]').should('have.length', 2)
    cy.get('#mat-tab-group-a0-label-0').contains('Beginner')
    cy.get('#mat-tab-group-a0-label-1').contains('Advanced')
  });

  it('should display beginner tab by default', () => {
    cy.get('courses-card-list').get('mat-card').should('have.length', 2);
    cy.get('mat-card').contains('Angular Testing Course')
  });

  it('should switch to Advanced courses tab on click', () => {
    cy.get('#mat-tab-group-a2-label-1').click()
    cy.get('courses-card-list').get('mat-card').should('have.length', 1);
    cy.get('mat-card').contains('Angular Security')
  });

  it('should switch back to Beginner tab on clicking on beginner tab', () => {
    cy.get('#mat-tab-group-a3-label-1').click()
    cy.get('#mat-tab-group-a3-label-0').click()
    cy.get('courses-card-list').get('mat-card').should('have.length', 2);
    cy.get('mat-card').contains('Angular Testing Course')
  });

});
