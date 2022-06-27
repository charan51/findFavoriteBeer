import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserInfoComponent } from './beer/user-info/user-info.component';
import { SearchBeerComponent } from './beer/search-beer/search-beer.component';
const routes: Routes = [
  {component: UserInfoComponent, path: ''},
  {component: SearchBeerComponent, path: 'findBeer'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
