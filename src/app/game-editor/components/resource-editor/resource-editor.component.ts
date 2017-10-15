import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators as vd } from '@angular/forms';

@Component({
  selector: 'rg-resource-editor',
  templateUrl: './resource-editor.component.html',
  styleUrls: ['./resource-editor.component.scss']
})
export class ResourceEditorComponent {
  public rForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.rForm = fb.group({
      'name': [null, vd.compose([vd.required, vd.minLength(3)])],
      'image': [null, vd.required],
    });
  }

  isValid(name) {
    return this.rForm.get(name).valid;
  }
}
