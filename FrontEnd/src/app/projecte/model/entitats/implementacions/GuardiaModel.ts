export class GuardiaModel{
    id: string;
    categoria: string;
    unitat: string;
    torn: string;
    numeroPlaces: string;
    estat: string;
    idGuardiaModelTreballador: string;

    constructor(id: string, categoria: string, unitat: string, torn: string,  numeroPlaces: string, estat: string, idGuardiaModelTreballador: string) {
        this.id = id;
        this.categoria = categoria;
        this.unitat = unitat;
        this.torn = torn;
        this.numeroPlaces = numeroPlaces;
        this.estat = estat;
        this.idGuardiaModelTreballador = idGuardiaModelTreballador;
    }
} 