import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TransactionModalComponent } from './components/transaction-modal/transaction-modal.component';
import { CountsModalComponent } from './components/counts-modal/counts-modal.component';
import { RemoveModalComponent } from './components/remove-modal/remove-modal.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from '@angular/material';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material";
import { TransactionModal2Component } from './components/transaction-modal2/transaction-modal2.component'

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RemoveModalComponent,
    HeaderComponent,
    TransactionModalComponent,
    HomeComponent,
    PageNotFoundComponent,
    StatisticsComponent,
    SettingsComponent,
    CountsModalComponent,
    TransactionModal2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
