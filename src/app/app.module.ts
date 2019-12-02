import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, RouteComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigfakerestService } from './Configfakerest.service';
import { ShareserviceService } from './shareservice.service';


@NgModule({
  declarations: [
    AppComponent,
    RouteComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ConfigfakerestService, ShareserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
