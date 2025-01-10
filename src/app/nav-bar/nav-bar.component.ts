import { Component, Input, OnChanges } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnChanges {
  @Input('userName') userName = ''

  ngOnChanges(): void {
    console.log(this.userName)
  }
}
