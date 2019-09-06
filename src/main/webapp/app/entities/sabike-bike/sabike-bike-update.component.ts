import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISABIKEBike, SABIKEBike } from 'app/shared/model/sabike-bike.model';
import { SABIKEBikeService } from './sabike-bike.service';

@Component({
  selector: 'jhi-sabike-bike-update',
  templateUrl: './sabike-bike-update.component.html'
})
export class SABIKEBikeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    type: [],
    size: [],
    speeds: [],
    color: []
  });

  constructor(protected sABIKEBikeService: SABIKEBikeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sABIKEBike }) => {
      this.updateForm(sABIKEBike);
    });
  }

  updateForm(sABIKEBike: ISABIKEBike) {
    this.editForm.patchValue({
      id: sABIKEBike.id,
      type: sABIKEBike.type,
      size: sABIKEBike.size,
      speeds: sABIKEBike.speeds,
      color: sABIKEBike.color
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sABIKEBike = this.createFromForm();
    if (sABIKEBike.id !== undefined) {
      this.subscribeToSaveResponse(this.sABIKEBikeService.update(sABIKEBike));
    } else {
      this.subscribeToSaveResponse(this.sABIKEBikeService.create(sABIKEBike));
    }
  }

  private createFromForm(): ISABIKEBike {
    return {
      ...new SABIKEBike(),
      id: this.editForm.get(['id']).value,
      type: this.editForm.get(['type']).value,
      size: this.editForm.get(['size']).value,
      speeds: this.editForm.get(['speeds']).value,
      color: this.editForm.get(['color']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISABIKEBike>>) {
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
