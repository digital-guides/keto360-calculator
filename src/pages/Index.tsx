import { useState, useEffect } from 'react';
import { MacroCalculator } from '@/components/MacroCalculator';
import { FoodTracker } from '@/components/FoodTracker';
import { CustomFoodManager } from '@/components/CustomFoodManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Utensils, Plus } from 'lucide-react';

const Index = () => {
  const [targets, setTargets] = useState({ carbs: 0, protein: 0, fat: 0, calories: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-orange-400 p-4">
      <div className="max-w-6xl mx-auto bg-cream rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-8 text-center text-white relative">
          <div className="mb-5">
            <div className="text-pink-500 font-bold text-lg mb-2">KETO</div>
            <div className="text-pink-500 font-bold text-lg">AMIGABLE</div>
          </div>
          <h1 className="text-4xl font-bold mb-3 text-shadow">Calculadora Keto</h1>
          <p className="text-lg opacity-90">Tu compañero digital para una vida cetogénica sin complicaciones</p>
          
          {/* Install PWA Button */}
          <button 
            id="installBtn" 
            className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors hidden"
          >
            📱 Instalar App
          </button>
          
          {/* How to use button */}
          <button className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors">
            ¿Cómo usarla?
          </button>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="macros" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-emerald-50 p-2 rounded-none">
            <TabsTrigger 
              value="macros" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Calculator className="w-4 h-4" />
              🧮 Calcula tus macros
            </TabsTrigger>
            <TabsTrigger 
              value="tracker" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Utensils className="w-4 h-4" />
              🍽️ Calcula lo que comes
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <Plus className="w-4 h-4" />
              🥑 Agrega alimentos personalizados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="macros" className="p-6">
            <MacroCalculator onTargetsCalculated={setTargets} />
          </TabsContent>

          <TabsContent value="tracker" className="p-6">
            <FoodTracker targets={targets} />
          </TabsContent>

          <TabsContent value="custom" className="p-6">
            <CustomFoodManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;