export type Account = {
  id: string;
  name: string;
  balance: number;
}

export type TransactionType = "income" | "expense";

export enum Categories {
  SUPERMERCADO = "Supermercado",
  RESTAURANTE = "Restaurante",
  TRANSPORTE = "Transporte",
  LIMPEZA = "Limpeza",
  ELECTRONICOS = "Electronicos",
  MASCOTAS = "Mascotas",
  RECREACION = "Recreacion",
  ROPA = "Ropa",
  SALUD = "Salud",
  SERVICIO = "Servicio",
  VIAJE = "Viaje",
  VIVIENTE = "Vivienda",
  HORMIGA = "Hormiga",
  CARIDAD = "Caridad",
  OTROS = "Otros",
}

export type Transaction = {
  id: string;
  type: TransactionType;
  accountId: string;
  amount: number;
  description: string;
  date: Date;
  category: Categories;
}