export class Guardia{
    id: string;
    dia: string;
    categoria: string;
    estat: string;
    torn: string;
    unitat: string;

    constructor(id: string, dia: string, categoria: string, estat: string, torn: string, unitat: string) {
        this.id = id;
        this.dia = dia;
        this.categoria = categoria;
        this.estat = estat;
        this.torn = torn;
        this.unitat = unitat;
    }
} 