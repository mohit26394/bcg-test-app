import { Injectable } from "@angular/core";
// import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import InsuranceData from "../../assets/json/Data Set.json";
import { CustomerData } from "../models";

@Injectable({
  providedIn: "root",
})
export class CustomerDataService {
  customerData = new BehaviorSubject<any>([...InsuranceData]);
  policyData = InsuranceData;
  regions = ["East", "West", "North", "South"];
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // constructor(private _router: Router) {
  // }

  getInsuranceData() {
    return this.customerData.asObservable();
  }

  // function to delete policy from table
  removePolicy(policyId: number) {
    const index = this.policyData.findIndex(x => x.Policy_id == policyId);
    console.log("index", index);
    if(index > -1){
      this.policyData.splice(index, 1);
      this.customerData.next(this.policyData);
    }
  }

    // function to update policy from table
  updatePolicy(policyId: number, updatedPolicy: CustomerData) {
    const index = this.policyData.findIndex(x => x.Policy_id == policyId);
    console.log("index", index);
    if(index > -1){
      this.policyData.splice(index, 1, updatedPolicy);
      this.customerData.next(this.policyData);
    }
  }

  // function to add policy to table
  addNewPolicy(policyDetails: CustomerData) {
    policyDetails.Policy_id = this.policyData[this.policyData.length - 1].Policy_id + 1;
    policyDetails.Date_of_Purchase = new Date().toLocaleDateString();
    policyDetails.Customer_id = this.policyData[this.policyData.length - 1].Customer_id + 1;
    this.policyData.unshift(policyDetails);
    this.customerData.next(this.policyData);
  }

  // function returns policy sales modified data for bar chart
  getMonthlyPolicySales() {
    let cumulativeSalesRecord = [];
    for (let i = 1; i <= this.months.length; i++) {
      const saleDetails = {
        month: "",
        recordCount: 0,
      };

      const monthlySalesCount = InsuranceData.filter(
        (x) => x.Date_of_Purchase.split("/")[0] === i.toString()
      );

      saleDetails.month = this.months[i-1];
      saleDetails.recordCount = monthlySalesCount.length;

      cumulativeSalesRecord.push(saleDetails);
    }
    return cumulativeSalesRecord;
  }

  // function returns policy regional sales modified data for line chart
  getRegionalMonthlySales() {
    let regionalSalesRecord = [];
    for (let j = 0; j <= this.regions.length - 1; j++) {
      let saleDetails;
      for (let i = 1; i <= this.months.length; i++) {
        saleDetails = {
          month: "",
          recordCount: 0,
          region: ""
        };
        const regionalSalesCount = InsuranceData.filter(
          (r) => r.Customer_Region === this.regions[j]
        );

        const monthlySalesCount = regionalSalesCount.filter(
          (x) => x.Date_of_Purchase.split("/")[0] === i.toString()
        );

        saleDetails.month = this.months[i-1];
        saleDetails.recordCount = monthlySalesCount.length;
        saleDetails["region"] = this.regions[j];

        regionalSalesRecord.push(saleDetails);
      }
    }
    return regionalSalesRecord;
  }
}
