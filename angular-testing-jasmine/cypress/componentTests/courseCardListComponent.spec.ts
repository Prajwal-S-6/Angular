import {mount} from "cypress/angular";
import {CoursesCardListComponent} from "../../src/app/courses/courses-card-list/courses-card-list.component";
import {CoursesModule} from "../../src/app/courses/courses.module";
import * as mockCoursesData from './../../src/unitTestUtilities/mockData/mockCoursesData.json'
import {CoursesService} from "../../src/app/courses/services/courses.service";
import {Component, Input} from "@angular/core";
import {RouterLink, RouterModule, RouterOutlet, Routes} from "@angular/router";
import {Course} from "../../src/app/courses/model/course";


@Component({
  template: '<button data-cy="view-course-lessons" mat-raised-button color="primary" [routerLink]="[\'/courses\', course.id]">\n' +
    '        VIEW COURSE\n' +
    '      </button>' +
    '<router-outlet/>',
  imports: [RouterOutlet, RouterLink]
})
class CourseCardListStub {
  @Input()
  course: Course
}

@Component({ template: '<p>Course Works!</p>', standalone: false })
class CourseStubComponent {}

const routes: Routes = [
  {
    path: 'courses/:id',
    component: CourseStubComponent
  }
]
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

  it('should contain course description has header', () => {
    cy.get('[data-cy=course-card]').first().within(() => {
      cy.get('mat-card-title').should('have.text', 'Angular Testing Course')
    })
  });

  it('should contain image with correct source', () => {
    cy.get('[data-cy=course-card]').first().within(() => {
      cy.get('[data-cy=course-card-img]').should('have.attr', 'src', 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png')
    })
  });

  it('should contain course with two buttons with correct name', () => {
    cy.get('[data-cy=course-card]').first().within(() => {
      cy.get('button').should('have.length', 2);
      cy.get('button').first().contains('VIEW COURSE')
      cy.get('button').last().contains('EDIT')
    })
  });

  it('should open edit course dialog on click edit', () => {
    cy.get('[data-cy=edit-course]').first().click()
    cy.get('.mat-mdc-dialog-container').should('be.visible');
    cy.get('course-dialog').should('exist')
  });

  it('should navigate to course page on click of View course button', () => {
    const courses = Object.assign(mockCoursesData)
    mount(CourseCardListStub, {
      imports: [RouterModule.forRoot(routes)],
      declarations: [CourseStubComponent],
      componentProperties: {
        course: courses.allCourses[0]
      }
    })

    cy.get('[data-cy="view-course-lessons"]').click()
    cy.contains('Course Works!')
  });
});
