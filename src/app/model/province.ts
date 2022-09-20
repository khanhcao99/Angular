import {Country} from "./country";

export interface Province {
  id?: number
  name?: string
  area?: number
  population?: number
  gdp?: number
  description?: string
  country?: Country

}
