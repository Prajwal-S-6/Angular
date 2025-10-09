import {TestBed, waitForAsync} from "@angular/core/testing";
import {CoursesService} from "./courses.service";
import {courseResolver} from "./course.resolver";
import { ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {provideHttpClient} from "@angular/common/http";
import {provideHttpClientTesting} from "@angular/common/http/testing";

let coursesService: CoursesService
describe('Course Route Resolver', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService, provideHttpClient(), provideHttpClientTesting()],
    })
    coursesService = TestBed.inject(CoursesService);
  }))

  it('should resolve course based on id', () => {
    const state = {} as unknown as RouterStateSnapshot;
    let route = {
      params: {
        id: 2
      }
    } as unknown as ActivatedRouteSnapshot;
    spyOn(coursesService, 'findCourseById').and.callThrough();

    TestBed.runInInjectionContext(() => courseResolver(route, state));

    expect(coursesService.findCourseById).toHaveBeenCalledWith(2)

  });
});
