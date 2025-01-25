import { Component } from '@angular/core';

@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cms';
  selectedFeature: string = 'contacts';

  switchView(selectedFeature: string): void {
    this.selectedFeature = selectedFeature;
  }
}
