import { Component, Input } from '@angular/core';
import { User } from '../../models/User';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {



 constructor(private router:Router){

 }

}
