import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Va-Banque';
  //ngOnDestroy implement
  // @HostListener('window:beforeunload')
  // async ngOnDestroy() {
  //   localStorage.clear();
  // }
}
