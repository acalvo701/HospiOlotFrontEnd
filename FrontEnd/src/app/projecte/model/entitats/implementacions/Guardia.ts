export class Guardia{
    data: string;
    categoria: string;
    status: string;
    torn: string;
    unitat: string;

    constructor(data: string, categoria: string, status: string, torn: string, unitat: string) {
        this.data = data;
        this.categoria = categoria;
        this.status = status;
        this.torn = torn;
        this.unitat = unitat;
    }
} 