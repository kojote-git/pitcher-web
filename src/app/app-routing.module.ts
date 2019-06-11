import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { ResearchCreationComponent } from './research-creation/research-creation.component';
import { MainComponent } from './main/main.component';
import { ResearchComponent } from './research/research.component';
import { OAuthComponent } from './oauth/oauth.component';
import { SubscriptionComponent } from './subscription/subscription.component';

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "auth", component: AuthenticationPageComponent },
  { path: "search", component: SearchPageComponent },
  { path: "creation", component: ResearchCreationComponent },
  { path: "research/:id", component: ResearchComponent },
  { path: "oauth_redirect", component: OAuthComponent },
  { path: "sub", component: SubscriptionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }