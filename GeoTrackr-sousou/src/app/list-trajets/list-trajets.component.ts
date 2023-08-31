import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Trace} from "../../models/trace";
import {Trajet} from "../../models/trajet";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DEFAULT_SIZE} from "../list-users/list-users.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {TraceService} from "../../services/trace.service";
import {trajetService} from "../../services/trajets.service";
import {Router} from "@angular/router";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-list-trajets',
  templateUrl: './list-trajets.component.html',
  styleUrls: ['./list-trajets.component.css']
})
export class ListTrajetsComponent implements OnInit {
  dataSource: MatTableDataSource<any> ;
  public trajet!: Trajet[];
  public editTrajet!: Trajet;
  public deleteTrajet!: Trajet;
  displayedColumns: string[] = ['ID','userDto','date','traces','suppression'];
  updateTraceForm!:FormGroup
  closeResult = '';

  totalRows = 0;
  pageSize = DEFAULT_SIZE;
  currentPage = 0;

  pageSizes = [3, 5, 7];
  index:number=0;

  constructor(private formBuilder : FormBuilder,private modalService: NgbModal,private trajetService: trajetService,public router: Router){
    this.dataSource = new MatTableDataSource<any>([]);
  }


  ngOnInit() {
    this.getTrajets();
  }
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    console.log(this.currentPage)
    this.getTrajets();
  }
  getRowNumber(index: number): number {
    return index + 1;
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
  public getTrajets(): void {
    this.trajetService.getTrajets().subscribe(
      (response: any) => {
        console.log(response);

        if (Array.isArray(response)) {
          this.dataSource.data = response.map((row: any) => {
            const labels = row.traces.map((trace: any) => trace.label).join(', ');

            return {
              id:row.id,
              date: row.date,
              userDto: row.userDto?.email || '',
              traces: labels // Concatenate all trace labels into a single string
            };
          });

          console.log(this.dataSource.data);
          console.log("trajets affichés");
        } else {
          console.log("Invalid response structure.");
        }
      },
      (error: any) => {
        console.error("Error fetching trajets:", error);
      }
    );
  }

  onDeleteTrajet(id:number){
    this.trajetService.deleteTrajet(id).subscribe(
      (data:any)=>{
        console.log("trajet supprimé");
        this.getTrajets();
      }
    )
  }


}
