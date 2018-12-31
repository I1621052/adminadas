export class Reserva {
    constructor(
        public dni?: string,
        public nombre?: string,
        public apellidos?: string,
        public numero?: number,
        public fechainicio?: Date,
        public fechafin?: Date,
        public precio?: number,
        public total?: number,
        public usuario?: string,
        public hbitacion?: string,
        public servicio?:string,
        public _id?: string
    ) { }
}