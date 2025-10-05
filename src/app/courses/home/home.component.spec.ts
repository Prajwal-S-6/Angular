import {ComponentFixture, fakeAsync, flush, TestBed, waitForAsync} from "@angular/core/testing";
import {CoursesService} from "../services/courses.service";
import {HomeComponent} from "./home.component";
import { of } from "rxjs";
import {CoursesModule} from "../courses.module";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";
import * as mockCourseData from "../../../unitTestUtilities/mockData/mockCoursesData.json"


let component: HomeComponent;
let fixture: ComponentFixture<HomeComponent>;
let courseService: CoursesService;
let mockCoursesData = Object.assign(mockCourseData);
describe('Home Component', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService, provideHttpClient(), provideHttpClientTesting()],
      imports: [CoursesModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      courseService = TestBed.inject(CoursesService);
    })
  }))

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should reload courses with beginner and advanced category sorted by sequence number', fakeAsync(() => {
    spyOn(courseService, 'findAllCourses').and.returnValue(of(mockCoursesData.allCourses))
    component.ngOnInit();

    component.beginnerCourses$.subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockCoursesData.beginnerCourses);
    })

    component.advancedCourses$.subscribe((data) => {
      expect(data.length).toBe(1);
    })
  }));
})
