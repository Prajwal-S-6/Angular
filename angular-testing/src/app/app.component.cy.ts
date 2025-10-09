import { mount } from 'cypress/angular';
import {RouterModule, Routes} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({ template: '<p>Home Works!</p>', standalone: false })
class HomeStubComponent {}

@Component({ template: '<p>About Works!</p>', standalone: false })
class AboutStubComponent {}

const routes: Routes = [
  { path: '', component: HomeStubComponent },
  { path: 'about', component: AboutStubComponent }
];

describe('AppComponent', () => {
  it('should navigate between Home and About ', () => {
    mount(AppComponent, {
      imports: [
        MatToolbarModule,
        MatButtonModule,
        RouterModule.forRoot(routes)
      ],
      declarations: [HomeStubComponent, AboutStubComponent]
    });

    cy.get('a').should('have.length', 2)
    cy.get('a').eq(0).as('courses').contains('COURSES')
    cy.get('a').eq(1).as('about').contains('ABOUT')

    cy.get('@about').click()
    cy.contains('About Works!')
    cy.contains('Home Works!').should('not.exist')

    cy.get('@courses').click();
    cy.contains('Home Works!')
    cy.contains('About Works!').should('not.exist')
  });
});
