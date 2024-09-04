import { Supply } from "@/classes";
import { SupplyType } from "@/types";

// const { VITE_GO_BASE_URL } = import.meta.env;
// const ACCOUNTS_URL = `${VITE_GO_BASE_URL}/supplies`;

export class SupplyService {
  public static async getSupplies(): Promise<Supply[]> {
    try {
      // const response = await fetch(ACCOUNTS_URL);
      // const data = await response.json();
      const data = await fetch('./supplies.json');
      const supplies = await data.json() as SupplyType[];
      return Promise.resolve(supplies.map((supply) => new Supply(supply)));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}