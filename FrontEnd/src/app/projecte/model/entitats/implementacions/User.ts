export class User {
    dni:string
    categoria:string
    nom:string
    id:string

    constructor(jsonToken:any) {
        this.dni = jsonToken.dni;
        this.categoria = jsonToken.categoria;
        this.nom = jsonToken.nom;
        this.id = jsonToken.id;
    }
} 