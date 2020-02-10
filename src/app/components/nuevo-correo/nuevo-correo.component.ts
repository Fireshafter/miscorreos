import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Correo } from 'src/app/interfaces/correo'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit {

  nuevoCorreo: FormGroup;
  submitted = false;
  @Input() correo: any;
  @Output() cerrar = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private afs:AngularFirestore) { }

  ngOnInit() {

    this.nuevoCorreo = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      cuerpo: ['', [Validators.required]],
      destinatario: ['', [Validators.required, Validators.email]],
    });
    
    if(this.correo != undefined){
      this.formulario['titulo'].setValue(`RE: ${this.correo.asunto}`);
      this.formulario['destinatario'].setValue(this.correo.emisor);      
    }
  }

  get formulario() {return this.nuevoCorreo.controls;}

  async enviar(){
    
    this.submitted = true;
    
    if(this.nuevoCorreo.invalid)
      return;
    
    let data = this.nuevoCorreo.value;
    let id = this.afs.createId();
    
    let correo: Correo = {
      asunto: data.titulo,
      emisor: 'ja.ragnarok@angularfire.dev',
      receptor: data.destinatario,
      cuerpo: data.cuerpo,
      leido: false,
      enviado: new Date()
    }

    await this.afs.doc(`correos/${id}`).set(correo);
    this.close();
  }

  close(){
    this.submitted = false;
    this.nuevoCorreo.reset();
    this.cerrar.emit()
  }

}
