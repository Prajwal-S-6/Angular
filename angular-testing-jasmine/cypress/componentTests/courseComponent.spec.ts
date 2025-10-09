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
});
