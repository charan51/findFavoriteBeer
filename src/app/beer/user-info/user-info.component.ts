import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent  {
  userInfo = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ])
  })
  constructor(private router: Router) { }
  onSubmit() {
      if(this.userInfo.invalid) {
        return;
      }else {
        const value:any = this.userInfo.value;
        sessionStorage.setItem('user', value.username)
        this.router.navigateByUrl('/findBeer')
      }
  }

}
