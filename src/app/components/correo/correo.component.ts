import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { Correo } from 'src/app/interfaces/correo'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correoDocument: AngularFirestoreDocument<Correo>;
  correo$: Observable<Correo>;
  correoid: any;

  constructor(private afs: AngularFirestore, private route:ActivatedRoute) { }

  ngOnInit() {
    this.correoid = this.route.snapshot.paramMap.get('correo');
    console.log(this.correoid);
    this.correoDocument = this.afs.doc(`correos/${this.correoid}`)
    this.correoDocument.update({leido: true});
  }

}
