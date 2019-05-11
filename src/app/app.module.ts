import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthenticationService } from './services/auth/authentication.service';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { MenuComponent } from './menu/menu.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DemoSearchService } from './services/search/demo-search.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthenticationPageComponent,
    MenuComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AuthenticationService,
    { provide: "SearchService", useClass: DemoSearchService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
