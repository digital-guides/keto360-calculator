import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MacroCalculatorProps {
  onTargetsCalculated: (targets: { carbs: number; protein: number; fat: number; calories: number }) => void;
}

export const MacroCalculator = ({ onTargetsCalculated }: MacroCalculatorProps) => {
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity: '1.2',
    goal: 'maintain'
  });
  
  const [results, setResults] = useState<{ carbs: number; protein: number; fat: number; calories: number } | null>(null);
  const [showResults, setShowResults] = useState(false);

  // Load saved data on component mount
  useEffect(() => {
    const saved = localStorage.getItem('ketoLastInputs');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error('Error loading saved inputs:', e);
      }
    }

    // Load saved results
    const savedTargets = localStorage.getItem('ketoTargets');
    if (savedTargets) {
      try {
        const parsed = JSON.parse(savedTargets);
        setResults(parsed);
        setShowResults(true);
      } catch (e) {
        console.error('Error loading saved targets:', e);
      }
    }
  }, []);

  // Save data whenever form changes
  useEffect(() => {
    localStorage.setItem('ketoLastInputs', JSON.stringify(formData));
  }, [formData]);

  const calculateMacros = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);
    const activity = parseFloat(formData.activity);

    if (!weight || !height || !age) {
      alert('Por favor completa peso, altura y edad.');
      return;
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let BMR = (10 * weight) + (6.25 * height) - (5 * age);
    BMR += formData.gender === 'male' ? 5 : -161;

    // Calculate TDEE
    let TDEE = BMR * activity;
    
    // Adjust for goal
    if (formData.goal === 'lose') TDEE *= 0.80;
    if (formData.goal === 'gain') TDEE *= 1.20;

    const calories = Math.round(TDEE);
    
    // Keto macro distribution: 5% carbs, 25% protein, 70% fat
    const carbs = Math.round((0.05 * calories) / 4);
    const protein = Math.round((0.25 * calories) / 4);
    const fat = Math.round((0.70 * calories) / 9);

    const targets = { carbs, protein, fat, calories };
    setResults(targets);
    setShowResults(true);
    onTargetsCalculated(targets);

    // Save targets
    localStorage.setItem('ketoTargets', JSON.stringify(targets));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🧮 Calcula tus macros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="70"
                value={formData.weight}
                onChange={(e) => handleInputChange('weight', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={formData.height}
                onChange={(e) => handleInputChange('height', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input
                id="age"
                type="number"
                placeholder="30"
                value={formData.age}
                onChange={(e) => handleInputChange('age', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Género</Label>
              <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Masculino</SelectItem>
                  <SelectItem value="female">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="activity">Nivel de Actividad</Label>
              <Select value={formData.activity} onValueChange={(value) => handleInputChange('activity', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1.2">Sedentario</SelectItem>
                  <SelectItem value="1.375">Ligeramente activo</SelectItem>
                  <SelectItem value="1.55">Moderadamente activo</SelectItem>
                  <SelectItem value="1.725">Muy activo</SelectItem>
                  <SelectItem value="1.9">Extremadamente activo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="goal">Objetivo</Label>
              <Select value={formData.goal} onValueChange={(value) => handleInputChange('goal', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lose">Perder peso (-20%)</SelectItem>
                  <SelectItem value="maintain">Mantener peso</SelectItem>
                  <SelectItem value="gain">Ganar peso (+20%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={calculateMacros} className="w-full bg-emerald-500 hover:bg-emerald-600">
            Calcular Macros
          </Button>
        </CardContent>
      </Card>

      {showResults && results && (
        <Card className="bg-emerald-50 border-emerald-200">
          <CardHeader>
            <CardTitle className="text-emerald-700">Tus Macros Cetogénicos Diarios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-white rounded-lg">
                <div className="text-3xl mb-2">🧮</div>
                <div className="text-2xl font-bold text-gray-800">{results.calories}</div>
                <div className="text-sm text-gray-600">Calorías</div>
                <div className="text-xs text-gray-500">kcal</div>
              </div>
              
              <div className="p-4 bg-white rounded-lg">
                <div className="text-3xl mb-2">🔥</div>
                <div className="text-2xl font-bold" style={{color: 'hsl(220 91% 60%)'}}>{results.carbs}</div>
                <div className="text-sm text-gray-600">Carbohidratos</div>
                <div className="text-xs text-gray-500">g (5%)</div>
              </div>
              
              <div className="p-4 bg-white rounded-lg">
                <div className="text-3xl mb-2">🥩</div>
                <div className="text-2xl font-bold" style={{color: 'hsl(28 84% 60%)'}}>{results.protein}</div>
                <div className="text-sm text-gray-600">Proteínas</div>
                <div className="text-xs text-gray-500">g (25%)</div>
              </div>
              
              <div className="p-4 bg-white rounded-lg">
                <div className="text-3xl mb-2">🥑</div>
                <div className="text-2xl font-bold" style={{color: 'hsl(142 71% 45%)'}}>{results.fat}</div>
                <div className="text-sm text-gray-600">Grasas</div>
                <div className="text-xs text-gray-500">g (70%)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};