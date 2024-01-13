import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpwComponent } from './resetpw.component';

describe('ResetpwComponent', () => {
  let component: ResetpwComponent;
  let fixture: ComponentFixture<ResetpwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetpwComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResetpwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
