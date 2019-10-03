import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';

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
    CountsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
