export class Guardia{
    dia: string;
    categoria: string;
    estat: string;
    torn: string;
    unitat: string;

    constructor(dia: string, categoria: string, estat: string, torn: string, unitat: string) {
        this.dia = dia;
        this.categoria = categoria;
        this.estat = estat;
        this.torn = torn;
        this.unitat = unitat;
    }
} 