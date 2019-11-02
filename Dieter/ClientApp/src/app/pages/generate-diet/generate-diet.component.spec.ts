import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDietComponent } from './generate-diet.component';

describe('GenerateDietComponent', () => {
  let component: GenerateDietComponent;
  let fixture: ComponentFixture<GenerateDietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
