export interface Food {
  name: string;
  category: string;
  carbs: number;
  protein: number;
  fat: number;
  kcal?: number;
  custom?: boolean;
}

export const ketoFoodDatabase: Food[] = [
  // CARNES Y AVES - RES
  { name: "Carne Molida 80 20", category: "Proteínas - Res", carbs: 0.0, protein: 17.0, fat: 20.0, kcal: 248 },
  { name: "Lomo Solomillo De Res", category: "Proteínas - Res", carbs: 0.0, protein: 26.0, fat: 12.0, kcal: 212 },
  { name: "Bife Ancho", category: "Proteínas - Res", carbs: 0.0, protein: 24.0, fat: 19.0, kcal: 267 },
  { name: "Asado De Tira", category: "Proteínas - Res", carbs: 0.0, protein: 17.0, fat: 25.0, kcal: 293 },
  { name: "Falda Entraña", category: "Proteínas - Res", carbs: 0.0, protein: 22.0, fat: 17.0, kcal: 241 },
  { name: "Hígado De Res", category: "Proteínas - Res", carbs: 3.9, protein: 20.4, fat: 3.6, kcal: 130 },
  { name: "Lengua De Res", category: "Proteínas - Res", carbs: 0.0, protein: 18.0, fat: 16.0, kcal: 216 },
  { name: "Corazón De Res", category: "Proteínas - Res", carbs: 0.0, protein: 28.0, fat: 5.0, kcal: 157 },
  { name: "Roast Beef", category: "Proteínas - Res", carbs: 2.0, protein: 23.0, fat: 5.0, kcal: 145 },

  // CARNES - CERDO
  { name: "Lomo De Cerdo", category: "Proteínas - Cerdo", carbs: 0.0, protein: 27.0, fat: 14.0, kcal: 234 },
  { name: "Chuleta De Cerdo", category: "Proteínas - Cerdo", carbs: 0.0, protein: 24.0, fat: 14.0, kcal: 222 },
  { name: "Costillas De Cerdo", category: "Proteínas - Cerdo", carbs: 0.0, protein: 16.0, fat: 28.0, kcal: 316 },
  { name: "Tocino/Panceta", category: "Proteínas - Cerdo", carbs: 1.0, protein: 37.0, fat: 42.0, kcal: 530 },
  { name: "Jamón Serrano Prosciutto", category: "Proteínas - Cerdo", carbs: 0.0, protein: 31.0, fat: 12.0, kcal: 232 },
  { name: "Lomo Embuchado", category: "Proteínas - Cerdo", carbs: 1.0, protein: 25.0, fat: 17.0, kcal: 257 },
  { name: "Chistorra", category: "Proteínas - Cerdo", carbs: 0.8, protein: 14.3, fat: 30.7, kcal: 337 },

  // AVES
  { name: "Pechuga De Pollo", category: "Proteínas - Ave", carbs: 0.0, protein: 31.0, fat: 3.6, kcal: 156 },
  { name: "Muslo De Pollo", category: "Proteínas - Ave", carbs: 0.0, protein: 26.0, fat: 11.0, kcal: 203 },
  { name: "Pollo", category: "Proteínas - Ave", carbs: 0.0, protein: 26.0, fat: 10.0, kcal: 194 },
  { name: "Alitas De Pollo", category: "Proteínas - Ave", carbs: 0.0, protein: 20.0, fat: 12.0, kcal: 188 },
  { name: "Pavo Molido 85 15", category: "Proteínas - Ave", carbs: 0.0, protein: 27.0, fat: 11.0, kcal: 207 },
  { name: "Muslo De Pavo", category: "Proteínas - Ave", carbs: 0.0, protein: 28.0, fat: 10.0, kcal: 202 },
  { name: "Pechuga De Pavo", category: "Proteínas - Ave", carbs: 3.3, protein: 20.0, fat: 1.2, kcal: 104 },

  // PESCADOS
  { name: "Salmón", category: "Proteínas - Pescado", carbs: 0.0, protein: 20.0, fat: 13.0, kcal: 197 },
  { name: "Trucha", category: "Proteínas - Pescado", carbs: 0.0, protein: 26.0, fat: 8.0, kcal: 176 },
  { name: "Atún Fresco", category: "Proteínas - Pescado", carbs: 0.0, protein: 29.0, fat: 0.6, kcal: 121 },
  { name: "Atún En Agua", category: "Proteínas - Pescado", carbs: 0.0, protein: 25.0, fat: 1.0, kcal: 109 },
  { name: "Sardinas en Aceite", category: "Proteínas - Pescado", carbs: 0.0, protein: 25.0, fat: 11.0, kcal: 199 },
  { name: "Caballa", category: "Proteínas - Pescado", carbs: 0.0, protein: 19.0, fat: 13.9, kcal: 201 },
  { name: "Bacalao", category: "Proteínas - Pescado", carbs: 0.0, protein: 18.0, fat: 0.7, kcal: 78 },
  { name: "Merluza", category: "Proteínas - Pescado", carbs: 0.0, protein: 19.0, fat: 1.0, kcal: 85 },
  { name: "Corvina", category: "Proteínas - Pescado", carbs: 0.0, protein: 19.0, fat: 1.0, kcal: 85 },
  { name: "Anchoas en Aceite", category: "Proteínas - Pescado", carbs: 0.0, protein: 29.0, fat: 15.0, kcal: 251 },
  { name: "Pescado Blanco", category: "Proteínas - Pescado", carbs: 0.0, protein: 20.0, fat: 1.0, kcal: 89 },

  // MARISCOS
  { name: "Camarones", category: "Proteínas - Mariscos", carbs: 0.2, protein: 24.0, fat: 0.3, kcal: 100 },
  { name: "Camarones Grandes", category: "Proteínas - Mariscos", carbs: 0.2, protein: 24.0, fat: 0.3, kcal: 100 },
  { name: "Gambas Cocidas", category: "Proteínas - Mariscos", carbs: 0.2, protein: 24.0, fat: 0.3, kcal: 100 },
  { name: "Calamar", category: "Proteínas - Mariscos", carbs: 4.0, protein: 15.0, fat: 7.5, kcal: 144 },
  { name: "Pulpo", category: "Proteínas - Mariscos", carbs: 4.4, protein: 29.0, fat: 2.1, kcal: 152 },
  { name: "Mejillones", category: "Proteínas - Mariscos", carbs: 7.4, protein: 24.0, fat: 4.5, kcal: 166 },
  { name: "Ostiones Vieiras", category: "Proteínas - Mariscos", carbs: 5.4, protein: 20.5, fat: 0.8, kcal: 111 },
  { name: "Huevas De Pescado", category: "Proteínas - Mariscos", carbs: 4.0, protein: 25.0, fat: 18.0, kcal: 278 },

  // HUEVOS
  { name: "Huevo De Gallina", category: "Huevos", carbs: 1.1, protein: 12.6, fat: 10.6, kcal: 150 },
  { name: "Huevo De Codorniz", category: "Huevos", carbs: 0.4, protein: 13.1, fat: 11.1, kcal: 154 },

  // QUESOS
  { name: "Queso Cheddar", category: "Quesos", carbs: 1.3, protein: 25.0, fat: 33.0, kcal: 402 },
  { name: "Queso Mozzarella", category: "Quesos", carbs: 2.2, protein: 22.0, fat: 22.0, kcal: 295 },
  { name: "Queso Parmesano", category: "Quesos", carbs: 4.1, protein: 38.0, fat: 29.0, kcal: 429 },
  { name: "Queso Gouda", category: "Quesos", carbs: 2.2, protein: 25.0, fat: 27.0, kcal: 352 },
  { name: "Queso Brie", category: "Quesos", carbs: 0.5, protein: 21.0, fat: 28.0, kcal: 338 },
  { name: "Queso Camembert", category: "Quesos", carbs: 0.5, protein: 19.0, fat: 24.0, kcal: 294 },
  { name: "Queso Azul", category: "Quesos", carbs: 2.3, protein: 21.0, fat: 28.0, kcal: 345 },
  { name: "Queso Feta", category: "Quesos", carbs: 4.0, protein: 14.0, fat: 21.0, kcal: 261 },
  { name: "Ricotta Entera", category: "Quesos", carbs: 3.0, protein: 11.0, fat: 13.0, kcal: 173 },
  { name: "Queso Cottage Entero", category: "Quesos", carbs: 3.4, protein: 11.1, fat: 4.3, kcal: 97 },
  { name: "Queso Cottage", category: "Quesos", carbs: 3.4, protein: 11.1, fat: 4.3, kcal: 97 },
  { name: "Queso Crema", category: "Quesos", carbs: 4.0, protein: 6.0, fat: 34.0, kcal: 346 },
  { name: "Provolone", category: "Quesos", carbs: 2.1, protein: 26.0, fat: 27.0, kcal: 355 },
  { name: "Queso Provolone", category: "Quesos", carbs: 2.1, protein: 25.6, fat: 25.4, kcal: 339 },
  { name: "Manchego", category: "Quesos", carbs: 0.0, protein: 25.0, fat: 32.0, kcal: 388 },
  { name: "Queso Manchego", category: "Quesos", carbs: 0.1, protein: 25.0, fat: 32.5, kcal: 393 },
  { name: "Halloumi", category: "Quesos", carbs: 3.2, protein: 22.0, fat: 26.0, kcal: 335 },
  { name: "Queso De Cabra", category: "Quesos", carbs: 2.0, protein: 22.0, fat: 30.0, kcal: 366 },

  // LÁCTEOS GRASOS
  { name: "Mantequilla", category: "Lácteos grasos", carbs: 0.1, protein: 0.85, fat: 81.0, kcal: 733 },
  { name: "Mantequilla Manteca", category: "Lácteos grasos", carbs: 0.5, protein: 0.5, fat: 81.0, kcal: 733 },
  { name: "Ghee", category: "Lácteos grasos", carbs: 0.0, protein: 0.0, fat: 100.0, kcal: 900 },
  { name: "Crema De Leche 36", category: "Lácteos grasos", carbs: 2.9, protein: 2.1, fat: 36.0, kcal: 344 },
  { name: "Crema De Leche", category: "Lácteos grasos", carbs: 3.0, protein: 2.0, fat: 37.0, kcal: 353 },
  { name: "Crema Agria", category: "Lácteos grasos", carbs: 4.6, protein: 2.4, fat: 20.0, kcal: 208 },
  { name: "Crema Batida Sin Azúcar", category: "Lácteos", carbs: 3.6, protein: 3.2, fat: 36.1, kcal: 352 },

  // LÁCTEOS
  { name: "Yogur Griego Entero Sin Azúcar", category: "Lácteos", carbs: 3.6, protein: 9.0, fat: 10.0, kcal: 140 },
  { name: "Yogur Griego Natural", category: "Lácteos", carbs: 3.6, protein: 9.0, fat: 10.0, kcal: 140 },

  // LÁCTEOS ALTERNATIVOS
  { name: "Leche De Almendras", category: "Lácteos/alternativas", carbs: 0.6, protein: 0.5, fat: 1.3, kcal: 16 },
  { name: "Leche De Almendras Sin Azúcar", category: "Lácteos", carbs: 0.6, protein: 0.5, fat: 1.1, kcal: 14 },
  { name: "Leche De Coco", category: "Lácteos/alternativas", carbs: 3.3, protein: 2.3, fat: 24.0, kcal: 238 },

  // VEGETALES - HOJAS VERDES
  { name: "Espinaca", category: "Vegetales - Hojas", carbs: 1.4, protein: 2.9, fat: 0.4, kcal: 21 },
  { name: "Lechuga Romana", category: "Vegetales - Hojas", carbs: 2.0, protein: 1.2, fat: 0.3, kcal: 16 },
  { name: "Lechuga Iceberg", category: "Vegetales - Hojas", carbs: 1.8, protein: 0.9, fat: 0.1, kcal: 12 },
  { name: "Acelga", category: "Vegetales - Hojas", carbs: 1.8, protein: 1.8, fat: 0.2, kcal: 16 },
  { name: "Rúcula", category: "Vegetales - Hojas", carbs: 2.1, protein: 2.6, fat: 0.7, kcal: 25 },
  { name: "Kale", category: "Vegetales - Hojas", carbs: 4.4, protein: 4.3, fat: 0.9, kcal: 43 },
  { name: "Berro", category: "Vegetales - Hojas", carbs: 0.8, protein: 2.3, fat: 0.1, kcal: 13 },

  // VEGETALES - CRUCÍFEROS
  { name: "Brócoli", category: "Vegetales - Crucíferos", carbs: 4.0, protein: 2.8, fat: 0.4, kcal: 31 },
  { name: "Coliflor", category: "Vegetales - Crucíferos", carbs: 3.0, protein: 2.0, fat: 0.3, kcal: 23 },
  { name: "Coles De Bruselas", category: "Vegetales - Crucíferos", carbs: 5.2, protein: 3.4, fat: 0.3, kcal: 37 },
  { name: "Repollo Verde", category: "Vegetales - Crucíferos", carbs: 3.3, protein: 1.3, fat: 0.1, kcal: 19 },
  { name: "Repollo Morado", category: "Vegetales - Crucíferos", carbs: 4.2, protein: 1.4, fat: 0.2, kcal: 24 },

  // VEGETALES VARIOS
  { name: "Calabacin", category: "Vegetales", carbs: 2.1, protein: 1.2, fat: 0.3, kcal: 16 },
  { name: "Zucchini Zapallito Italiano", category: "Vegetales", carbs: 2.1, protein: 1.2, fat: 0.3, kcal: 16 },
  { name: "Pepino", category: "Vegetales", carbs: 2.2, protein: 0.7, fat: 0.1, kcal: 13 },
  { name: "Apio", category: "Vegetales", carbs: 1.4, protein: 0.7, fat: 0.2, kcal: 10 },
  { name: "Pimiento rojo", category: "Vegetales", carbs: 4.6, protein: 1.0, fat: 0.3, kcal: 25 },
  { name: "Pimiento Morrón Rojo", category: "Vegetales", carbs: 4.6, protein: 1.0, fat: 0.3, kcal: 25 },
  { name: "Pimiento Verde", category: "Vegetales", carbs: 2.9, protein: 0.9, fat: 0.2, kcal: 17 },
  { name: "Pimiento Morrón", category: "Verduras", carbs: 4.0, protein: 1.0, fat: 0.3, kcal: 23 },
  { name: "Champiñones Blancos", category: "Vegetales", carbs: 2.1, protein: 3.1, fat: 0.3, kcal: 24 },
  { name: "Portobello", category: "Vegetales", carbs: 3.9, protein: 2.1, fat: 0.3, kcal: 27 },
  { name: "Hongos De Pino", category: "Vegetales", carbs: 2.3, protein: 2.0, fat: 0.5, kcal: 22 },
  { name: "Espárragos", category: "Vegetales", carbs: 1.8, protein: 2.2, fat: 0.1, kcal: 17 },
  { name: "Berenjena", category: "Vegetales", carbs: 3.2, protein: 1.0, fat: 0.2, kcal: 19 },
  { name: "Tomate", category: "Vegetales", carbs: 2.7, protein: 0.9, fat: 0.2, kcal: 16 },
  { name: "Tomate Cherry", category: "Vegetales", carbs: 2.7, protein: 0.9, fat: 0.2, kcal: 16 },
  { name: "Cebolla", category: "Vegetales", carbs: 7.6, protein: 1.1, fat: 0.1, kcal: 36 },
  { name: "Ajo", category: "Vegetales", carbs: 30.8, protein: 6.4, fat: 0.5, kcal: 153 },
  { name: "Vainitas Ejotes", category: "Vegetales", carbs: 4.7, protein: 1.8, fat: 0.1, kcal: 27 },
  { name: "Chile Jalapeno", category: "Vegetales", carbs: 3.7, protein: 0.9, fat: 0.4, kcal: 22 },
  { name: "Chile Serrano", category: "Vegetales", carbs: 3.9, protein: 1.7, fat: 0.5, kcal: 27 },

  // GRASAS Y ACEITES
  { name: "Aceite De Oliva", category: "Grasas y Aceites", carbs: 0.0, protein: 0.0, fat: 100.0, kcal: 900 },
  { name: "Aceite De Aguacate", category: "Grasas y Aceites", carbs: 0.0, protein: 0.0, fat: 100.0, kcal: 900 },
  { name: "Aceite De Coco", category: "Grasas y Aceites", carbs: 0.0, protein: 0.0, fat: 100.0, kcal: 900 },

  // NUECES Y SEMILLAS
  { name: "Almendras", category: "Nueces y Semillas", carbs: 9.1, protein: 21.0, fat: 50.0, kcal: 570 },
  { name: "Nueces", category: "Nueces y Semillas", carbs: 7.0, protein: 15.0, fat: 65.0, kcal: 673 },
  { name: "Pecanas", category: "Nueces y Semillas", carbs: 4.3, protein: 9.0, fat: 72.0, kcal: 701 },
  { name: "Macadamia", category: "Nueces y Semillas", carbs: 5.2, protein: 8.0, fat: 76.0, kcal: 737 },
  { name: "Avellanas", category: "Nueces y Semillas", carbs: 7.0, protein: 15.0, fat: 61.0, kcal: 637 },
  { name: "Semillas De Chía", category: "Nueces y Semillas", carbs: 7.7, protein: 17.0, fat: 31.0, kcal: 378 },
  { name: "Semillas De Lino", category: "Nueces y Semillas", carbs: 1.6, protein: 18.0, fat: 42.0, kcal: 456 },
  { name: "Semillas De Lino Linaza", category: "Nueces y Semillas", carbs: 1.6, protein: 18.0, fat: 42.0, kcal: 456 },
  { name: "Coco Rallado Sin Azúcar", category: "Nueces y Semillas", carbs: 6.2, protein: 7.0, fat: 65.0, kcal: 638 },

  // UNTABLES
  { name: "Mantequilla De Almendra", category: "Untables", carbs: 6.1, protein: 21.0, fat: 55.0, kcal: 603 },
  { name: "Mantequilla De Mani", category: "Untables", carbs: 8.0, protein: 25.0, fat: 50.0, kcal: 582 },

  // HARINAS KETO
  { name: "Harina De Almendra", category: "Harinas Keto", carbs: 6.1, protein: 21.0, fat: 53.0, kcal: 585 },
  { name: "Harina De Coco", category: "Harinas Keto", carbs: 18.0, protein: 20.0, fat: 14.0, kcal: 278 },

  // FRUTAS KETO
  { name: "Aguacate", category: "Frutas Keto", carbs: 2.0, protein: 2.0, fat: 15.0, kcal: 151 },
  { name: "Palta Aguacate", category: "Frutas Keto", carbs: 2.0, protein: 2.0, fat: 15.0, kcal: 151 },

  // FRUTAS (MODERADAS)
  { name: "Frutillas Fresas", category: "Frutas (porción moderada)", carbs: 5.5, protein: 0.7, fat: 0.3, kcal: 28 },
  { name: "Frambuesas", category: "Frutas (porción moderada)", carbs: 5.4, protein: 1.2, fat: 0.7, kcal: 33 },
  { name: "Arándanos", category: "Frutas (porción moderada)", carbs: 9.1, protein: 0.7, fat: 0.3, kcal: 42 },

  // SNACKS Y ENCURTIDOS
  { name: "Aceitunas verdes", category: "Snacks/encurtidos", carbs: 3.8, protein: 1.0, fat: 15.3, kcal: 157 },
  { name: "Aceitunas negras", category: "Snacks/encurtidos", carbs: 6.3, protein: 0.8, fat: 15.0, kcal: 163 },
  { name: "Chicharrón", category: "Snacks keto", carbs: 0.0, protein: 27.0, fat: 47.6, kcal: 536 },

  // DULCES BAJOS EN AZÚCAR
  { name: "Chocolate 85 Cacao", category: "Dulces bajos en azúcar", carbs: 12.0, protein: 9.0, fat: 52.0, kcal: 552 },
  { name: "Cacao En Polvo Sin Azúcar", category: "Dulces bajos en azúcar", carbs: 12.4, protein: 19.6, fat: 13.7, kcal: 251 },

  // ESPECIAS
  { name: "Canela En Polvo", category: "Especias", carbs: 26.3, protein: 4.0, fat: 1.2, kcal: 132 },
  { name: "Eneldo", category: "Especias", carbs: 3.3, protein: 3.5, fat: 1.1, kcal: 37 },
  { name: "Orégano Seco", category: "Especias", carbs: 26.4, protein: 9.0, fat: 4.3, kcal: 180 },
  { name: "Perejil Fresco", category: "Especias", carbs: 3.0, protein: 3.0, fat: 0.5, kcal: 28 },

  // BEBIDAS
  { name: "Té Verde", category: "Bebidas", carbs: 0.0, protein: 0.0, fat: 0.0, kcal: 0 },

  // PROTEÍNAS VEGETALES
  { name: "Tofu Firme", category: "Proteínas vegetales", carbs: 3.0, protein: 15.8, fat: 8.7, kcal: 154 }
];

// Function to get all foods (default + custom)
export const getAllFoods = (): Food[] => {
  try {
    const customFoods = JSON.parse(localStorage.getItem('ketoCustomFoods') || '[]') as Food[];
    return [
      ...ketoFoodDatabase,
      ...customFoods.map(food => ({ ...food, custom: true }))
    ];
  } catch (error) {
    console.error('Error loading custom foods:', error);
    return ketoFoodDatabase;
  }
};

// Function to search foods
export const searchFoods = (query: string): Food[] => {
  const allFoods = getAllFoods();
  const searchTerm = query.toLowerCase().trim();
  
  if (!searchTerm) return [];
  
  return allFoods.filter(food => 
    food.name.toLowerCase().includes(searchTerm) ||
    food.category.toLowerCase().includes(searchTerm)
  ).slice(0, 20); // Limit to 20 results for performance
};