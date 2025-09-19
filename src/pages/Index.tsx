import { useState, useEffect } from 'react';
import { MacroCalculator } from '@/components/MacroCalculator';
import { FoodTracker } from '@/components/FoodTracker';
import { CustomFoodManager } from '@/components/CustomFoodManager';
import { DailyProgress } from '@/components/DailyProgress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calculator, Utensils, Plus, HelpCircle, TrendingUp } from 'lucide-react';
import logoImage from '@/assets/keto360-logo.png';

const Index = () => {
  const [targets, setTargets] = useState({ carbs: 0, protein: 0, fat: 0, calories: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-orange-400 p-4">
      <div className="max-w-6xl mx-auto bg-cream rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-center text-white relative">
          <div className="mb-2">
            <img 
              src={logoImage} 
              alt="Keto360 Logo" 
              className="h-14 w-auto mx-auto"
            />
          </div>
          <h1 className="text-3xl font-bold mb-1 text-shadow">Calculadora Keto</h1>
          <p className="text-base opacity-90 mb-2">Tu aliado keto día a día</p>
          
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
                    🧮 Paso 1: Calcula tus macros keto
                  </h3>
                  <p className="text-gray-700">
                    Comienza ingresando tus datos personales: peso, altura, edad, género, nivel de actividad física y tu objetivo (perder peso, mantener o ganar masa muscular). 
                  </p>
                  <p className="text-gray-700">
                    La app calculará automáticamente tus macronutrientes cetogénicos utilizando la fórmula científica Mifflin-St Jeor para determinar tu metabolismo basal, y luego ajustará las calorías según tu objetivo específico.
                  </p>
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <p className="text-sm text-emerald-800 mb-2">
                      <strong>📊 Distribución Cetogénica Estándar:</strong>
                    </p>
                    <ul className="text-sm text-emerald-700 space-y-1">
                      <li>• <strong>Carbohidratos:</strong> 5% (20-25g máximo para cetosis)</li>
                      <li>• <strong>Proteínas:</strong> 25% (masa muscular y saciedad)</li>
                      <li>• <strong>Grasas:</strong> 70% (fuente principal de energía)</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
                    🍽️ Paso 2: Registra y monitorea tus comidas
                  </h3>
                  <p className="text-gray-700">
                    Utiliza nuestra extensa base de datos con más de 500 alimentos keto-amigables. Simplemente:
                  </p>
                  <ol className="list-decimal list-inside text-gray-600 space-y-2 ml-4">
                    <li>Busca el alimento escribiendo su nombre</li>
                    <li>Ajusta la cantidad en gramos usando el control deslizante</li>
                    <li>Selecciona el tipo de comida (desayuno, almuerzo, cena o snack)</li>
                    <li>Observa cómo se actualizan automáticamente tus macros</li>
                  </ol>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">🚨 Sistema de Alertas Inteligente:</h4>
                    <ul className="list-disc list-inside text-yellow-700 space-y-1 text-sm">
                      <li><strong>Alertas Progresivas:</strong> Te avisamos cuando te acercas a tus límites</li>
                      <li><strong>Zona de Peligro:</strong> Notificación especial si superas los carbohidratos (&gt;25g)</li>
                      <li><strong>Celebración de Logros:</strong> Felicitaciones cuando alcances tus metas perfectamente</li>
                      <li><strong>Indicadores Visuales:</strong> Colores y emojis que cambian según tu progreso</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
                    📈 Paso 3: Sigue tu progreso diario
                  </h3>
                  <p className="text-gray-700">
                    La pestaña "Mi Progreso" te muestra un calendario visual de los últimos 30 días con:
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                    <li><strong>🎯 Días Perfectos:</strong> Cuando cumples todos tus macros idealmente</li>
                    <li><strong>😊 Días Buenos:</strong> Cuando estás cerca de tus objetivos</li>
                    <li><strong>😐 Días Regulares:</strong> Cuando hay margen de mejora</li>
                    <li><strong>😞 Días Difíciles:</strong> Cuando te alejas significativamente</li>
                    <li><strong>🔥 Racha Actual:</strong> Días consecutivos manteniendo el buen rumbo</li>
                    <li><strong>📊 Estadísticas:</strong> Porcentaje de éxito y días perfectos del mes</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-emerald-600 flex items-center gap-2">
                    🥑 Paso 4: Personaliza tu base de datos
                  </h3>
                  <p className="text-gray-700">
                    ¿No encuentras un alimento específico? Crea alimentos personalizados con valores nutricionales exactos. Estos se integran completamente en tu base de datos personal para futuras búsquedas.
                  </p>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <strong>💡 Tip Pro:</strong> Agrega tus preparaciones caseras, marcas locales o recetas favoritas con sus macros calculados.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">🎯 Estrategias para el Éxito Cetogénico:</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">📱 Funcionalidades:</h5>
                      <ul className="list-disc list-inside text-blue-600 space-y-1 text-sm">
                        <li>Datos guardados automáticamente</li>
                        <li>Funciona sin conexión a internet</li>
                        <li>Instálala como PWA en tu móvil</li>
                        <li>Limpieza rápida para empezar de nuevo</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-700 mb-2">🧠 Consejos Keto:</h5>
                      <ul className="list-disc list-inside text-blue-600 space-y-1 text-sm">
                        <li>Mantén los carbohidratos bajo 25g</li>
                        <li>Prioriza grasas saludables</li>
                        <li>No temas a las grasas naturales</li>
                        <li>Hidrátate abundantemente</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-emerald-50 to-orange-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <h4 className="font-bold text-emerald-800 mb-2">🏆 ¡Tu Éxito Cetogénico Te Espera!</h4>
                  <p className="text-emerald-700 text-sm">
                    Cada día es una nueva oportunidad para acercarte a tus objetivos. Usa las alertas como guía, 
                    celebra tus logros en el calendario de progreso, y recuerda: la consistencia es más importante que la perfección.
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="macros" className="w-full">
          <TabsList className="grid grid-cols-1 sm:grid-cols-4 w-full bg-emerald-50 p-2 rounded-none gap-1 h-auto">
            <TabsTrigger 
              value="macros" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white w-full justify-start sm:justify-center text-sm px-2 py-3"
            >
              <Calculator className="w-4 h-4" />
              🧮 Tus macros keto
            </TabsTrigger>
            <TabsTrigger 
              value="tracker" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white w-full justify-start sm:justify-center text-sm px-2 py-3"
            >
              <Utensils className="w-4 h-4" />
              🍽️ Tus macros de hoy
            </TabsTrigger>
            <TabsTrigger 
              value="custom" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white w-full justify-start sm:justify-center text-sm px-2 py-3"
            >
              <Plus className="w-4 h-4" />
              🥑 Agregar alimentos
            </TabsTrigger>
            <TabsTrigger 
              value="progress" 
              className="flex items-center gap-2 data-[state=active]:bg-emerald-500 data-[state=active]:text-white w-full justify-start sm:justify-center text-sm px-2 py-3"
            >
              <TrendingUp className="w-4 h-4" />
              📈 Mi progreso
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