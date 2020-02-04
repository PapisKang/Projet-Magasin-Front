import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProduitComponent } from './produit/produit.component';
import { VenteComponent } from './vente/vente.component';
import { HistoriqueComponent } from './historique/historique.component';

const routes: Routes = [
  { path: 'produit', component: ProduitComponent },
  { path: 'historique', component: HistoriqueComponent },
  { path: 'vente', component: VenteComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
