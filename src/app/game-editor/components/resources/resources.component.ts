import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'rg-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  goToResourceEditor() {
    this.router.navigate(['games/editor/resources/create']);
  }

}
