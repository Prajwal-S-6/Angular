import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Course} from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {filter, tap} from 'rxjs/operators';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css'],
    standalone: false
})
export class CoursesCardListComponent {

  @Input()
  courses: Course[];

  @Output()
  courseEdited = new EventEmitter();

  constructor(private dialog: MatDialog) {

  }


  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);


    //courseEdited event was it emitted is checked as part of unit test(not component test)
    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.courseEdited.emit())
      )
      .subscribe();

  }

}









