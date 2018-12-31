export class Reserva {
    constructor(
        public dni?: string,
        public nombre?: string,
        public apellidos?: string,
        public numero?: number,
        public fechainicio?: Date,
        public fechafin?: Date,
        public total?: number,
        public habitacion?: string,
        public servicio?:string,
        public _id?: string
    ) { }
}