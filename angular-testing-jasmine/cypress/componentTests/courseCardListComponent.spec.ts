import {mount} from "cypress/angular";
import {CoursesCardListComponent} from "../../src/app/courses/courses-card-list/courses-card-list.component";
import {CoursesModule} from "../../src/app/courses/courses.module";
import * as mockCoursesData from './../../src/unitTestUtilities/mockData/mockCoursesData.json'
import {CoursesService} from "../../src/app/courses/services/courses.service";

class MockCourseService {

}
describe('Course Card Component', () => {
  beforeEach(() => {
    const courses = Object.assign(mockCoursesData)
    mount(CoursesCardListComponent,
      {
        imports: [CoursesModule],
        providers: [{provide: CoursesService, useClass: MockCourseService}],
        componentProperties: {
          courses: courses.allCourses
        }
      })
  })

  it('should display list of courses', () => {
    cy.get('[data-cy=course-card]').should('have.length', 3)
  });

  it('should open edit course dialog on click edit', () => {
    cy.get('[data-cy=edit-course]').first().click()
    cy.get('.mat-mdc-dialog-container').should('be.visible');
    cy.get('course-dialog').should('exist')
  });
});
