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
  // CARNES Y AVES
  { name: "Pollo pechuga", category: "Carnes", carbs: 0, protein: 23, fat: 3.6, kcal: 165 },
  { name: "Pollo muslo", category: "Carnes", carbs: 0, protein: 18, fat: 13, kcal: 209 },
  { name: "Carne molida 80/20", category: "Carnes", carbs: 0, protein: 20, fat: 20, kcal: 254 },
  { name: "Bistec de res", category: "Carnes", carbs: 0, protein: 26, fat: 15, kcal: 250 },
  { name: "Cordero", category: "Carnes", carbs: 0, protein: 25, fat: 21, kcal: 294 },
  { name: "Cerdo chuletas", category: "Carnes", carbs: 0, protein: 22, fat: 14, kcal: 231 },
  { name: "Bacon tocino", category: "Carnes", carbs: 1.4, protein: 37, fat: 42, kcal: 541 },
  { name: "Jamón", category: "Carnes", carbs: 1.5, protein: 18, fat: 5, kcal: 120 },
  { name: "Chorizo", category: "Carnes", carbs: 1, protein: 24, fat: 38, kcal: 455 },
  { name: "Salchicha", category: "Carnes", carbs: 2, protein: 13, fat: 27, kcal: 301 },

  // PESCADOS Y MARISCOS
  { name: "Salmón", category: "Pescados", carbs: 0, protein: 25, fat: 14, kcal: 231 },
  { name: "Atún", category: "Pescados", carbs: 0, protein: 30, fat: 1, kcal: 132 },
  { name: "Sardinas", category: "Pescados", carbs: 0, protein: 25, fat: 11, kcal: 208 },
  { name: "Caballa", category: "Pescados", carbs: 0, protein: 19, fat: 14, kcal: 205 },
  { name: "Bacalao", category: "Pescados", carbs: 0, protein: 18, fat: 0.7, kcal: 82 },
  { name: "Camarones", category: "Mariscos", carbs: 0.9, protein: 18, fat: 0.3, kcal: 85 },
  { name: "Cangrejo", category: "Mariscos", carbs: 0, protein: 18, fat: 1.3, kcal: 87 },
  { name: "Mejillones", category: "Mariscos", carbs: 7, protein: 18, fat: 2, kcal: 86 },

  // HUEVOS Y LÁCTEOS
  { name: "Huevo entero", category: "Huevos", carbs: 0.6, protein: 13, fat: 11, kcal: 155 },
  { name: "Clara de huevo", category: "Huevos", carbs: 0.7, protein: 11, fat: 0.2, kcal: 52 },
  { name: "Queso cheddar", category: "Lácteos", carbs: 1.3, protein: 25, fat: 33, kcal: 403 },
  { name: "Queso mozzarella", category: "Lácteos", carbs: 2.2, protein: 22, fat: 22, kcal: 300 },
  { name: "Queso parmesano", category: "Lácteos", carbs: 4.1, protein: 36, fat: 26, kcal: 392 },
  { name: "Queso crema", category: "Lácteos", carbs: 4, protein: 6, fat: 34, kcal: 342 },
  { name: "Mantequilla", category: "Grasas", carbs: 0.1, protein: 0.9, fat: 81, kcal: 717 },
  { name: "Crema batida", category: "Lácteos", carbs: 3, protein: 2.1, fat: 37, kcal: 345 },

  // VERDURAS BAJAS EN CARBOS
  { name: "Espinaca", category: "Verduras", carbs: 3.6, protein: 2.9, fat: 0.4, kcal: 23 },
  { name: "Lechuga", category: "Verduras", carbs: 2.9, protein: 1.4, fat: 0.2, kcal: 15 },
  { name: "Brócoli", category: "Verduras", carbs: 7, protein: 3, fat: 0.4, kcal: 34 },
  { name: "Coliflor", category: "Verduras", carbs: 5, protein: 1.9, fat: 0.3, kcal: 25 },
  { name: "Apio", category: "Verduras", carbs: 3, protein: 0.7, fat: 0.2, kcal: 16 },
  { name: "Pepino", category: "Verduras", carbs: 3.6, protein: 0.7, fat: 0.1, kcal: 16 },
  { name: "Rábano", category: "Verduras", carbs: 2, protein: 0.7, fat: 0.1, kcal: 16 },
  { name: "Espárragos", category: "Verduras", carbs: 3.9, protein: 2.2, fat: 0.1, kcal: 20 },
  { name: "Calabacín", category: "Verduras", carbs: 3.1, protein: 1.2, fat: 0.3, kcal: 17 },
  { name: "Berza", category: "Verduras", carbs: 10, protein: 3.3, fat: 0.7, kcal: 35 },
  { name: "Col rizada", category: "Verduras", carbs: 9, protein: 4.3, fat: 0.9, kcal: 49 },
  { name: "Repollo", category: "Verduras", carbs: 6, protein: 1.3, fat: 0.1, kcal: 25 },

  // GRASAS SALUDABLES
  { name: "Aguacate", category: "Grasas", carbs: 9, protein: 2, fat: 15, kcal: 160 },
  { name: "Aceite de oliva", category: "Grasas", carbs: 0, protein: 0, fat: 100, kcal: 884 },
  { name: "Aceite de coco", category: "Grasas", carbs: 0, protein: 0, fat: 99, kcal: 862 },
  { name: "Aceite de aguacate", category: "Grasas", carbs: 0, protein: 0, fat: 100, kcal: 884 },
  { name: "Aceitunas verdes", category: "Grasas", carbs: 4, protein: 0.8, fat: 11, kcal: 115 },
  { name: "Aceitunas negras", category: "Grasas", carbs: 6, protein: 0.8, fat: 11, kcal: 115 },

  // FRUTOS SECOS Y SEMILLAS
  { name: "Almendras", category: "Frutos secos", carbs: 22, protein: 21, fat: 50, kcal: 579 },
  { name: "Nueces", category: "Frutos secos", carbs: 14, protein: 15, fat: 65, kcal: 654 },
  { name: "Macadamias", category: "Frutos secos", carbs: 14, protein: 8, fat: 76, kcal: 718 },
  { name: "Pecanas", category: "Frutos secos", carbs: 14, protein: 9, fat: 72, kcal: 691 },
  { name: "Semillas de chía", category: "Semillas", carbs: 42, protein: 17, fat: 31, kcal: 486 },
  { name: "Semillas de lino", category: "Semillas", carbs: 29, protein: 18, fat: 42, kcal: 534 },
  { name: "Semillas de girasol", category: "Semillas", carbs: 20, protein: 21, fat: 52, kcal: 584 },
  { name: "Semillas de calabaza", category: "Semillas", carbs: 11, protein: 19, fat: 19, kcal: 559 },

  // CONDIMENTOS Y ESPECIAS KETO
  { name: "Sal", category: "Condimentos", carbs: 0, protein: 0, fat: 0, kcal: 0 },
  { name: "Pimienta negra", category: "Condimentos", carbs: 64, protein: 11, fat: 3, kcal: 251 },
  { name: "Ajo en polvo", category: "Condimentos", carbs: 73, protein: 17, fat: 1, kcal: 331 },
  { name: "Orégano", category: "Condimentos", carbs: 69, protein: 9, fat: 4, kcal: 265 },
  { name: "Albahaca", category: "Condimentos", carbs: 2.6, protein: 3.2, fat: 0.6, kcal: 22 },
  { name: "Cilantro", category: "Condimentos", carbs: 3.7, protein: 2.1, fat: 0.5, kcal: 23 },

  // BEBIDAS KETO
  { name: "Agua", category: "Bebidas", carbs: 0, protein: 0, fat: 0, kcal: 0 },
  { name: "Café negro", category: "Bebidas", carbs: 0, protein: 0.3, fat: 0, kcal: 2 },
  { name: "Té verde", category: "Bebidas", carbs: 0, protein: 0, fat: 0, kcal: 1 },
  { name: "Caldo de hueso", category: "Bebidas", carbs: 0, protein: 6, fat: 2, kcal: 40 },

  // PRODUCTOS PROCESADOS KETO
  { name: "Mantequilla de almendra", category: "Procesados", carbs: 19, protein: 21, fat: 56, kcal: 614 },
  { name: "Mantequilla de maní natural", category: "Procesados", carbs: 16, protein: 25, fat: 50, kcal: 588 },
  { name: "Vinagre de manzana", category: "Condimentos", carbs: 0.9, protein: 0, fat: 0, kcal: 22 }
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