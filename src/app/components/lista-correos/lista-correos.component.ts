import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs'

interface Correo {
  asunto: String;
  emisor: String;
  receptor: String;
  cuerpo: String;
  leido: Boolean;
  enviado: Date;
  id?: String;
}

@Component({
  selector: 'app-lista-correos',
  templateUrl: './lista-correos.component.html',
  styleUrls: ['./lista-correos.component.scss']
})
export class ListaCorreosComponent implements OnInit {

  correosCollection: AngularFirestoreCollection<Correo>;
  correos$: Observable<Correo[]>;
  correos = [];

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.correosCollection = this.afs.collection('correos', ref => {
      return ref.orderBy('enviado', 'desc');
    });
    this.correos$ = this.correosCollection.valueChanges();
    
    this.correos$.forEach((correo) => {
      this.correos = correo;
    })

    console.log(this.correos);
    
    
  }

}
