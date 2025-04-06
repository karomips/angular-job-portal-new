import { Component } from '@angular/core';
import { AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-job-list',
  imports: [],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent implements AfterViewInit {
  constructor(private elRef: ElementRef) {}

  ngAfterViewInit(): void {
    const cards: NodeListOf<HTMLElement> = this.elRef.nativeElement.querySelectorAll('.expandable-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        card.classList.toggle('open');
      });
    });
  }
}
