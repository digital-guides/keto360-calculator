import { useState, useEffect } from 'react';
import { searchFoods, Food } from '@/data/foodDatabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Search, AlertTriangle, CheckCircle, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface FoodEntry {
  name: string;
  grams: number;
  carbs: number;
  protein: number;
  fat: number;
  kcal: number;
  meal: string;
}

interface FoodTrackerProps {
  targets: { carbs: number; protein: number; fat: number; calories: number };
}

export const FoodTracker = ({ targets }: FoodTrackerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Food[]>([]);
  const [selectedMeal, setSelectedMeal] = useState('desayuno');
  const [todayMeals, setTodayMeals] = useState<FoodEntry[]>([]);
  const [totals, setTotals] = useState({ carbs: 0, protein: 0, fat: 0, kcal: 0 });
  const [lastAlertState, setLastAlertState] = useState({ carbs: '', protein: '', fat: '' });
  const { toast } = useToast();

  // Load today's meals on component mount
  useEffect(() => {
    loadTodayMeals();
  }, []);

  // Save meals whenever they change
  useEffect(() => {
    saveTodayMeals();
    calculateTotals();
  }, [todayMeals]);

  const loadTodayMeals = () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const saved = localStorage.getItem('ketoDayLog');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.date === today && Array.isArray(data.items)) {
          setTodayMeals(data.items);
        }
      }
    } catch (error) {
      console.error('Error loading meals:', error);
    }
  };

  const saveTodayMeals = () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('ketoDayLog', JSON.stringify({
        date: today,
        items: todayMeals,
        totals
      }));
    } catch (error) {
      console.error('Error saving meals:', error);
    }
  };

  const calculateTotals = () => {
    const newTotals = todayMeals.reduce(
      (acc, meal) => ({
        carbs: acc.carbs + meal.carbs,
        protein: acc.protein + meal.protein,
        fat: acc.fat + meal.fat,
        kcal: acc.kcal + meal.kcal
      }),
      { carbs: 0, protein: 0, fat: 0, kcal: 0 }
    );
    setTotals(newTotals);
    
    // Check for progress alerts
    checkProgressAlerts(newTotals);
  };

  const getProgressState = (current: number, target: number) => {
    if (target === 0) return 'none';
    const percentage = (current / target) * 100;
    
    if (percentage < 70) return 'low';
    if (percentage < 85) return 'approaching';
    if (percentage < 100) return 'close';
    if (percentage <= 110) return 'achieved';
    if (percentage <= 130) return 'over';
    return 'danger';
  };

  const checkProgressAlerts = (newTotals: typeof totals) => {
    if (targets.carbs === 0) return; // No targets set yet
    
    const carbState = getProgressState(newTotals.carbs, targets.carbs);
    const proteinState = getProgressState(newTotals.protein, targets.protein);
    const fatState = getProgressState(newTotals.fat, targets.fat);

    // Carbs alerts (most critical for keto)
    if (carbState !== lastAlertState.carbs) {
      switch (carbState) {
        case 'close':
          toast({
            title: "🔥 Cerca del límite de carbos",
            description: `${newTotals.carbs.toFixed(1)}g de ${targets.carbs}g. ¡Ten cuidado!`,
            variant: "default",
          });
          break;
        case 'achieved':
          toast({
            title: "✅ Meta de carbos alcanzada",
            description: `${newTotals.carbs.toFixed(1)}g de ${targets.carbs}g. ¡Perfecto para cetosis!`,
            variant: "default",
          });
          break;
        case 'over':
          toast({
            title: "⚠️ Te pasaste un poco de carbos",
            description: `${newTotals.carbs.toFixed(1)}g de ${targets.carbs}g. Aún en rango cetogénico.`,
            variant: "default",
          });
          break;
        case 'danger':
          toast({
            title: "🚨 ¡FUERA DE CETOSIS!",
            description: `${newTotals.carbs.toFixed(1)}g de ${targets.carbs}g. Demasiados carbohidratos para keto.`,
            variant: "destructive",
          });
          break;
      }
    }

    // Protein alerts
    if (proteinState !== lastAlertState.protein && proteinState === 'achieved') {
      toast({
        title: "💪 Meta de proteínas alcanzada",
        description: `${newTotals.protein.toFixed(1)}g de ${targets.protein}g`,
        variant: "default",
      });
    }

    // Fat alerts
    if (fatState !== lastAlertState.fat && fatState === 'achieved') {
      toast({
        title: "🥑 Meta de grasas alcanzada", 
        description: `${newTotals.fat.toFixed(1)}g de ${targets.fat}g`,
        variant: "default",
      });
    }

    setLastAlertState({ carbs: carbState, protein: proteinState, fat: fatState });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchFoods(query);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const addFood = (food: Food, grams: number) => {
    const ratio = grams / 100;
    const entry: FoodEntry = {
      name: food.name,
      grams,
      carbs: +(food.carbs * ratio).toFixed(1),
      protein: +(food.protein * ratio).toFixed(1),
      fat: +(food.fat * ratio).toFixed(1),
      kcal: Math.round((food.kcal || (food.protein * 4 + food.carbs * 4 + food.fat * 9)) * ratio),
      meal: selectedMeal
    };

    setTodayMeals(prev => [...prev, entry]);
    setSearchQuery('');
    setSearchResults([]);
  };

  const removeFood = (index: number) => {
    setTodayMeals(prev => prev.filter((_, i) => i !== index));
  };

  const clearDay = () => {
    if (confirm('¿Limpiar el día completo? Se borrarán todas las comidas de HOY.')) {
      setTodayMeals([]);
      setTotals({ carbs: 0, protein: 0, fat: 0, kcal: 0 });
    }
  };

  const getMealsByType = (mealType: string) => {
    return todayMeals.filter(meal => meal.meal === mealType);
  };

  const getProgressColor = (current: number, target: number) => {
    const state = getProgressState(current, target);
    switch (state) {
      case 'danger': return 'bg-red-500';
      case 'over': return 'bg-orange-500';
      case 'achieved': return 'bg-emerald-500';
      case 'close': return 'bg-yellow-500';
      case 'approaching': return 'bg-blue-500';
      default: return 'bg-gray-300';
    }
  };

  const getAlertComponent = (current: number, target: number, type: 'carbs' | 'protein' | 'fat') => {
    const state = getProgressState(current, target);
    const percentage = target > 0 ? ((current / target) * 100).toFixed(0) : '0';
    
    const alertConfig = {
      carbs: { 
        emoji: '🔥', 
        name: 'Carbohidratos',
        dangerMsg: '¡FUERA DE CETOSIS!',
        overMsg: 'Límite superado',
        achievedMsg: 'Meta alcanzada - Perfecto para cetosis',
        closeMsg: 'Cerca del límite - Ten cuidado'
      },
      protein: { 
        emoji: '💪', 
        name: 'Proteínas',
        dangerMsg: 'Exceso muy alto',
        overMsg: 'Por encima del objetivo',
        achievedMsg: 'Meta alcanzada',
        closeMsg: 'Cerca de la meta'
      },
      fat: { 
        emoji: '🥑', 
        name: 'Grasas',
        dangerMsg: 'Exceso muy alto', 
        overMsg: 'Por encima del objetivo',
        achievedMsg: 'Meta alcanzada',
        closeMsg: 'Cerca de la meta'
      }
    };

    const config = alertConfig[type];
    
    switch (state) {
      case 'danger':
        return (
          <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-800 px-4 py-3 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <div className="font-semibold">{config.emoji} {config.dangerMsg}</div>
              <div className="text-sm">{config.name}: {current.toFixed(1)}g de {target}g ({percentage}%)</div>
            </div>
          </div>
        );
      case 'over':
        return (
          <div className="flex items-center gap-2 bg-orange-100 border border-orange-400 text-orange-800 px-4 py-3 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <div>
              <div className="font-semibold">{config.emoji} {config.overMsg}</div>
              <div className="text-sm">{config.name}: {current.toFixed(1)}g de {target}g ({percentage}%)</div>
            </div>
          </div>
        );
      case 'achieved':
        return (
          <div className="flex items-center gap-2 bg-emerald-100 border border-emerald-400 text-emerald-800 px-4 py-3 rounded-lg">
            <CheckCircle className="w-5 h-5" />
            <div>
              <div className="font-semibold">{config.emoji} {config.achievedMsg}</div>
              <div className="text-sm">{config.name}: {current.toFixed(1)}g de {target}g ({percentage}%)</div>
            </div>
          </div>
        );
      case 'close':
        return (
          <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg">
            <Target className="w-5 h-5" />
            <div>
              <div className="font-semibold">{config.emoji} {config.closeMsg}</div>
              <div className="text-sm">{config.name}: {current.toFixed(1)}g de {target}g ({percentage}%)</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Enhanced Progress Alerts */}
      <div className="space-y-3">
        {targets.carbs > 0 && getAlertComponent(totals.carbs, targets.carbs, 'carbs')}
        {targets.protein > 0 && getAlertComponent(totals.protein, targets.protein, 'protein')}  
        {targets.fat > 0 && getAlertComponent(totals.fat, targets.fat, 'fat')}
      </div>

      {/* Progress Bars */}
      <Card>
        <CardHeader>
          <CardTitle>Progreso del Día</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Carbohidratos</span>
              <span>{totals.carbs.toFixed(1)}g / {targets.carbs}g</span>
            </div>
            <Progress 
              value={targets.carbs > 0 ? Math.min((totals.carbs / targets.carbs) * 100, 100) : 0}
              variant="carbs"
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Proteínas</span>
              <span>{totals.protein.toFixed(1)}g / {targets.protein}g</span>
            </div>
            <Progress 
              value={targets.protein > 0 ? Math.min((totals.protein / targets.protein) * 100, 100) : 0}
              variant="protein"
              className="h-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Grasas</span>
              <span>{totals.fat.toFixed(1)}g / {targets.fat}g</span>
            </div>
            <Progress 
              value={targets.fat > 0 ? Math.min((totals.fat / targets.fat) * 100, 100) : 0}
              variant="fat"  
              className="h-2"
            />
          </div>
        </CardContent>
      </Card>

      {/* Food Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Buscar Alimentos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Busca alimentos (ej: pollo, aguacate, queso...)"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Select value={selectedMeal} onValueChange={setSelectedMeal}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desayuno">Desayuno</SelectItem>
                <SelectItem value="almuerzo">Almuerzo</SelectItem>
                <SelectItem value="cena">Cena</SelectItem>
                <SelectItem value="snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="max-h-60 overflow-y-auto space-y-2 border rounded-lg p-2">
              {searchResults.map((food, index) => (
                <FoodSearchResult
                  key={index}
                  food={food}
                  onAdd={(grams) => addFood(food, grams)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Meals Display */}
      <div className="space-y-4">
        {['desayuno', 'almuerzo', 'cena', 'snack'].map(mealType => (
          <MealSection
            key={mealType}
            mealType={mealType}
            meals={getMealsByType(mealType)}
            onRemove={removeFood}
            allMeals={todayMeals}
          />
        ))}
      </div>

      {/* Clear Day Button */}
      <Button variant="outline" onClick={clearDay} className="w-full">
        Limpiar Día
      </Button>
    </div>
  );
};

const FoodSearchResult = ({ food, onAdd }: { food: Food; onAdd: (grams: number) => void }) => {
  const [grams, setGrams] = useState(100);

  return (
    <div className="flex items-center justify-between p-3 bg-white border rounded-lg">
      <div className="flex-1">
        <div className="font-medium">{food.name}</div>
        <div className="text-sm text-gray-500">{food.category}</div>
        <div className="text-xs text-gray-400">
          {food.carbs}C / {food.protein}P / {food.fat}G por 100g
          {food.custom && <span className="text-purple-600"> • Mi alimento</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min="1"
          step="1"
          value={grams}
          onChange={(e) => setGrams(parseInt(e.target.value) || 1)}
          className="w-20 text-center"
        />
        <span className="text-sm text-gray-500">g</span>
        <Button size="sm" onClick={() => onAdd(grams)}>
          Añadir
        </Button>
      </div>
    </div>
  );
};

const MealSection = ({ 
  mealType, 
  meals, 
  onRemove, 
  allMeals 
}: { 
  mealType: string; 
  meals: FoodEntry[]; 
  onRemove: (index: number) => void;
  allMeals: FoodEntry[];
}) => {
  const mealNames = {
    desayuno: 'Desayuno',
    almuerzo: 'Almuerzo',
    cena: 'Cena',
    snack: 'Snack'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{mealNames[mealType as keyof typeof mealNames]}</CardTitle>
      </CardHeader>
      <CardContent>
        {meals.length === 0 ? (
          <p className="text-gray-500 italic">Sin items.</p>
        ) : (
          <div className="space-y-2">
            {meals.map((meal, index) => {
              const globalIndex = allMeals.findIndex(m => m === meal);
              return (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{meal.name}</div>
                    <div className="text-xs text-gray-600">
                      {meal.grams}g • {meal.carbs.toFixed(1)}C / {meal.protein.toFixed(1)}P / {meal.fat.toFixed(1)}G • {meal.kcal} kcal
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onRemove(globalIndex)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};