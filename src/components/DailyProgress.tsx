import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, TrendingUp, Target, Award } from 'lucide-react';

interface DayData {
  date: string;
  carbs: number;
  protein: number;
  fat: number;
  calories: number;
  targetCarbs: number;
  targetProtein: number;
  targetFat: number;
  targetCalories: number;
}

export const DailyProgress = () => {
  const [progressData, setProgressData] = useState<DayData[]>([]);
  const [stats, setStats] = useState({
    streak: 0,
    successRate: 0,
    perfectDays: 0,
    totalDays: 0
  });

  useEffect(() => {
    loadProgressData();
  }, []);

  const loadProgressData = () => {
    const data: DayData[] = [];
    const today = new Date();
    
    // Load last 30 days of data
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      // Try to load data from localStorage
      const savedData = localStorage.getItem(`ketoDayLog-${dateStr}`);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          const targets = JSON.parse(localStorage.getItem('ketoTargets') || '{}');
          
          data.push({
            date: dateStr,
            carbs: parsed.totals?.carbs || 0,
            protein: parsed.totals?.protein || 0,
            fat: parsed.totals?.fat || 0,
            calories: parsed.totals?.kcal || 0,
            targetCarbs: targets.carbs || 0,
            targetProtein: targets.protein || 0,
            targetFat: targets.fat || 0,
            targetCalories: targets.calories || 0
          });
        } catch (e) {
          // Add empty day if can't parse
          data.push({
            date: dateStr,
            carbs: 0, protein: 0, fat: 0, calories: 0,
            targetCarbs: 0, targetProtein: 0, targetFat: 0, targetCalories: 0
          });
        }
      } else {
        // Add empty day
        data.push({
          date: dateStr,
          carbs: 0, protein: 0, fat: 0, calories: 0,
          targetCarbs: 0, targetProtein: 0, targetFat: 0, targetCalories: 0
        });
      }
    }
    
    setProgressData(data);
    calculateStats(data);
  };

  const getDayStatus = (day: DayData) => {
    if (day.targetCarbs === 0 || (day.carbs === 0 && day.protein === 0 && day.fat === 0)) {
      return 'empty'; // No data
    }

    const carbsPercentage = (day.carbs / day.targetCarbs) * 100;
    const proteinPercentage = (day.protein / day.targetProtein) * 100;
    const fatPercentage = (day.fat / day.targetFat) * 100;

    // Perfect: All macros in ideal range
    if (carbsPercentage >= 90 && carbsPercentage <= 105 && 
        proteinPercentage >= 90 && proteinPercentage <= 110 &&
        fatPercentage >= 90 && fatPercentage <= 110) {
      return 'perfect';
    }

    // Good: Carbs controlled (most important for keto)
    if (carbsPercentage <= 110) {
      return 'good';
    }

    // Regular: Carbs a bit high but still keto-ish
    if (carbsPercentage <= 130) {
      return 'regular';
    }

    // Bad: Out of ketosis
    return 'bad';
  };

  const getDayEmoji = (status: string) => {
    switch (status) {
      case 'perfect': return '🎯';
      case 'good': return '🔥';
      case 'regular': return '⚠️';
      case 'bad': return '❌';
      default: return '⭕';
    }
  };

  const getDayColor = (status: string) => {
    switch (status) {
      case 'perfect': return 'bg-emerald-500 text-white';
      case 'good': return 'bg-blue-500 text-white';
      case 'regular': return 'bg-yellow-500 text-black';
      case 'bad': return 'bg-red-500 text-white';
      default: return 'bg-gray-200 text-gray-500';
    }
  };

  const calculateStats = (data: DayData[]) => {
    let streak = 0;
    let perfectDays = 0;
    let goodOrBetterDays = 0;
    let daysWithData = 0;

    // Calculate current streak (from most recent day backwards)
    for (let i = data.length - 1; i >= 0; i--) {
      const status = getDayStatus(data[i]);
      if (status === 'empty') continue;
      
      if (status === 'perfect' || status === 'good') {
        streak++;
      } else {
        break;
      }
    }

    // Calculate overall stats
    data.forEach(day => {
      const status = getDayStatus(day);
      if (status !== 'empty') {
        daysWithData++;
        if (status === 'perfect') perfectDays++;
        if (status === 'perfect' || status === 'good') goodOrBetterDays++;
      }
    });

    setStats({
      streak,
      successRate: daysWithData > 0 ? Math.round((goodOrBetterDays / daysWithData) * 100) : 0,
      perfectDays,
      totalDays: daysWithData
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.getDate().toString();
  };

  const getDateInfo = (dateStr: string) => {
    const date = new Date(dateStr);
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    return {
      day: formatDate(dateStr),
      weekday: days[date.getDay()],
      month: months[date.getMonth()]
    };
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-emerald-600">{stats.streak}</div>
            <div className="text-sm text-gray-600">Días consecutivos</div>
            <div className="text-xs text-gray-500">🔥 Racha actual</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.successRate}%</div>
            <div className="text-sm text-gray-600">Tasa de éxito</div>
            <div className="text-xs text-gray-500">📊 Este mes</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.perfectDays}</div>
            <div className="text-sm text-gray-600">Días perfectos</div>
            <div className="text-xs text-gray-500">🎯 Últimos 30d</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-600">{stats.totalDays}</div>
            <div className="text-sm text-gray-600">Días registrados</div>
            <div className="text-xs text-gray-500">📝 De 30 días</div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Progreso Diario - Últimos 30 Días
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {progressData.map((day, index) => {
              const status = getDayStatus(day);
              const dateInfo = getDateInfo(day.date);
              const isToday = day.date === new Date().toISOString().split('T')[0];
              
              return (
                <div
                  key={day.date}
                  className={`
                    aspect-square rounded-lg p-2 text-center transition-all hover:scale-105 cursor-pointer
                    ${getDayColor(status)}
                    ${isToday ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}
                  `}
                  title={`${dateInfo.weekday} ${dateInfo.day}: ${status === 'empty' ? 'Sin datos' : 
                    status === 'perfect' ? 'Día perfecto' :
                    status === 'good' ? 'Buen día' :
                    status === 'regular' ? 'Día regular' : 'Día difícil'}`}
                >
                  <div className="text-lg">{getDayEmoji(status)}</div>
                  <div className="text-xs font-medium">{dateInfo.day}</div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6 pt-4 border-t">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🎯</span>
              <span className="text-gray-700">Perfecto</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">🔥</span>
              <span className="text-gray-700">Bueno</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">⚠️</span>
              <span className="text-gray-700">Regular</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">❌</span>
              <span className="text-gray-700">Malo</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-lg">⭕</span>
              <span className="text-gray-700">Sin datos</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Motivational Messages */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="text-center">
            {stats.streak >= 7 ? (
              <div>
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-semibold text-emerald-700">¡Increíble racha de {stats.streak} días!</div>
                <div className="text-sm text-emerald-600 mt-1">Estás dominando el estilo de vida keto</div>
              </div>
            ) : stats.streak >= 3 ? (
              <div>
                <div className="text-2xl mb-2">🚀</div>
                <div className="font-semibold text-blue-700">¡Vas súper bien con {stats.streak} días seguidos!</div>
                <div className="text-sm text-blue-600 mt-1">Sigue así, estás creando un gran hábito</div>
              </div>
            ) : stats.successRate >= 70 ? (
              <div>
                <div className="text-2xl mb-2">💪</div>
                <div className="font-semibold text-purple-700">¡{stats.successRate}% de éxito este mes!</div>
                <div className="text-sm text-purple-600 mt-1">Excelente consistencia en tu keto</div>
              </div>
            ) : (
              <div>
                <div className="text-2xl mb-2">🌱</div>
                <div className="font-semibold text-gray-700">¡Cada día es una nueva oportunidad!</div>
                <div className="text-sm text-gray-600 mt-1">Enfócate en hoy, un día a la vez</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};