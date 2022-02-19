import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerData } from 'src/app/models';
import { CustomerDataService } from 'src/app/providers/customer-data.service';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.css'],
})
export class PolicyListComponent implements AfterViewInit {
  insuranceRecords: Array<CustomerData> = [];
  displayedColumns: string[] = [
    'Policy_id',
    'Date_of_Purchase',
    'Customer_id',
    'Fuel',
    'Premium',
    'Customer_Income_group',
    'Customer_Region',
    'Actions',
  ];
  dataSource: any;
  loading: boolean;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private customerDataService: CustomerDataService,
    private router: Router
  ) {
    this.loading = true;
    this.customerDataService.getInsuranceData().subscribe((data) => {
      this.insuranceRecords = data;
      this.dataSource = new MatTableDataSource<CustomerData>(
        this.insuranceRecords
      );
    });
    
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    setTimeout(() => {
      this.loading = false;
    }, 100);
    setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    }, 500);
  }

  applyFilter(input: any) {
    let filterValue = input.value;
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  deleteItem(id: number) {
    this.customerDataService.removePolicy(id);
  }
}
