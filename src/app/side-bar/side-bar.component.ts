import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HighlightDirective } from '../highlight.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  imports: [CommonModule,HighlightDirective,RouterModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  isCollapsed = true; // Initially collapsed
  customStyleClass = 'collapse-sidebar'

  // Toggle the collapse state
  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed; 
    console.log(this.customStyleClass)
  }
}
