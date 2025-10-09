import {waitForAsync} from "@angular/core/testing";
import {AboutComponent} from "./about.component";

let component: AboutComponent;
describe('About Component', () => {
  beforeEach(waitForAsync(() => {
    component = new AboutComponent();
  }))

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
