import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesService} from "../services/courses.service";
import {Validators} from "@angular/forms";
import {CourseDialogComponent} from "./course-dialog.component";
import {COURSES} from "../../../../server/db-data";
import {CoursesModule} from "../courses.module";
import * as mockdate from 'mockdate';
import moment from "moment";
import { of } from "rxjs";

let component: CourseDialogComponent;
let fixture: ComponentFixture<CourseDialogComponent>;
const dialogRefSpy = jasmine.createSpyObj(MatDialogRef, ['close']);
const course = COURSES[12];
const courseService = jasmine.createSpyObj(CoursesService, ['saveCourse']);

describe('CourseDialogComponent', () => {
  beforeEach(waitForAsync(() => {
    mockdate.set('2024-10-03T00:00:00Z')
    TestBed.configureTestingModule({
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy},
        {provide: MAT_DIALOG_DATA, useValue: course},
        {provide: CoursesService, useValue: courseService}
      ],
      imports: [CoursesModule]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CourseDialogComponent);
      component = fixture.componentInstance;
    })
  }))

  it('should create component', () => {
    expect(component).toBeTruthy();
  })

  it('should initialize course and form with right data and validators', () => {
    expect(component.course).toEqual(COURSES[12])
    expect(component.form).toBeDefined();

    expect(component.form.get('description').value).toEqual('Angular Testing Course')
    expect(component.form.get('description').hasValidator(Validators.required)).toBeTruthy()

    expect(component.form.get('category').value).toEqual('BEGINNER')
    expect(component.form.get('category').hasValidator(Validators.required)).toBeTruthy()

    const releasedAt = component.form.get('releasedAt').value as moment.Moment;
    expect(releasedAt.format('DD-MM-YYYY')).toBe('03-10-2024')
    expect(component.form.get('releasedAt').hasValidator(Validators.required)).toBeTruthy()

    expect(component.form.get('longDescription').value).toEqual('In-depth guide to Unit Testing and E2E Testing of Angular Applications')
    expect(component.form.get('longDescription').hasValidator(Validators.required)).toBeTruthy()
  })

  it('should call courseService saveCourse with proper course details and should call dialogReg close with form value', () => {
    courseService.saveCourse.and.returnValue(of({}))

    component.save()

    const courseDesc = {
      titles: {
        description: 'Angular Testing Course',
        longDescription: 'In-depth guide to Unit Testing and E2E Testing of Angular Applications'
      }
    }
    expect(courseService.saveCourse).toHaveBeenCalledWith(12, courseDesc)
    expect(dialogRefSpy.close).toHaveBeenCalledWith(component.form.value);
  })

  it('should call courseService saveCourse with proper course details and should not call dialogReg close when saveCourse doesnt return any value', () => {
    courseService.saveCourse.and.returnValue(of())

    component.save()

    const courseDesc = {
      titles: {
        description: 'Angular Testing Course',
        longDescription: 'In-depth guide to Unit Testing and E2E Testing of Angular Applications'
      }
    }
    expect(courseService.saveCourse).toHaveBeenCalledWith(12, courseDesc)
    expect(dialogRefSpy.close).not.toHaveBeenCalledWith(jasmine.any);
  })

  it('should call dialogRef close when close is called', () => {
    component.close();

    expect(dialogRefSpy.close).toHaveBeenCalled();
  });

})
