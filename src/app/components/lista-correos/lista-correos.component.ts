import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { Correo } from '../../interfaces/correo'
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss']
})
export class ListaCorreosComponent implements OnInit {

  correosCollection: AngularFirestoreCollection<Correo>;
  correos$: Observable<Correo[]>;
  correos = [];

  constructor(private afs: AngularFirestore, private router:Router) { }

  ngOnInit() {
    this.correosCollection = this.afs.collection('correos', ref => {
      return ref.orderBy('enviado', 'desc');
    });
    this.correos$ = this.correosCollection.valueChanges({idField: 'id'});
    
    this.correos$.forEach((correo) => {
      this.correos = correo;
      console.log(correo);
      
    })
    

  }

  verDetalle(idcorreo){
    this.router.navigate(['/correo/', {correo: idcorreo}]);
  }

}
