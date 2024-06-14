import {Equipment} from "./equipment.model";


export interface Company {
  id: number;
  name: string;
  address: string;
  equipments: Equipment[];
}
