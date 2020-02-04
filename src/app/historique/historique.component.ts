import { Component, OnInit } from '@angular/core';
import { MagasinService,Produit,Vente,Stock,Produit_vente,Prix,Itempanier,ProduitEnStock} from '../magasin.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  ventes:Array<Vente>
  venteActuel:any
  vente:any
  info:any
  venteSelected:number=0


  constructor(public service: MagasinService) { }

  ngOnInit() {
    this.getVente();
  }

  getVente(){
    this.service.getAllVente().subscribe((data:any)  => {
        console.log(data)
        for (let d of data){
          d.dates=this.changeDate(new Date(String(d.dates).substring(10, 0)));
        }

        this.vente=data;
        console.log(this.vente)

      })
  }

  getInfoVente(){
    console.log(this.venteSelected)
    this.service.getVente(this.venteSelected).subscribe((data:any)  => {
        console.log(data)
        this.info=data;

        this.venteActuel=this.vente.find(item => Number(item.id)===Number(this.venteSelected))



      })
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


}
