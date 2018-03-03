import { Component, Input } from '@angular/core';

@Component({
  selector: 'rg-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss']
})
export class DividerComponent {

  @Input() width: string = '100%';

}
