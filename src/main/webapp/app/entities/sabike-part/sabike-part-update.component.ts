import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISABIKEPart, SABIKEPart } from 'app/shared/model/sabike-part.model';
import { SABIKEPartService } from './sabike-part.service';

@Component({
  selector: 'jhi-sabike-part-update',
  templateUrl: './sabike-part-update.component.html'
})
export class SABIKEPartUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    category: [],
    type: []
  });

  constructor(protected sABIKEPartService: SABIKEPartService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sABIKEPart }) => {
      this.updateForm(sABIKEPart);
    });
  }

  updateForm(sABIKEPart: ISABIKEPart) {
    this.editForm.patchValue({
      id: sABIKEPart.id,
      category: sABIKEPart.category,
      type: sABIKEPart.type
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sABIKEPart = this.createFromForm();
    if (sABIKEPart.id !== undefined) {
      this.subscribeToSaveResponse(this.sABIKEPartService.update(sABIKEPart));
    } else {
      this.subscribeToSaveResponse(this.sABIKEPartService.create(sABIKEPart));
    }
  }

  private createFromForm(): ISABIKEPart {
    return {
      ...new SABIKEPart(),
      id: this.editForm.get(['id']).value,
      category: this.editForm.get(['category']).value,
      type: this.editForm.get(['type']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISABIKEPart>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
