import {mount} from "cypress/angular";
import {CoursesCardListComponent} from "../../src/app/courses/courses-card-list/courses-card-list.component";
import {CoursesModule} from "../../src/app/courses/courses.module";
import * as mockCoursesData from './../../src/unitTestUtilities/mockData/mockCoursesData.json'

describe('Course Card Component', () => {
  beforeEach(() => {
    const courses = Object.assign(mockCoursesData)
    mount(CoursesCardListComponent,
      {
        imports: [CoursesModule],
        componentProperties: {
          courses: courses.allCourses
        }
      })
  })

  it('should display courses list', () => {
    cy.get('.course-card').should('have.length', 3)
  });
});
