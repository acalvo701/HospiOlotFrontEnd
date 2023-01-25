export class GuardiaModel{
    id: string;
    categoria: string;
    unitat: string;
    torn: string;
    numeroPlaces: string;
    estat: string;

    constructor(id: string, categoria: string, unitat: string, torn: string,  numeroPlaces: string, estat: string) {
        this.id = id;
        this.categoria = categoria;
        this.unitat = unitat;
        this.torn = torn;
        this.numeroPlaces = numeroPlaces;
        this.estat = estat;

    }
} 