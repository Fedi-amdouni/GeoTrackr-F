import { Component, OnInit } from '@angular/core';
import { TraceService } from '../../services/trace.service';
import { Router } from '@angular/router';
import { Trace } from '../../models/trace';
import { HttpErrorResponse } from '@angular/common/http';
import * as $ from 'jquery';
import { NgForm } from '@angular/forms';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSort} from "@angular/material/sort";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

import {PageEvent} from "@angular/material/paginator";
import {DEFAULT_SIZE} from "../list-users/list-users.component";
import {User} from "../../models/User";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list-traces',
  templateUrl: './list-traces.component.html',
  styleUrls: ['./list-traces.component.css']
})
export class ListTracesComponent implements OnInit {
  dataSource: MatTableDataSource<any> ;
  public traces!: Trace[];
  public editTrace!: Trace;
  public deleteTrace!: Trace;
  displayedColumns: string[] = ['ID','label','longitudes','latitudes','modif','suppression'];
  updateTraceForm!:FormGroup
  closeResult = '';

  totalRows = 0;
  pageSize = DEFAULT_SIZE;
  currentPage = 0;

  pageSizes = [3, 5, 7];
  index:number=0;

  constructor(private formBuilder : FormBuilder,private modalService: NgbModal,private traceService: TraceService,public router: Router){
    this.dataSource = new MatTableDataSource<any>([]);
  }

  ngOnInit() {
    this.updateTraceForm=this.formBuilder.group({
      label: [null,Validators.required],
      longitudes: [null,Validators.required],
      latitudes: [null,Validators.required],


    })
    this.getTraces();
  }
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    console.log(this.currentPage)
    this.getTraces();
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  applyFilter(event: Event, column: string) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onFilterInput(event: Event, column: string) {
    const filterValue = (event.target as HTMLDivElement).innerText;

    this.dataSource.filterPredicate = (data: any, filter: string) => {
      const columnValue = data[column];

      if (typeof columnValue === 'string') {
        return columnValue.trim().toLowerCase().includes(filter);
      } else if (typeof columnValue === 'number') {
        // Convert both the column value and filter to strings for comparison
        return columnValue.toString().includes(filter);
      }

      return false; // Return false for unsupported types
    };

    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  replaceColumnName(column: string, replacementText: string) {

    const columnIndex = this.displayedColumns.indexOf(column);
    if (columnIndex !== -1) {
      this.displayedColumns[columnIndex] = replacementText;
    }

  }


  public getTraces(): void {
    this.traceService.getTraces().subscribe(
      (response: Trace[]) => {
        this.traces = response;
        this.dataSource.data=response;
        this.totalRows=this.dataSource.data.length
        console.log(this.traces);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddTrace(): void {
    this.traceService.addTrace(this.updateTraceForm.value).subscribe(
      (response: Trace) => {
        Swal.fire({
          icon: 'success',
          title: 'Trace ajoutée avec succés',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(response);
        this.getTraces();
        console.log("trace ajoutée")
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  OnUpdateTrace(index:number){
    this.traceService.updateTrace(this.updateTraceForm.value,index).subscribe(
      (trace:Trace)=>{
        Swal.fire({
          icon: 'success',
          title: 'Trace mise à jour avec succés',
          showConfirmButton: false,
          timer: 1500
        })

        console.log("Trace updated");
        this.getTraces()
      },
      (error)=>{
        console.log("Trace not updated");
      }
    )
  }
  getRowNumber(index: number): number {
    return index + 1;
  }
  public onDeleteTrace(traceId: number): void {
    this.traceService.deleteTrace(traceId).subscribe(
      (response: void) => {
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur supprimé avec succés',
          showConfirmButton: false,
          timer: 1500
        })
        console.log(response);
        this.getTraces();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onOpenModal(trace: Trace, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      $("#addTraceModal").prependTo("body");
      button.setAttribute('data-target', '#addTraceModal');
    }
    if (mode === 'edit') {
      $("#updateTraceModal").prependTo("body");
      this.editTrace = trace;
      button.setAttribute('data-target', '#updateTraceModal');
    }
    if (mode === 'delete') {
      $("#deleteTraceModal").prependTo("body");
      this.deleteTrace = trace;
      button.setAttribute('data-target', '#deleteTraceModal');
    }
    container!.appendChild(button);
    button.click();
  }
}
