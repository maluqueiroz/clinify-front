import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/core/auth/actions';
import { AppState } from 'src/app/reducers';
import { MessageLevel } from 'src/app/shared/services/snackbar/message-level.enum';
import { SnackbarService } from 'src/app/shared/services/snackbar/snackbar.service';

@Component({
  selector: 'app-side-nav-items',
  templateUrl: './side-nav-items.component.html',
  styleUrls: ['./side-nav-items.component.scss']
})
export class SideNavItemsComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
  }

  onLogout(): void {
    this.snackbar.open('Usuário deslogado', MessageLevel.INFO);
    this.store.dispatch(authActions.logout());
    this.router.navigate(['login']);
  }

}
