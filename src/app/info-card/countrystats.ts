export class CountryDeatils {
   
    id: number;
    iso: string;
    name: string;
    infected: string;
    recovered: string;
    deseased: string;

   constructor (id: number, iso: string, name: string, infected: string, recovered: string, deseased: string){
    this.id = id;
    this.iso = iso;
    this.name = name;
    this.infected = infected;
    this.recovered = recovered;
    this.deseased = deseased;
   }

}

export interface product {
    id: number;
    iso: string;
    name: string;
    infected: string;
    recovered: string;
    deseased: string;
}