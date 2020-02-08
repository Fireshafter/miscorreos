export interface Correo {
    asunto: String;
    emisor: String;
    receptor: String;
    cuerpo: String;
    leido: Boolean;
    enviado: Date;
    id?: String;
}
