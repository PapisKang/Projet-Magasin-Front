import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export class Produit {
  constructor(public id: number, public nom: string, public categorie: string) {}
}
export class ProduitEnStock {
  constructor(public id: number, public nom: string, public categorie: string,public prix: number,public quantite: number ) {}
}
export class Itempanier {
  constructor(public produit:ProduitEnStock, public quantite: number) {}
}

export class Stock {
    constructor(public id: number, public date: string,public quantite: number, public produit: Produit) {}
}
export class Produit_vente {
  constructor(public id: number, public quantite: number) {}
}
export class Prix {
  constructor(public id: number, public valeur: number, public dateDeb: string, public dateFin: string , public produit: Produit) {}
}
export class Vente {
  constructor(public id: number, public date: string, public prixTotale: number, public produit_ventes: Array<Produit_vente>) {}
}


@Injectable({
  providedIn: 'root'
})
export class MagasinService {

  constructor(private httpClient: HttpClient) { }

  url:string = "http://localhost:3000";

  //get all product
  getAllProduit() {
    return this.httpClient.get(this.url + `/api/produits`);
  }

  getAllVente() {
    return this.httpClient.get(this.url + `/api/ventes`);
  }

  getAllProduitEnStock() {
    return this.httpClient.get(this.url + `/api/produits/enstock`);
  }



  getAllStock() {
    return this.httpClient.get(this.url + `/api/allstock`);
  }


  addProduit(p:Produit) {
    return this.httpClient.post(this.url + `/api/produit`, p);
  }

  addStock(s:Stock) {
    return this.httpClient.post(this.url + `/api/stock`, s);
  }

  addPrix(prix:Prix) {
    return this.httpClient.post(this.url + `/api/prix`, prix);
  }

  addvente(vente:Vente) {
    return this.httpClient.post(this.url + `/api/vente`, vente);
  }

  addProduitVente(idvente: number,itempaniers:any ) {

    return this.httpClient.post(this.url + `/api/produit/vente`,{'idvente': JSON.stringify(idvente),'itempaniers': JSON.stringify(itempaniers)});
  }

  getProduct(nomProduit:string) {
    nomProduit = encodeURIComponent(nomProduit);
    return this.httpClient.get(this.url + `/api/produit/${ nomProduit }`);
  }

  getPrix(idProduit:number) {
    return this.httpClient.get(this.url + `/api/prix/${ idProduit }`);
  }

  getVente(id:number) {
    return this.httpClient.get(this.url + `/api/vente/${ id }`);
  }



  getStock(idProduit:number) {
    return this.httpClient.get(this.url + `/api/stock/${ idProduit }`);
  }

  rmProduit(idProduit:number) {
    //idProduit = encodeURIComponent(idProduit);
    return this.httpClient.delete(this.url + `/api/produit/${ idProduit }`);
  }



  updateProduitStock(s:Stock) {
    return this.httpClient.put(this.url + `/api/stock`,s);
  }

  updateProduitPrix(p:Prix) {
    return this.httpClient.put(this.url + `/api/prix`,p);
  }



  getProduitById(idProduit:number) {
    //idProduit = encodeURIComponent(idProduit);
    return this.httpClient.get(this.url + `/api/produitId/${ idProduit }`);
  }

  getCountNameProduct(nomProduit:string) {
    nomProduit = encodeURIComponent(nomProduit);
    return this.httpClient.get(this.url + `/api/getCountNomProduct/${ nomProduit }`);
  }


}
