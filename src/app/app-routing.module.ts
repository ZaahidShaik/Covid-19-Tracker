import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { UserloginComponent } from './components/userlogin/userlogin.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';

const routes: Routes = [ 
  { path: 'app-homepage', component: HomepageComponent},
  { path: 'country-card', component: InfoCardComponent },
  { path: 'user-login', component: UserloginComponent },
  { path: 'user-registration', component: UserRegistrationComponent },
  {path: '', redirectTo: '/app-homepage', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    // ,{ enableTracing: true }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
