import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Download, Upload } from 'lucide-react';
import { Food } from '@/data/foodDatabase';

export const CustomFoodManager = () => {
  const [customFoods, setCustomFoods] = useState<Food[]>([]);
  const [newFood, setNewFood] = useState({
    name: '',
    category: '',
    carbs: '',
    protein: '',
    fat: '',
    kcal: ''
  });

  useEffect(() => {
    loadCustomFoods();
  }, []);

  const loadCustomFoods = () => {
    try {
      const saved = localStorage.getItem('ketoCustomFoods');
      if (saved) {
        setCustomFoods(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading custom foods:', error);
    }
  };

  const saveCustomFoods = (foods: Food[]) => {
    try {
      localStorage.setItem('ketoCustomFoods', JSON.stringify(foods));
      setCustomFoods(foods);
    } catch (error) {
      console.error('Error saving custom foods:', error);
    }
  };

  const addCustomFood = () => {
    const { name, category, carbs, protein, fat, kcal } = newFood;
    
    if (!name.trim() || !category.trim()) {
      alert('Por favor ingresa nombre y categoría del alimento.');
      return;
    }

    const carbsNum = parseFloat(carbs) || 0;
    const proteinNum = parseFloat(protein) || 0;
    const fatNum = parseFloat(fat) || 0;
    const kcalNum = parseFloat(kcal) || Math.round(proteinNum * 4 + carbsNum * 4 + fatNum * 9);

    const food: Food = {
      name: name.trim(),
      category: category.trim(),
      carbs: carbsNum,
      protein: proteinNum,
      fat: fatNum,
      kcal: kcalNum,
      custom: true
    };

    const updatedFoods = [...customFoods, food];
    saveCustomFoods(updatedFoods);

    // Reset form
    setNewFood({
      name: '',
      category: '',
      carbs: '',
      protein: '',
      fat: '',
      kcal: ''
    });
  };

  const removeCustomFood = (index: number) => {
    if (confirm('¿Estás seguro de eliminar este alimento?')) {
      const updatedFoods = customFoods.filter((_, i) => i !== index);
      saveCustomFoods(updatedFoods);
    }
  };

  const exportFoods = () => {
    const dataStr = JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      items: customFoods
    }, null, 2);
    
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `keto360-alimentos-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  const importFoods = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const result = e.target?.result as string;
        const data = JSON.parse(result);
        
        // Handle different formats
        const incomingFoods = Array.isArray(data.items) ? data.items : (Array.isArray(data) ? data : []);
        
        if (!Array.isArray(incomingFoods)) {
          alert('Formato de archivo no reconocido.');
          return;
        }
        
        // Merge foods, avoiding duplicates by name
        const existingNames = new Set(customFoods.map(f => f.name.toLowerCase()));
        const newFoods = incomingFoods.filter((food: any) => 
          food.name && !existingNames.has(food.name.toLowerCase())
        );
        
        const mergedFoods = [...customFoods, ...newFoods];
        saveCustomFoods(mergedFoods);
        
        alert(`✅ Importados ${newFoods.length} alimentos nuevos. Total: ${mergedFoods.length}`);
        
      } catch (error) {
        alert('Error al procesar el archivo. Asegúrate de que sea un archivo JSON válido.');
      }
    };
    
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  };

  const clearAllFoods = () => {
    if (confirm('⚠️ ¿Estás seguro de eliminar TODOS tus alimentos personalizados? Esta acción no se puede deshacer.')) {
      saveCustomFoods([]);
    }
  };

  const categories = [
    'Carnes', 'Pescados', 'Mariscos', 'Huevos', 'Lácteos', 
    'Verduras', 'Grasas', 'Frutos secos', 'Semillas', 
    'Condimentos', 'Bebidas', 'Procesados', 'Otros'
  ];

  return (
    <div className="space-y-6">
      {/* Add New Food Form */}
      <Card>
        <CardHeader>
          <CardTitle>Agregar Nuevo Alimento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="food-name">Nombre del Alimento</Label>
              <Input
                id="food-name"
                placeholder="ej: Aguacate Hass"
                value={newFood.name}
                onChange={(e) => setNewFood(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="food-category">Categoría</Label>
              <Select 
                value={newFood.category} 
                onValueChange={(value) => setNewFood(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="food-carbs">Carbohidratos (g/100g)</Label>
              <Input
                id="food-carbs"
                type="number"
                step="0.1"
                min="0"
                placeholder="0.0"
                value={newFood.carbs}
                onChange={(e) => setNewFood(prev => ({ ...prev, carbs: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="food-protein">Proteínas (g/100g)</Label>
              <Input
                id="food-protein"
                type="number"
                step="0.1"
                min="0"
                placeholder="0.0"
                value={newFood.protein}
                onChange={(e) => setNewFood(prev => ({ ...prev, protein: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="food-fat">Grasas (g/100g)</Label>
              <Input
                id="food-fat"
                type="number"
                step="0.1"
                min="0"
                placeholder="0.0"
                value={newFood.fat}
                onChange={(e) => setNewFood(prev => ({ ...prev, fat: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="food-kcal">Calorías (kcal/100g)</Label>
              <Input
                id="food-kcal"
                type="number"
                step="1"
                min="0"
                placeholder="Auto-calculado"
                value={newFood.kcal}
                onChange={(e) => setNewFood(prev => ({ ...prev, kcal: e.target.value }))}
              />
            </div>
          </div>

          <Button onClick={addCustomFood} className="w-full bg-emerald-500 hover:bg-emerald-600">
            Agregar Alimento
          </Button>
        </CardContent>
      </Card>

      {/* Import/Export */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" onClick={exportFoods} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              ⬇️ Exportar alimentos
            </Button>
            
            <div className="relative">
              <input
                type="file"
                accept=".json"
                onChange={importFoods}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button variant="outline" className="flex items-center gap-2 w-full">
                <Upload className="w-4 h-4" />
                ⬆️ Importar alimentos
              </Button>
            </div>

            <Button 
              variant="destructive" 
              onClick={clearAllFoods}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Borrar mis alimentos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Foods List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🥑 Mis alimentos ({customFoods.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {customFoods.length === 0 ? (
            <p className="text-gray-500 italic text-center py-8">
              Aún no agregas alimentos propios.
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {customFoods.map((food, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{food.name}</div>
                    <div className="text-sm text-gray-600">{food.category}</div>
                    <div className="text-xs text-gray-500">
                      {food.carbs}C / {food.protein}P / {food.fat}G • {food.kcal} kcal/100g
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => removeCustomFood(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};