import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkProcessorComponent } from './link-processor.component';

describe('LinkProcessorComponent', () => {
  let component: LinkProcessorComponent;
  let fixture: ComponentFixture<LinkProcessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkProcessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
