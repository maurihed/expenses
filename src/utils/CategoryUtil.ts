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
    case "Despensa":
       return {
        iconName: "cart-shopping",
        color: 'bg-red-700',
        rawColor: '#920B3A'
      };
    case "Cenas":
       return {
        iconName: "burger",
        color: 'bg-green-700',
        rawColor: '#0E793C'
      };
    case "Familia":
       return {
        iconName: "people-roof",
        color: 'bg-blue-700',
        rawColor: '#09AACD'
      };
    case "Gasolina":
       return {
        iconName: "gas-pump",
        color: 'bg-yellow-400',
        rawColor: '#F7B750'
      };
    case "Viajes":
       return {
        iconName: "plane-departure",
        color: 'bg-purple-500',
        rawColor: '#7828C8'
      };
    case "Juegos":
       return {
        iconName: "dice",
        color: 'bg-blue-400',
        rawColor: '#338EF7'
      };
    case "Papeleria":
       return {
        iconName: "file-pen",
        color: 'bg-yellow-600',
        rawColor: '#C4841D'
      };
    case "Pasteleria":
       return {
        iconName: "cake-candles",
        color: 'bg-pink-500',
        rawColor: '#FF4ECD'
      };
    default:
      return {
        iconName: "layer-group",
        color: 'bg-rose-700',
        rawColor: '#be123c'
      };
  }
}

