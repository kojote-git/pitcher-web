import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResearchCreationComponent } from './research-creation.component';

describe('ResearchCreationComponent', () => {
  let component: ResearchCreationComponent;
  let fixture: ComponentFixture<ResearchCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResearchCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResearchCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
