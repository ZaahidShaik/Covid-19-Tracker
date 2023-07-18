import { Component, Inject, Input, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { CustomeSnackBarActions } from '../../models/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent {

  @Input() public message!: string;

  snackBarRef = inject(MatSnackBarRef);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: CustomeSnackBarActions,
                                          private router: Router,) { }

  directToLogin(){
    this.router.navigateByUrl('/user-login');
    this.snackBarRef.dismissWithAction();
  }

  dismiss(){
    this.snackBarRef.dismissWithAction();
  }



}
