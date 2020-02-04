import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { VenteComponent } from './vente/vente.component';
import { ProduitComponent } from './produit/produit.component';
import { HistoriqueComponent } from './historique/historique.component';

@NgModule({
  declarations: [
    AppComponent,
    VenteComponent,
    ProduitComponent,
    HistoriqueComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
