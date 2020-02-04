import { Component, OnInit } from '@angular/core';
import { MagasinService,Produit,Vente,Stock,Produit_vente,Prix,Itempanier,ProduitEnStock } from '../magasin.service';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits:Array<Produit>;
  allInputisOK:boolean;
  DateDebisOK:boolean;
  nomPoduitisOK:boolean;
  DateFinisOK:boolean;
  dateDeb:string
  dateFin:string
  idProduit:number
  inputProdprice:number
  inputProdStock:number
  inputProdname:string
  inputCategname:string
  produitSelected:number
  modifierprod:boolean
  modifProduit:Produit
  modifStock:Stock
  modifPrix:Prix


  constructor(public service: MagasinService) { }


  ngOnInit() {
    this.resetVariables()
    this.rechercheProduit();
  }

  rechercheProduit(){

    this.service.getAllProduit().subscribe((data:any)  => {
        console.log("Produit:")
        console.log(data)
        this.produits=data

      })
  }

  

  checkDateFin(){
    this.DateFinisOK=false
    var date1=new Date(this.dateDeb)
    var date2=new Date(this.dateFin)
    if (this.dateDeb!=null && date2>=date1){
      this.DateFinisOK=true
      this.checkAllInput();
    }
    console.log(this.DateFinisOK)
  }

  checkDateDeb(){
    this.DateDebisOK=false
    var today = new Date();
    console.log(today);
    var date=new Date(this.dateDeb)
    if (date>=today){
      this.DateDebisOK=true
      this.checkAllInput();
    }
    console.log(this.DateDebisOK)
  }



  supprimerProduit(){
    if(this.produitSelected!=null){
      this.service.rmProduit(this.produitSelected).subscribe((data:any)  => {
          console.log(data)



      })
    }
    this.produits=null
    this.rechercheProduit();
  }


  checkAllInput(){
    this.allInputisOK=false
    if(this.nomPoduitisOK && this.inputCategname!="" && this.DateDebisOK && this.DateFinisOK && this.inputProdprice>0 && this.inputProdStock>0){
      this.allInputisOK=true
    }

  }


  checkNomProduit(){
    this.nomPoduitisOK=false
    if(this.inputProdname!=""){
    this.service.getCountNameProduct(this.inputProdname).subscribe((data:any)  => {

          if(data[0].count==0){
            this.nomPoduitisOK=true
            this.checkAllInput();

          }
        })

      }
  }
  modifierProduit(){
    this.modifierprod=false;

    if(this.produitSelected!=null){
      console.log(this.produitSelected)
      this.service.getProduitById(this.produitSelected).subscribe((data:any)  => {
          console.log(data)
          this.modifProduit=new Produit(data[0].id,data[0].nom,data[0].categorie)
          this.inputProdname=data[0].nom
          this.inputCategname=data[0].categorie
      })

      this.service.getStock(this.produitSelected).subscribe((data:any)  => {
          console.log(data)
          this.modifStock=new Stock(data[0].id,data[0].dates,data[0].quantite,this.modifProduit);
          this.inputProdStock=data[0].quantite
      })

      this.service.getPrix(this.produitSelected).subscribe((data:any)  => {
          console.log(data)
          this.modifPrix=new Prix(data[0].id,data[0].valeur,data[0].datedeb,data[0].datefin,this.modifProduit)
          console.log(data[0].datedeb,data[0].datefin)
          this.dateDeb=this.changeDate(new Date(String(data[0].datedeb).substring(10, 0)));
          this.dateFin=this.changeDate(new Date(String(data[0].datefin).substring(10, 0)));
          console.log(this.dateDeb)
          console.log(this.dateFin)
          this.inputProdprice=data[0].valeur


      })



    this.modifierprod=true;



    }

  }

  updateProduit(){

    if(this.inputProdStock!=null && Number.isInteger(this.inputProdStock) ){
      var today = new Date();

      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy = today.getFullYear();
      let now = yyyy+ '-' + mm + '-' + dd ;

      let stock=new Stock(null,now,Math.round(this.inputProdStock),this.modifProduit);
      this.service.updateProduitStock(stock).subscribe((data:any)  => {
          console.log(data)
          this.rechercheProduit();
      })
      let prix=new Prix(null,this.inputProdprice,null,null,this.modifProduit);
      this.service.updateProduitPrix(prix).subscribe((data:any)  => {
          console.log(data)
          this.rechercheProduit();
      })
    }



  }

  ajouterProduit(){
    if (this.inputCategname!=null && this.inputCategname!="" && this.inputProdname!=null && this.inputProdname!="" && Number.isInteger(this.inputProdStock)){
      let produit=new Produit(null,this.inputProdname,this.inputCategname);
      this.service.addProduit(produit).subscribe((data:any)  => {
          console.log(data)

          this.allInputisOK=false
          this.rechercheProduit();
        })

        this.delay(1000).then(()=>{
          this.addPrixAndStock();
        })
    }
  }

  changeDate(date:Date){
    var d = Number(String(date.getDate()).padStart(2, '0'));
    d=d+1;
    let dd=String(d);
    if (d<10){
      dd='0'+d;
    }
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return  yyyy+ '-' + mm  + '-' + dd;

  }


  addPrixAndStock(){

    var produit:Produit;
    this.service.getProduct(this.inputProdname).subscribe((data:any)  => {
        console.log(data)
          produit=new Produit(data[0].id,data[0].nom,data[0].categorie)
    })

    this.delay(1000).then(()=>{
      let stock=new Stock(null,this.dateDeb,Math.round(this.inputProdStock),produit);
      let prix=new Prix(null,this.inputProdprice,this.dateDeb,this.dateFin,produit)

      this.service.addStock(stock).subscribe((data:any)  => {
          console.log(data)
      })
      this.service.addPrix(prix).subscribe((data:any)  => {
          console.log(data)
      })
      })


  }


  delay(ms:number) {
    return new Promise( resolve => setTimeout(resolve, ms))
  }

  resetVariables() {
    this.allInputisOK=false
    this.DateDebisOK=false
    this.DateFinisOK=false
    this.nomPoduitisOK=false
    this.modifierprod=false;
  }


}
