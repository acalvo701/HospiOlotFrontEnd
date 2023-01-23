export class Guardia{
    id: string;
    dia: string;
    categoria: string;
    estat: string;
    torn: string;
    unitat: string;
    numeroPlaces: string;
    personesApuntades: string;

    constructor(id: string, dia: string, categoria: string, estat: string, torn: string, unitat: string, numeroPlaces: string = "", personesApuntades: string = "") {
        this.id = id;
        this.dia = dia;
        this.categoria = categoria;
        this.estat = estat;
        this.torn = torn;
        this.unitat = unitat;
        this.numeroPlaces = numeroPlaces;
        this.personesApuntades = personesApuntades;
    }
} 