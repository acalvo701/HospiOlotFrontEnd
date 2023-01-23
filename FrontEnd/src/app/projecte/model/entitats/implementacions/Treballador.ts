export class Treballador {
    id: string;
    dni: string;
    nom: string;
    password: string;
    categoria: string;
    estat: string;

    constructor(id: string, dni: string, nom: string, password: string, categoria: string, estat: string) {
        this.id = id;
        this.dni = dni;
        this.nom = nom;
        this.password = password;
        this.categoria = categoria;
        this.estat = estat;
    }
} 