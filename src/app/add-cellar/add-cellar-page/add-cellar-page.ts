import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { CellarClient } from '../../authentication/clients/cellar-client';

@Component({
  selector: 'app-add-cellar-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-cellar-page.html',
  styleUrl: './add-cellar-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCellarPage {
  private readonly cellarClient = inject(CellarClient);
  protected cellarsResource = rxResource({
    stream: () => this.cellarClient.getCellars(),
    defaultValue: [],
  });

  cellarForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required], nonNullable: true }),
  });

  onSubmitCellar() {
    if (this.cellarForm.valid === false) {
      return;
    }
    this.cellarClient.postCellar(this.cellarForm.value.name ?? '');
  }
}

export interface Cellar {
  cellarId: number;
  userId: Number;
  name: string;
}
