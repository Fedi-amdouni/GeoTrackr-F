import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isMobile = false;
  style: any;
  dropdownMenu: ElementRef;
  nom:String='';
  prenom:String='';


  private data: any=[];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();}

  constructor(private elementRef: ElementRef,private router: Router,private authenticationService : AuthenticationService) {
    this.dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
  }

    ngOnInit() {
        this.nom=this.authenticationService.getUserData().nom;
     this.prenom=this.authenticationService.getUserData().prenom;

      this.dropdownMenu = this.elementRef.nativeElement.querySelector('.dropdown-menu');
      this.checkScreenSize();

      this.setActiveLink();
    }

  showDropdownMenu() {
    this.dropdownMenu.nativeElement.style.display = 'block';
  }
  private setActiveLink(): void {
    const currentUrl = this.router.url;

    const homeLink = document.querySelector('.A[href="/Home"]');
    const listUsersLink = document.querySelector('.A[href="/Home/listUsers"]');

    if (homeLink && currentUrl.includes('/Home')) {
      homeLink.classList.add('active');
      listUsersLink?.classList.remove('active'); // Remove 'active' class from the other link
    } else if (listUsersLink && currentUrl.includes('/Home/listUsers')) {
      listUsersLink.classList.add('active');
      homeLink?.classList.remove('active'); // Remove 'active' class from the other link
    }
    // Add similar conditions for other links...
  }
  showNewsDropdown = false;

  toggleDropdown() {
    this.showNewsDropdown = !this.showNewsDropdown;
  }

  checkScreenSize() {
      this.isMobile = window.innerWidth < 700;
    }

  logout(){
    this.authenticationService.logout();

  }






}
