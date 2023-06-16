export class CountryDeatils {
   
    id: number;
    name: string;
    infected: string;
    recovered: string;
    deseased: string;

   constructor (id: number, name: string, infected: string, recovered: string, deseased: string){
    this.id = id;
    this.name = name;
    this.infected = infected;
    this.recovered = recovered;
    this.deseased = deseased;
   }

}

export interface product {
    id: number;
    name: string;
    infected: string;
    recovered: string;
    deseased: string;
}