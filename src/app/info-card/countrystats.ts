export class CountryDeatils {
    id: number;
    iso: string;
    country: string;
    infected: number| string;
    tested?: number| string;
    recovered: number| string;
    deceased: number| string;
    moreData?: number| string;
    historyData?: number| string;
    sourceUrl: string;
    lastUpdatedApify?: number| string;

   constructor (id: number, iso: string, country: string, infected: string, 
                     recovered: string, deseased: string, sourceUrl: string ){
    this.id = id;
    this.iso = iso;
    this.country = country;
    this.infected = infected;
    this.recovered = recovered;
    this.deceased = deseased;
    this.sourceUrl = sourceUrl;
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