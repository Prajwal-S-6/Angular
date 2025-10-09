import {mount} from "cypress/angular";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import * as mockCourseData from "../../../../src/unitTestUtilities/mockData/mockCoursesData.json"
import {ReactiveFormsModule} from "@angular/forms";
import { of } from "rxjs";
import {Course} from "../model/course";
import {CourseDialogComponent} from "./course-dialog.component";
import {CoursesModule} from "../courses.module";
import {CoursesService} from "../services/courses.service";

class CourseServiceStub {
  saveCourse(courseId:number, changes: Partial<Course>) {
    return of(true)
  }
}
describe('CourseDialog Component', () => {
  const courses = Object.assign(mockCourseData);
  beforeEach(() => {
    mount(CourseDialogComponent, {
      imports: [CoursesModule, ReactiveFormsModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: courses.allCourses[0]},
        {provide: CoursesService, useClass: CourseServiceStub},
        {provide: MatDialogRef, useValue: {close: cy.spy().as('matDialogClose')}}
      ]
    }).then((response) => {
      cy.spy(response.component, 'close').as('closeEvent');
      cy.spy(response.component, 'save').as('saveEvent');
    })
  })

  it('should display course description has title', () => {
    cy.get('h2').contains('Angular Testing Course')
  });

  it('should fill in fields with course data', () => {
    cy.get('[data-cy=description]').should('have.value', 'Angular Testing Course')
    cy.get('[data-cy=category]').within(() => {
      cy.get('.mat-mdc-select-min-line').should('have.text','Beginner')
    })
    cy.get('[data-cy=releaseDate]').should('have.value', '10/8/2025')
    cy.get('[data-cy=longDescription]').should('have.value', 'In-depth guide to Unit Testing and E2E Testing of Angular Applications')
  });

  it('should contain two buttons with Close and Save respectively', () => {
    cy.get('mat-dialog-actions').within(() => {
      cy.get('button').should('have.length', 2);
      cy.get('button').first().should('contain.text', 'Close')
      cy.get('button').last().should('contain.text', 'Save')
    })
  });

  it('should call component close when clicked on close button', () => {
    cy.get('[data-cy=close]').click();
    cy.get('@closeEvent').should('have.been.called', 1)
  });

  it('should call component save when clicked on save button', () => {
    cy.get('[data-cy=save]').click();
    cy.get('@saveEvent').should('have.been.called', 1)
  });

  it('should call dialogRef close when course is saved or on click close button', () => {
    cy.get('[data-cy=save]').click();
    cy.get('@matDialogClose').should('have.been.called', 1)

    cy.get('[data-cy=close]').click();
    cy.get('@matDialogClose').should('have.been.called', 1)
  });
});
