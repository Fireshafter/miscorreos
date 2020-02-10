import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs'
import { Correo as CorreoInterface } from 'src/app/interfaces/correo'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-correo',
  templateUrl: './correo.component.html',
  styleUrls: ['./correo.component.scss']
})
export class CorreoComponent implements OnInit {

  correoDocument: AngularFirestoreDocument<CorreoInterface>;
  correo$: Observable<CorreoInterface>;
  correoid: any;

  constructor(private afs: AngularFirestore, private route:ActivatedRoute) { }

  ngOnInit() {
    this.correoid = this.route.snapshot.paramMap.get('correo');
    this.correoDocument = this.afs.doc<CorreoInterface>(`correos/${this.correoid}`);
    this.correoDocument.update({leido: true});
    this.correo$ = this.afs.collection('correos').doc(this.correoid).valueChanges();    
  }

}
