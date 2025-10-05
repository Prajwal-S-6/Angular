import {TestBed} from "@angular/core/testing";
import {HttpTestingController, provideHttpClientTesting} from "@angular/common/http/testing";
import {CoursesService} from "./courses.service";
import {provideHttpClient} from "@angular/common/http";
import {COURSES, findCourseById, findLessonsForCourse} from "../../../../server/db-data";
import {Course} from "../model/course";

let service: CoursesService;
let httpTestController: HttpTestingController;
describe('CourseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [CoursesService, provideHttpClient(), provideHttpClientTesting()]
    })

    service = TestBed.inject(CoursesService);
    httpTestController = TestBed.inject(HttpTestingController);
  })

  it('should return list of all courses', () => {
    service.findAllCourses().subscribe((courses) => {
      expect(courses.length).toBe(12)
    })

    const request = httpTestController.expectOne('/api/courses')
    expect(request.request.method).toBe("GET")
    request.flush({'payload': Object.values(COURSES)})
  });

  it('should get one course by id', () => {
    service.findCourseById(6).subscribe((course) => {
      expect(course.id).toBe(6)
      expect(course.titles.description).toBe('Angular Security Course - Web Security Fundamentals')
    })

    const request = httpTestController.expectOne('/api/courses/6')
    expect(request.request.method).toBe("GET")
    request.flush({
      id: 6,
      titles: {
        description: 'Angular Security Course - Web Security Fundamentals',
        longDescription: 'Learn Web Security Fundamentals and apply them to defend an Angular / Node Application from multiple types of attacks.'
      },
      iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/security-cover-small-v2.png',
      courseListIcon: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/lock-v2.png',
      category: 'ADVANCED',
      lessonsCount: 11,
      seqNo: 6,
      url: 'angular-security-course'
    })
  });

  it('should save the course', () => {
    const changes: Partial<Course> = {titles: {description: 'Testing Course'}}
    service.saveCourse(12, changes).subscribe((course) => {
      expect(course.id).toBe(12)
      expect(course.titles.description).toBe('Testing Course')
      //expect(course.titles.description).not.toBe('Angular Testing Course')
    })

    const request = httpTestController.expectOne('/api/courses/12')
    expect(request.request.method).toBe("PUT")
    request.flush({
      id: 12,
      titles: {
        description: 'Testing Course',
        longDescription: 'In-depth guide to Unit Testing and E2E Testing of Angular Applications'
      },
      iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/angular-testing-small.png',
      category: 'BEGINNER',
      seqNo: 0,
      url: 'angular-testing-course',
      lessonsCount: 10,
    })
  });

  it('should find lessons based on params', () => {
    service.findLessons(3).subscribe((lessons) => {
      expect(lessons.length).toBe(2);
    })

    const req = httpTestController.expectOne(req1 => req1.url === '/api/lessons')
    expect(req.request.method).toBe('GET')
    expect(req.request.params.get('courseId')).toBe('3')
    expect(req.request.params.get('pageNumber')).toBe('0')
    expect(req.request.params.get('pageSize')).toBe('3')
    expect(req.request.params.get('sortOrder')).toBe('asc')
    req.flush({payload: [
        {
          id: 48,
          description: 'Testing Angular Components without the DOM',
          'duration': '8:19',
          'seqNo': 9,
          courseId: 12
        },
        {
          id: 49,
          description: 'Testing Angular Components with the DOM',
          'duration': '7:05',
          'seqNo': 10,
          courseId: 12
        }
      ]
      })
  });

  afterEach(() => {
    httpTestController.verify();
  })
});
