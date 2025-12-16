import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-default-home-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-home-layout.component.html',
})
export class DefaultHomeLayoutComponent implements OnInit{

  constructor(private router : Router){

  }

  ngOnInit(): void {
    if(!!localStorage.getItem('user')){

    }
  }
}
