import {Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ListUsersService} from '../../services/list-users.service';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ModalDismissReasons, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../models/User";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSort} from "@angular/material/sort";
import {PageEvent} from "@angular/material/paginator";
import Swal from 'sweetalert2';

export const DEFAULT_SIZE = 1
@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  dataSource: MatTableDataSource<any> ;
  displayedColumns: string[] = ['ID','nom','prenom','email','username','role','edit','suppression'];
  updateUserForm!:FormGroup
  closeResult = '';

  totalRows = 0;
  pageSize = DEFAULT_SIZE;
  currentPage = 0;

  pageSizes = [3, 5, 7];
  index:number=0;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private listUsersService : ListUsersService,
              private router: Router,
              private formBuilder : FormBuilder,
              private modalService: NgbModal,
              private authenticationService: AuthenticationService
              ) { this.dataSource = new MatTableDataSource<any>([]);}



  ngOnInit(){
    this.usersCount();
    this.getUsers(this.currentPage,this.pageSize);

    this.updateUserForm=this.formBuilder.group({
      id: [null,Validators.required],
      nom: [null,Validators.required],
      prenom: [null,Validators.required],
      email: [null,Validators.required],
      username: [null,Validators.required],
      role: ['ADMIN']

    }


    )

    this.dataSource.sort = this.sort;
  }
  private getDismissReason(reason: any): any {
    if (reason === ModalDismissReasons.ESC) {
      return null;
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return null;
    } else {
      return `with: ${reason}`;
    }
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
      return data[column].trim().toLowerCase().includes(filter);
    };
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }




  replaceColumnName(column: string, replacementText: string) {

    const columnIndex = this.displayedColumns.indexOf(column);
    if (columnIndex !== -1) {
      this.displayedColumns[columnIndex] = replacementText;
    }

  }
  getRowNumber(index: number): number {
    return index + 1;
  }
  getUsers(page:number,size:number){

    this.listUsersService.listUsers(page,size).subscribe(
      (data: any) => {
        console.log('Received users data:', data);

        this.dataSource.data=data;


      },
      (error: any) => {
        console.log('Error getting users:', error);
      }

    );


  }

  deleteUser(id:number){
    this.listUsersService.deleteUser(id).subscribe(
      (data:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur supprimé avec succés',
          showConfirmButton: false,
          timer: 1500
        })
        console.log("user deleted")
        this.getUsers(this.currentPage,this.pageSize);
      },
      (error:any)=>{
        console.log("user not deleted")
      }
    )
  }

  update(index:number){
    this.listUsersService.patchUser(this.updateUserForm.value,index).subscribe(
      (user:User)=>{
        Swal.fire({
          icon: 'success',
          title: 'Utilisateur mis à jour avec succés',
          showConfirmButton: false,
          timer: 1500
        });
        console.log("User updated");
        this.getUsers(this.currentPage,this.pageSize);
      },
      (error)=>{
        console.log("User not updated");
      }
    )
  }


  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    console.log(this.currentPage)
    this.getUsers(event.pageIndex,event.pageSize);
  }
  usersCount(){
    this.listUsersService.countUsers().subscribe(
      (data:any)=>{
        this.totalRows=data;
      }
    )
  }

}
