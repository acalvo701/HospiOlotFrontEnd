export class GuardiaTreballador {
    idTreballador: string;
    idGuardia: string;
    estat: string;

    constructor(idTreballador: string, idGuardia: string, estat: string) {
        this.idTreballador = idTreballador;
        this.idGuardia = idGuardia;
        this.estat = estat;
    }
} 