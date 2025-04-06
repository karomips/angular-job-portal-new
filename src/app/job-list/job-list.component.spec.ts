import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobListComponent } from './job-list.component';

describe('JobListComponent', () => {
  let component: JobListComponent;
  let fixture: ComponentFixture<JobListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll<HTMLElement>('.expandable-card');
  
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('open');
      });
    });
  });  

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
