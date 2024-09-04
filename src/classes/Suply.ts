import { SupplyType } from "@/types";

export class Supply {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _unit: string;

  constructor(supply: SupplyType) {
    this._id = supply.id;
    this._name = supply.name;
    this._price = supply.price;
    this._quantity = supply.quantity;
    this._unit = supply.unit;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get quantity(): number {
    return this._quantity;
  }

  public get unit(): string {
    return this._unit;
  }

  public get unitPrice(): number {
    return this._price / this._quantity;
  }
}
