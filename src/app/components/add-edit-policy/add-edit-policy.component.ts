import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerDataService } from 'src/app/providers/customer-data.service';

@Component({
  selector: 'add-edit-policy.component',
  templateUrl: './add-edit-policy.component.html',
  styleUrls: ['./add-edit-policy.component.css'],
})
export class AddEditPolicyComponent implements OnInit {
  policyForm = new FormGroup({});
  policyData: any;
  submitButtonText = '';

  constructor(
    private _activatedroute: ActivatedRoute,
    private _router: Router,
    private customerDataService: CustomerDataService
  ) {
    let data: any = this._activatedroute.snapshot.paramMap;
    this.policyData = data["params"];
  }

  ngOnInit(): void {
    //initialising input form on basis of add and edit operation with validations
    if (this.policyData.Policy_id) {
      this.submitButtonText = 'Update Policy';
      this.policyForm = new FormGroup({
        Policy_id: new FormControl({
          value: this.policyData.Policy_id,
          disabled: true,
        }),
        Date_of_Purchase: new FormControl({
          value: this.policyData.Date_of_Purchase,
          disabled: true,
        }),
        Customer_id: new FormControl({
          value: this.policyData.Customer_id,
          disabled: true,
        }),
        Fuel: new FormControl(this.policyData.Fuel, [Validators.required]),
        VEHICLE_SEGMENT: new FormControl(this.policyData.VEHICLE_SEGMENT, [
          Validators.required,
        ]),
        Premium: new FormControl(this.policyData.Premium, [
          Validators.required,
          Validators.max(1000000),
        ]),
        Customer_Income_group: new FormControl(
          this.policyData.Customer_Income_group,
          [Validators.required]
        ),
        Customer_Region: new FormControl(this.policyData.Customer_Region, [
          Validators.required,
        ]),
      });
    } else {
      this.submitButtonText = 'Add Policy';
      this.policyForm = new FormGroup({
        Policy_id: new FormControl({ value: '0', disabled: true }),
        Date_of_Purchase: new FormControl({
          value: new Date().toLocaleDateString(),
          disabled: true,
        }),
        Customer_id: new FormControl({ value: '0', disabled: true }),
        Fuel: new FormControl('', [Validators.required]),
        VEHICLE_SEGMENT: new FormControl('', [Validators.required]),
        Premium: new FormControl('', [
          Validators.required,
          Validators.max(1000000),
        ]),
        Customer_Income_group: new FormControl('', [Validators.required]),
        Customer_Region: new FormControl('', [Validators.required]),
      });
    }
  }

  onBackClick() {
    this._router.navigate(['/policy-list']);
  }

  onSubmit() {
    //toggling submit button operation on basis of add/edit function
    if (this.submitButtonText !== 'Add Policy') {
      const updatedRecord = {
        ...this.policyData,
        ...this.policyForm.value,
      };

      this.customerDataService.updatePolicy(
        this.policyData.Policy_id,
        updatedRecord
      );
    } else {
      const newPolicy = {
        ...this.policyData,
        ...this.policyForm.value,
      };

      this.customerDataService.addNewPolicy(newPolicy);
    }
    this._router.navigate(['/policy-list']);
  }
}
