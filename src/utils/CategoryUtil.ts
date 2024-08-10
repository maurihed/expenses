import { IconName } from "@fortawesome/fontawesome-svg-core";

export const getCategoryIconName = (category: string): IconName => {
  switch (category) {
    case "Supermercado":
      return "shop";
    case "Restaurante":
      return "utensils";
    case "Transporte":
      return "car";
    case "Limpeza":
      return "broom";
    case "Electronicos":
      return "plug";
    case "Mascotas":
      return "paw";
    case "Recreacion":
      return "joint";
    case "Ropa":
      return "shirt";
    case "Salud":
      return "heart";
    case "Servicio":
      return "file-contract";
    case "Viaje":
      return "plane";
    case "Vivienda":
      return "house";
    case "Hormiga":
      return "droplet";
    case "Caridad":
      return "hand-holding-heart";
    case "Otros":
      return "layer-group";
    default:
      return "layer-group";
  }
}
