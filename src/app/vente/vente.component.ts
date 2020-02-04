import { Component, OnInit } from '@angular/core';
import { MagasinService,Produit,Vente,Stock,Produit_vente,Prix,Itempanier,ProduitEnStock} from '../magasin.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-vente',
  templateUrl:'./vente.component.html',
  styleUrls: ['./vente.component.css']
})
export class VenteComponent implements OnInit {



  stocks:Array<ProduitEnStock>;
  prixtotal:number
  panier:any=[];


  constructor(public service: MagasinService) { }

  ngOnInit() {
    this.getProduitWithStock()

  }


  getPrixProduit(produit:Produit){
    let prix=0.0;
    this.service.getPrix(produit.id).subscribe((data:any)  => {
        console.log(data)
        prix=data[0].valeur;
    })
    return prix;
  }


  getProduitWithStock(){
    this.service.getAllProduitEnStock().subscribe((data:any)  => {
        console.log(data)
        this.stocks=data;
    })

  }


  calculTotal(){
    this.prixtotal=0;
    for(let item of this.panier ){
      this.prixtotal+=(parseFloat(item.produit.valeur)*parseFloat(item.quantite));
    }
    for(let item of this.panier){
      if (item.quantite==0){
        this.panier.splice(this.panier.indexOf(item),1)
      }
    }
  }

  addProduit(produit:ProduitEnStock){

    if(this.panier.find(item => JSON.stringify(item.produit) ===JSON.stringify(produit))!= undefined){
      if(this.panier.find(item => JSON.stringify(item.produit) ===JSON.stringify(produit)).quantite<this.panier.find(item => JSON.stringify(item.produit) ===JSON.stringify(produit)).produit.quantite){
        this.panier.find(item => JSON.stringify(item.produit) ===JSON.stringify(produit)).quantite+=1
      }
    }
    else{
      this.panier.push(new Itempanier(produit,1))
    }
    console.log(this.panier)
    this.calculTotal()
  }



  updateAllProduit(){
    let date=this.getcurrentDate();
    console.log(date);
    for (let item of this.panier){
      let stock=new Stock(null,date,item.produit.quantite-item.quantite,item.produit);
      console.log("new stock",stock)
      this.service.updateProduitStock(stock).subscribe((data:any)  => {
          console.log(data)
      })
    }
    this.panier=[];
    this.stocks=null;
    this.getProduitWithStock();

  }

  getcurrentDate(){
    var today = new Date();

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    let now = yyyy+ '-' + mm + '-' + dd ;

    return now;
  }


  addVente(){


    let vente=new Vente(null,this.getcurrentDate(),this.prixtotal,null);
    this.service.addvente(vente).subscribe((data:any)  => {
        console.log(data)

        this.service.addProduitVente(data,this.panier).subscribe((data:any)  => {
            console.log(data)

            this.updateAllProduit();



        })

    })


  }






}
