import { Ingredient } from "@/types";

export class IngredientObject {
  private _id: string;
  private _name: string;
  private _price: number;
  private _quantity: number;
  private _content: number;
  private _unit: string;

  constructor(ingredient: Ingredient) {
    this._id = ingredient.id;
    this._name = ingredient.name;
    this._price = ingredient.price;
    this._content = ingredient.content;
    this._unit = ingredient.unit;
    this._quantity = ingredient.quantity;
  }

  public get id(): string {
    return this._id;
  }

  public set id(newId: string) {
    this._id = newId;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get content(): number {
    return this._content;
  }

  public get unit(): string {
    return this._unit;
  }

  public get quantity(): number {
    return this._quantity;
  }
  
  public set price(price: number) {
    this._price = price;
  }

  public get unitPrice(): number {
    return this._quantity ? this._price / this._quantity : 0;
  }

  public get raw(): Ingredient {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
      unit: this._unit,
      content: this._content,
      quantity: this._quantity,
      unitPrice: this.unitPrice,
    };
  }
}
