import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const LessonStream = () => {
  const navigate = useNavigate();
  const [handRaised, setHandRaised] = useState(false);
  const [reactions, setReactions] = useState<Array<{ id: number; emoji: string; x: number }>>([]);

  const availableReactions = ['👍', '❤️', '🔥', '👏', '🤔', '💡'];

  const raiseHand = () => {
    setHandRaised(!handRaised);
    if (!handRaised) {
      toast.success('Рука поднята! Преподаватель увидит ваш запрос');
    } else {
      toast.info('Рука опущена');
    }
  };

  const sendReaction = (emoji: string) => {
    const id = Date.now();
    const x = Math.random() * 80 + 10;
    setReactions([...reactions, { id, emoji, x }]);
    
    setTimeout(() => {
      setReactions(prev => prev.filter(r => r.id !== id));
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {reactions.map((reaction) => (
        <div
          key={reaction.id}
          className="absolute text-4xl animate-[float_5s_ease-in-out_forwards] pointer-events-none z-50"
          style={{
            left: `${reaction.x}%`,
            bottom: '10%',
            animation: 'float 5s ease-in-out forwards',
          }}
        >
          {reaction.emoji}
        </div>
      ))}

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(-500px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>

      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white hover:bg-gray-700">
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-xl font-bold text-white">Потоковое занятие</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Icon name="Radio" size={16} />
              <span>28 зрителей</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-red-500/20 text-red-400 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
              <span className="text-sm">LIVE</span>
            </div>
            <Button variant="destructive" onClick={() => navigate('/dashboard')}>
              <Icon name="LogOut" size={16} />
              <span className="ml-2">Выйти</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-4 h-[500px]">
            <div className="relative h-full bg-gray-900 rounded-lg overflow-hidden">
              <video className="w-full h-full object-cover" autoPlay>
                <source src="" type="video/mp4" />
              </video>
              <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <Icon name="GraduationCap" size={20} />
                <div>
                  <div className="font-semibold">Анна Петровна</div>
                  <div className="text-xs text-gray-300">Преподаватель математики</div>
                </div>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <Card className="bg-black/70 backdrop-blur-sm border-gray-600 p-4">
                  <div className="text-white">
                    <h3 className="font-semibold mb-2">Тема урока: Интегралы и их применение</h3>
                    <p className="text-sm text-gray-300">
                      Сегодня мы рассмотрим основные принципы интегрального исчисления и научимся решать базовые задачи
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Быстрые реакции</h3>
            <div className="flex gap-2 flex-wrap">
              {availableReactions.map((emoji) => (
                <Button
                  key={emoji}
                  onClick={() => sendReaction(emoji)}
                  className="text-2xl bg-gray-700 hover:bg-gray-600 border-2 border-transparent hover:border-[#45B7D1] transition-all"
                  size="lg"
                >
                  {emoji}
                </Button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Реакция будет видна всем участникам в течение 5 секунд</p>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Ваше участие</h3>
            <div className="space-y-2">
              <Button 
                className={`w-full ${handRaised ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-700 hover:bg-gray-600'} text-white transition-all`}
                onClick={raiseHand}
              >
                <Icon name="Hand" size={16} />
                <span className="ml-2">{handRaised ? 'Опустить руку' : 'Поднять руку'}</span>
              </Button>
              <div className="bg-gray-700 rounded-lg p-3 text-sm text-gray-300">
                <p className="mb-2">💡 Поднимите руку, если хотите задать вопрос</p>
                <p>Преподаватель увидит ваш запрос и сможет ответить</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3 flex items-center justify-between">
              <span>Вопросы</span>
              <span className="text-xs bg-[#45B7D1] text-white px-2 py-1 rounded-full">3 активных</span>
            </h3>
            <div className="space-y-3 max-h-[200px] overflow-y-auto">
              <div className="bg-yellow-500/20 border-l-4 border-yellow-500 rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Hand" size={14} className="text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-400">Иван</span>
                </div>
                <p className="text-sm text-white font-bold">Можно повторить формулу интеграла?</p>
              </div>
              <div className="bg-blue-500/20 border-l-4 border-blue-500 rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Hand" size={14} className="text-blue-500" />
                  <span className="text-sm font-medium text-blue-400">Мария</span>
                </div>
                <p className="text-sm text-white font-bold">Как решить задачу №5?</p>
              </div>
              <div className="bg-green-500/20 border-l-4 border-green-500 rounded p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="Hand" size={14} className="text-green-500" />
                  <span className="text-sm font-medium text-green-400">Алексей</span>
                </div>
                <p className="text-sm text-white font-bold">Будет ли домашнее задание?</p>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Материалы урока</h3>
            <div className="space-y-2">
              <button className="w-full text-left bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex items-center gap-3 transition-colors">
                <Icon name="FileText" size={20} className="text-[#45B7D1]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Конспект урока</div>
                  <div className="text-xs text-gray-400">PDF, 2.4 МБ</div>
                </div>
                <Icon name="Download" size={16} className="text-gray-400" />
              </button>
              <button className="w-full text-left bg-gray-700 hover:bg-gray-600 rounded-lg p-3 flex items-center gap-3 transition-colors">
                <Icon name="FileSpreadsheet" size={20} className="text-green-400" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">Задачи для практики</div>
                  <div className="text-xs text-gray-400">PDF, 1.8 МБ</div>
                </div>
                <Icon name="Download" size={16} className="text-gray-400" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonStream;
