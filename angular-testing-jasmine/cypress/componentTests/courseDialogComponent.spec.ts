import {mount} from "cypress/angular";
import {CourseDialogComponent} from "../../src/app/courses/course-dialog/course-dialog.component";
import {CoursesModule} from "../../src/app/courses/courses.module";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import * as mockCourseData from "../../src/unitTestUtilities/mockData/mockCoursesData.json"
import {CoursesService} from "../../src/app/courses/services/courses.service";
import {ReactiveFormsModule} from "@angular/forms";

class CourseServiceStub {

}
describe('CourseDialog Component', () => {
  const courses = Object.assign(mockCourseData);

  beforeEach(() => {
    mount(CourseDialogComponent, {
      imports: [CoursesModule, ReactiveFormsModule],
      providers: [
        {provide: MAT_DIALOG_DATA, useValue: courses.allCourses[0]},
        {provide: CoursesService, useClass: CourseServiceStub},
        {provide: MatDialogRef, useValue: {close: cy.spy()}}
      ]
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
});
