import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/userServices/user-service.service';
import { User } from '../models/User';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent  implements OnInit {

  
  users: User[] = [];
  paginator:any={};
  constructor(private router: Router, private service: UserService,
     private route: ActivatedRoute
  ){
    
  }
  ngOnInit(): void {
    if (this.users == undefined || this.users.length == 0) {
      console.log('consulta findAll');

      // this.service.findAll().subscribe(u => this.users = u);

      this.route.paramMap.subscribe(params => {
        const page = +(params.get('page') || '0');
        this.service.findAllPageable(page).subscribe(pageable => {
          this.users = pageable.content as User[];
          this.paginator = pageable;
        });
      })

      
    }





  }

}
