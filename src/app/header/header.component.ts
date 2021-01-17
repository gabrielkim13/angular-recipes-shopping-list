import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent {
  @Output()
  onFeatureSelect = new EventEmitter<string>();

  onSelect(feature: string) {
    this.onFeatureSelect.emit(feature);
  }
}
