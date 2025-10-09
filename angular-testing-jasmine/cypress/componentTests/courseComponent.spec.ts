import {mount} from "cypress/angular";
import {CourseComponent} from "../../src/app/courses/course/course.component";
import {CoursesModule} from "../../src/app/courses/courses.module";
import {CoursesService} from "../../src/app/courses/services/courses.service";
import {COURSES} from "../../server/db-data";
import {ActivatedRoute} from "@angular/router";
import {Observable, of} from "rxjs";
import {Lesson} from "../../src/app/courses/model/lesson";
import * as mockLessonData from '../../src/unitTestUtilities/mockData/mockLessonsData.json'

class CourseServiceStub {
  mockLessons = Object.assign(mockLessonData);
  findLessons(
    courseId:number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3):  Observable<Lesson[]> {
    if(filter !== '') {
      return of([this.mockLessons.allLessons[0]])
    }
    return of(this.mockLessons.allLessons)
  }
}

const route = {
  snapshot: {
    data: {
      course: COURSES[12]
    }
  }
} as unknown as ActivatedRoute;
describe('Course Component', () => {
  const mockLessons = Object.assign(mockLessonData);
  beforeEach(() => {
    mount(CourseComponent, {
      imports: [CoursesModule],
      providers: [{provide: CoursesService, useClass: CourseServiceStub},
        {provide: ActivatedRoute, useValue: route}],
    })
  })

  it('should contain course description as header and course image', () => {
    cy.get('[data-cy="course-title"]').contains('Angular Testing Course')
    cy.get('[data-cy="course-img"]').should('have.attr', 'src', 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png')
  });

  it('should contain lessons search box', () => {
    cy.get('[data-cy="search-lesson"]').should('be.visible')
  });

  it('should contain table with lessons with 3 header columns with proper name', () => {
    cy.get('[data-cy="lessons-table"]').should('have.attr', 'matSort')
    cy.get('[data-cy="lessons-table"]').should('have.attr', 'matSortActive', 'seqNo')
    cy.get('[data-cy="lessons-table"]').should('have.attr', 'matSortDirection', 'asc')
    cy.get('[data-cy="lessons-table"]').should('have.attr', 'matSortDisableClear')
    cy.get('[data-cy="lessons-table"]').within(() => {
      cy.get('mat-header-cell').should('have.length', 3)
      cy.get('mat-header-cell').eq(0).should('have.text', '#')
      cy.get('mat-header-cell').eq(0).should('have.class', 'mat-sort-header')
      cy.get('mat-header-cell').eq(1).should('have.text', 'Description')
      cy.get('mat-header-cell').eq(2).should('have.text', 'Duration')
      cy.get('mat-row').should('have.length', 2);
    })
  });

  it('should contain table with correct number of lessons', () => {
    cy.get('[data-cy="lessons-table"]').within(() => {
      cy.get('mat-row').should('have.length', 2);
      cy.get('mat-row').first().within(() => {
        cy.get('mat-cell').eq(0).should('have.text', 1)
        cy.get('mat-cell').eq(1).should('have.text', 'Angular Tutorial For Beginners - Build Your First App - Hello World Step By Step')
        cy.get('mat-cell').eq(2).should('have.text', '4:17')
      })
    })
  });


});
