export class GuardiaModel{
    id: string;
    categoria: string;
    unitat: string;
    torn: string;
    numeroPlaces: string;
    estat: string;
    idTreballador: string;
    nomEsquema: string;

    constructor(id: string, categoria: string, unitat: string, torn: string,  numeroPlaces: string, estat: string, idTreballador: string, nomEsquema: string) {
        this.id = id;
        this.categoria = categoria;
        this.unitat = unitat;
        this.torn = torn;
        this.numeroPlaces = numeroPlaces;
        this.estat = estat;
        this.idTreballador = idTreballador;
        this.nomEsquema = nomEsquema;

    }
} 