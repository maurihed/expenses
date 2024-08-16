import { IconName } from "@fortawesome/fontawesome-svg-core";

export const getCategoryIconName = (category: string): {iconName: IconName, color: string, rawColor: string} => {
  switch (category) {
    case "Supermercado":
      return {
        iconName: "shop",
        color: 'bg-red-700',
        rawColor: '#b91c1c'
      };
    case "Restaurante":
      return {
        iconName: "utensils",
        color: 'bg-orange-600',
        rawColor: '#ea580c'
      };
    case "Transporte":
      return {
        iconName: "car",
        color: 'bg-amber-700',
        rawColor: '#b45309'
      };
    case "Limpeza":
      return {
        iconName: "broom",
        color: 'bg-yellow-500',
        rawColor: '#eab308'
      };
    case "Electronicos":
      return {
        iconName: "plug",
        color: 'bg-lime-600',
        rawColor: '#65a30d'
      };
    case "Mascotas":
      return {
        iconName: "paw",
        color: 'bg-green-700',
        rawColor: '#15803d'
      };
    case "Recreacion":
      return {
        iconName: "joint",
        color: 'bg-green-500',
        rawColor: '#22c55e'
      };
    case "Ropa":
      return {
        iconName: "shirt",
        color: 'bg-emerald-600',
        rawColor: '#059669'
      };
    case "Salud":
      return {
        iconName: "heart",
        color: 'bg-cyan-600',
        rawColor: '#0891b2'
      };
    case "Servicio":
      return {
        iconName: "file-contract",
        color: 'bg-sky-600',
        rawColor: '#0284c7'
      };
    case "Viaje":
      return {
        iconName: "plane",
        color: 'bg-blue-800',
        rawColor: '#1e40af'
      };
    case "Vivienda":
      return {
        iconName: "house",
        color: 'bg-blue-400',
        rawColor: '#60a5fa'
      };
    case "Hormiga":
      return {
        iconName: "droplet",
        color: 'bg-violet-700',
        rawColor: '#6d28d9'
      };
    case "Caridad":
      return {
        iconName: "hand-holding-heart",
        color: 'bg-purple-600',
        rawColor: '#9333ea'
      };
    case "Otros":
      return {
        iconName: "layer-group",
        color: 'bg-fuchsia-600',
        rawColor: '#c026d3'
      };
    default:
      return {
        iconName: "layer-group",
        color: 'bg-rose-700',
        rawColor: '#be123c'
      };
  }
}
