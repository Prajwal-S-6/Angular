import {of, throwError} from "rxjs";
import {CoursesService} from "./courses.service";
import {LessonsDataSource} from "./lessons.datasource";
import * as mockLessonsData from './../../../testUtilities/mockData/mockLessonsData.json';
import {CollectionViewer} from "@angular/cdk/collections";
import {fakeAsync, tick} from "@angular/core/testing";

let courseService = jasmine.createSpyObj(CoursesService, ['findLessons']);
let lessonDataSource: LessonsDataSource;
let lessons = Object.assign(mockLessonsData);
describe('LessonDataSource', () => {
  beforeEach(() => {
    lessonDataSource = new LessonsDataSource(courseService);
  })

  it('should call course service with right parameters when lessons are loaded', () => {
    courseService.findLessons.and.returnValue(of(true))
    lessonDataSource.loadLessons(12, 'angular', 'asc', 0, 3);
    expect(courseService.findLessons).toHaveBeenCalledWith(12, 'angular', 'asc', 0, 3)
  });

  it('should emit the loaded lessons from lessonsSubject', () => {
    courseService.findLessons.and.returnValue(of(lessons.testingLessons))

    lessonDataSource.loadLessons(12, 'angular', 'asc', 0, 3);

    lessonDataSource.connect(jasmine.any as any as CollectionViewer).subscribe(data => {
      expect(data.length).toBe(10);
    })
    lessonDataSource.loading$.subscribe(data => {
      expect(data).toBeFalse();
    })
  });

  it('should emit loadingSubject as true when before subscribing to coursesService findLessons and finally false', fakeAsync(() => {
    courseService.findLessons.and.returnValue(of(true))
    const emittedValues = [];
    lessonDataSource.loading$.subscribe(data => {
      emittedValues.push(data);
    })

    lessonDataSource.loadLessons(12, 'angular', 'asc', 0, 3);

    tick();
    expect(emittedValues).toEqual([false, true, false])
  }));

  it('should return empty list when courseService throws error', fakeAsync(() => {
    courseService.findLessons.and.returnValue(throwError(() => new Error('Some error')));

    const emittedValues = [];
    lessonDataSource.loading$.subscribe(data => {
      emittedValues.push(data);
    })
    lessonDataSource.loadLessons(12, 'angular', 'asc', 0, 3);
    tick()
    lessonDataSource.connect(jasmine.any as unknown as CollectionViewer).subscribe((data) => {
      expect(data.length).toBe(0)
    })
    expect(courseService.findLessons).toHaveBeenCalledWith(12, 'angular', 'asc', 0, 3)

    expect(emittedValues).toEqual([false, true, false])
  }));

  it('should not emit any values after disconnect', () => {
    let lessonsCompleted = false;
    let loadingCompleted = false;
    lessonDataSource.connect(jasmine.any as unknown as CollectionViewer).subscribe({
      complete: () => lessonsCompleted = true
    })
    lessonDataSource.loading$.subscribe({
      complete: () => loadingCompleted = true
    })

    lessonDataSource.disconnect(jasmine.any as unknown as CollectionViewer)

    expect(lessonsCompleted).toBeTrue();
    expect(loadingCompleted).toBeTrue()
  });
})
