import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [lessons] = useState([
    { id: 1, title: 'Алгебра: Квадратные уравнения', date: '2025-10-18', time: '14:00', type: 'individual' },
    { id: 2, title: 'Геометрия: Теорема Пифагора', date: '2025-10-20', time: '16:00', type: 'group' },
    { id: 3, title: 'Математический анализ', date: '2025-10-22', time: '18:00', type: 'stream' },
  ]);

  const [stats] = useState({
    completedLessons: 24,
    totalLessons: 30,
    averageScore: 87,
    currentStreak: 7,
  });

  const getLessonIcon = (type: string) => {
    switch (type) {
      case 'individual': return 'User';
      case 'group': return 'Users';
      case 'stream': return 'Radio';
      default: return 'BookOpen';
    }
  };

  const getLessonType = (type: string) => {
    switch (type) {
      case 'individual': return 'Индивидуальное';
      case 'group': return 'Групповое';
      case 'stream': return 'Поток';
      default: return 'Урок';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#45B7D1]/10 via-white to-[#FF6DC4]/10">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#45B7D1] to-[#4EDDC4] rounded-xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">M</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">MathSwag</h1>
          </div>
          <Button variant="ghost" onClick={() => navigate('/')}>
            <Icon name="Home" size={20} />
            <span className="ml-2">Главная</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Привет! 👋</h2>
          <p className="text-gray-600">Добро пожаловать в твой личный кабинет</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2 border-[#45B7D1]/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Пройдено уроков</CardDescription>
              <CardTitle className="text-3xl font-bold text-[#45B7D1]">
                {stats.completedLessons}/{stats.totalLessons}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress value={(stats.completedLessons / stats.totalLessons) * 100} className="h-2" />
            </CardContent>
          </Card>

          <Card className="border-2 border-[#FF6DC4]/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Средний балл</CardDescription>
              <CardTitle className="text-3xl font-bold text-[#FF6DC4]">
                {stats.averageScore}%
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Icon name="TrendingUp" size={16} />
                <span>+5% за неделю</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#FFA07A]/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Текущая серия</CardDescription>
              <CardTitle className="text-3xl font-bold text-[#FFA07A]">
                {stats.currentStreak} дней
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-6 h-6 rounded ${i < stats.currentStreak ? 'bg-[#FFA07A]' : 'bg-gray-200'}`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#4EDDC4]/20 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardDescription>Достижения</CardDescription>
              <CardTitle className="text-3xl font-bold text-[#4EDDC4]">
                12 🏆
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-1">
                <span className="text-2xl">🎯</span>
                <span className="text-2xl">⭐</span>
                <span className="text-2xl">🔥</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Calendar" size={24} className="text-[#45B7D1]" />
              Ближайшие занятия
            </CardTitle>
            <CardDescription>Твоё расписание на эту неделю</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border-2 border-gray-100 hover:border-[#45B7D1]/30 transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#45B7D1] to-[#4EDDC4] rounded-xl flex items-center justify-center">
                      <Icon name={getLessonIcon(lesson.type)} size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Icon name="Calendar" size={14} />
                          {new Date(lesson.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Icon name="Clock" size={14} />
                          {lesson.time}
                        </span>
                        <span className="px-2 py-1 bg-[#45B7D1]/10 text-[#45B7D1] rounded-full text-xs font-medium">
                          {getLessonType(lesson.type)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => navigate(`/lesson/${lesson.type}`)}
                    className="bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90"
                  >
                    <Icon name="Video" size={16} />
                    <span className="ml-2">Подключиться</span>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" size={24} className="text-[#FF6DC4]" />
                Текущие цели
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Завершить курс алгебры</span>
                  <span className="text-sm text-gray-600">80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Набрать 90+ баллов</span>
                  <span className="text-sm text-gray-600">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Серия 30 дней</span>
                  <span className="text-sm text-gray-600">23%</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="BookOpen" size={24} className="text-[#FFA07A]" />
                Недавняя активность
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Выполнено домашнее задание по геометрии</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Пройден урок "Производные функций"</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Получен сертификат за курс</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span className="text-sm">Оставлен отзыв преподавателю</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
