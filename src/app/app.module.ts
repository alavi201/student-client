import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { StudentsComponent } from './students/students.component';
import { FormsModule } from '@angular/forms';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component'; // <-- NgModel lives here
import {enableProdMode} from '@angular/core';
import { StudentSearchComponent } from './student-search/student-search.component';

enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    StudentsComponent,
    MessagesComponent,
    StudentDetailComponent,
    DashboardComponent,
    StudentSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
