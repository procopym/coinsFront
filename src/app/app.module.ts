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
import { SettingsComponent } from './pages/settings/settings.component';
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
import { TransactionModal2Component } from './components/transaction-modal2/transaction-modal2.component';
import { StatisticsBarComponent } from './pages/statistics-bar/statistics-bar.component';
import { StatisticsPieComponent } from './pages/statistics-pie/statistics-pie.component'
import {ChartsModule} from 'ng2-charts';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatRadioModule} from "@angular/material/radio";

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
    TransactionModal2Component,
    StatisticsBarComponent,
    StatisticsPieComponent
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
    MatNativeDateModule,
    ChartsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
