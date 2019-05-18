import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ResearchCreationComponent } from './research-creation/research-creation.component';

const routes: Routes = [
  { path: "auth", component: AuthenticationPageComponent },
  { path: "search", component: SearchPageComponent },
  { path: "creation", component: ResearchCreationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
