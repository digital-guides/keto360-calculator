import { useState, useEffect } from 'react';
import { MacroCalculator } from '@/components/MacroCalculator';
import { FoodTracker } from '@/components/FoodTracker';
import { CustomFoodManager } from '@/components/CustomFoodManager';
import { DailyProgress } from '@/components/DailyProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calculator, Utensils, Plus, HelpCircle, TrendingUp } from 'lucide-react';

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
          <Dialog>
            <DialogTrigger asChild>
              <button className="absolute top-4 left-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2">
                <HelpCircle className="w-4 h-4" />
                ¿Cómo usarla?
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl text-emerald-700">¿Cómo usar Keto Amigable?</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 p-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
                    🧮 Paso 1: Calcula tus macros
                  </h3>
                  <p className="text-gray-700">
                    Ingresa tus datos personales (peso, altura, edad, género, nivel de actividad y objetivo) 
                    para calcular tus macros cetogénicos diarios. La app usará la fórmula Mifflin-St Jeor 
                    para calcular tu metabolismo basal y ajustará las calorías según tu objetivo.
                  </p>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-sm text-emerald-800">
                      <strong>Distribución Keto:</strong> 5% Carbohidratos, 25% Proteínas, 70% Grasas
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
                    🍽️ Paso 2: Registra tus comidas
                  </h3>
                  <p className="text-gray-700">
                    Busca alimentos en nuestra base de datos de más de 500 alimentos keto-amigables. 
                    Simplemente escribe el nombre del alimento, ajusta la cantidad en gramos y 
                    selecciona la comida (desayuno, almuerzo, cena o snack).
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li>Las barras de progreso te muestran tu avance diario</li>
                    <li>Los colores coinciden con tus macros calculados</li>
                    <li>Recibirás notificaciones cuando alcances tus metas</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
                    🥑 Paso 3: Agrega alimentos personalizados
                  </h3>
                  <p className="text-gray-700">
                    ¿No encuentras un alimento? Crea tus propios alimentos personalizados 
                    con sus valores nutricionales. Estos se guardarán y estarán disponibles 
                    para futuras búsquedas.
                  </p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💡 Consejos:</h4>
                  <ul className="list-disc list-inside text-blue-700 space-y-1 text-sm">
                    <li>Tus datos se guardan automáticamente en tu dispositivo</li>
                    <li>Puedes instalar la app en tu teléfono para usarla sin conexión</li>
                    <li>Limpia el día completo si necesitas empezar de nuevo</li>
                    <li>Los emoticons en los macros te ayudan a identificar cada nutriente</li>
                  </ul>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="macros" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-emerald-50 p-2 rounded-none">
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
              value="progress" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4" />
              📈 Mi Progreso
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

          <TabsContent value="progress" className="p-6">
            <DailyProgress />
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