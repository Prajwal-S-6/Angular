/// <reference types="jasmine" />
import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from "@angular/core/testing";
import {CoursesModule} from "../courses.module";
import {CoursesService} from "../services/courses.service";
import {CourseComponent} from "./course.component";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import {ActivatedRoute} from "@angular/router";
import * as mockLessonsData from './../../../unitTestUtilities/mockData/mockLessonsData.json';
import * as mockCoursesData from './../../../unitTestUtilities/mockData/mockCoursesData.json';
import {of} from "rxjs";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LessonsDataSource} from "../services/lessons.datasource";


let component: CourseComponent
let fixture: ComponentFixture<CourseComponent>
let coursesService: CoursesService;
let mockCourseData = Object.assign(mockCoursesData);
let mockLessons = Object.assign(mockLessonsData);
describe('Course Component', () => {
  let route = {
    snapshot: {
      data: {
        course: mockCourseData.allCourses[0]
      }
    }
  } as unknown as ActivatedRoute;
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
      providers: [
        CoursesService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide : ActivatedRoute, useValue: route}
      ]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CourseComponent);
      component = fixture.componentInstance;
      coursesService = TestBed.inject(CoursesService);
    })

  }))

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should get the course data from activated route', () => {
    component.ngOnInit();

    expect(component.course.id).toBe(12);
    expect(component.course.titles.description).toBe("Angular Testing Course");
    expect(component.course.titles.longDescription).toBe("In-depth guide to Unit Testing and E2E Testing of Angular Applications");
    expect(component.course.lessonsCount).toBe(10)
  })

  it('should set datasource and load lessons', () => {
    spyOn(coursesService, 'findLessons').and.callThrough()
    component.ngOnInit();

    expect(component.dataSource).toBeDefined();
    expect(coursesService.findLessons).toHaveBeenCalledOnceWith(12, '', 'asc', 0, 3)
  });

   it('should subscribe to sort changes and set paginator index to 0', () => {
     component.paginator = { pageIndex: 5 } as MatPaginator;
     component.sort = new MatSort();

     component.onSortEventChangeInitializePageIndex();

     component.sort.sortChange.emit({ active: 'name', direction: 'asc' })

     expect(component.paginator.pageIndex).toBe(0)
   });

   it('should load lessons and set paginator index to 0', fakeAsync(() => {
     spyOn(coursesService, 'findLessons').and.callThrough()
     component.paginator = { pageIndex: 5, pageSize: 3 } as MatPaginator;
     const inputEl = document.createElement('input');
     component.input = { nativeElement: inputEl } as any;
     component.course = mockCourseData.allCourses[0];
     component.dataSource = new LessonsDataSource(coursesService)

     component.onInputKeyUpSetPageIndexAndLoadLessons();

     component.input.nativeElement.dispatchEvent(new KeyboardEvent('keyup'))
     tick(200)

     expect(component.paginator.pageIndex).toBe(0);
     expect(coursesService.findLessons).toHaveBeenCalledOnceWith(12, '', 'asc', 0, 3)

   }));

  it('should load lessons page ', () => {
    spyOn(coursesService, 'findLessons').and.callThrough();
    component.course = mockCourseData.allCourses[0];
    component.dataSource = new LessonsDataSource(coursesService)
    component.sort = {
      sortChange: of(true)
    } as unknown as MatSort;
    component.paginator = {
      page: of(true)
    } as any as MatPaginator;

    component.mergeSortEventAndPageEventChangesAndLoadLessonsPage();

    expect(coursesService.findLessons).toHaveBeenCalledTimes(2);
  });

  it('should load lessons by calling course service with correct arguments', () => {
    spyOn(coursesService, 'findLessons').and.callThrough();
    component.course = mockCourseData.allCourses[0];
    component.dataSource = new LessonsDataSource(coursesService)
    component.sort = {
      sortChange: of(true)
    } as unknown as MatSort;
    component.paginator = {
      page: of(true),
      pageIndex: 5,
      pageSize: 3
    } as any as MatPaginator;

    component.ngAfterViewInit();

    expect(coursesService.findLessons).toHaveBeenCalledTimes(2);
    expect(component.paginator.pageIndex).toBe(0)
  });
})
