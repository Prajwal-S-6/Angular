import {CoursesCardListComponent} from './courses-card-list.component';
import {CoursesModule} from '../courses.module';
import {COURSES} from '../../../../server/db-data';
import {ComponentFixture, TestBed, waitForAsync} from "@angular/core/testing";
import {MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material/dialog";
import {CourseDialogComponent} from "../course-dialog/course-dialog.component";
import {of} from "rxjs";



let component: CoursesCardListComponent;
let fixture: ComponentFixture<CoursesCardListComponent>;
const matSpy = jasmine.createSpyObj(MatDialog, ['open']);
const matDialogRefSpy = jasmine.createSpyObj(MatDialogRef, ['afterClosed', 'closeAll'])
let editedCourse = COURSES[12];
describe('CoursesCardListComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CoursesModule],
      providers: [{provide: MatDialog, useValue: matSpy}]
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(CoursesCardListComponent);
      component = fixture.componentInstance;
    });
  }))

  it("should create the component", () => {
   expect(component).toBeTruthy();
  });

  it('should call dialog open with correct config and correct Component', () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = editedCourse;

    matSpy.open.and.returnValue(matDialogRefSpy);
    matDialogRefSpy.afterClosed.and.returnValue(of(true));
    component.editCourse(editedCourse);

    expect(matSpy.open).toHaveBeenCalledWith(CourseDialogComponent, dialogConfig);
  })

  it('should call dialogRef close and emit courseEdited after closing dialog correctly', () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = editedCourse;

    matSpy.open.and.returnValue(matDialogRefSpy)
    matDialogRefSpy.afterClosed.and.returnValue(of(true))
    spyOn(component.courseEdited, 'emit').and.callThrough()
    component.editCourse(editedCourse);

    expect(matSpy.open).toHaveBeenCalledWith(CourseDialogComponent, dialogConfig);
    expect(matDialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(component.courseEdited.emit).toHaveBeenCalled();
  })

  it('should call dialogRef close and should not emit courseEdited if dialog not closed correctly', () => {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = editedCourse;

    matSpy.open.and.returnValue(matDialogRefSpy)
    matDialogRefSpy.afterClosed.and.returnValue(of(false))
    spyOn(component.courseEdited, 'emit').and.callThrough()
    component.editCourse(editedCourse);

    expect(matSpy.open).toHaveBeenCalledWith(CourseDialogComponent, dialogConfig);
    expect(matDialogRefSpy.afterClosed).toHaveBeenCalled();
    expect(component.courseEdited.emit).not.toHaveBeenCalled();
  })
});


