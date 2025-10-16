import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const LessonIndividual = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="text-white hover:bg-gray-700">
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-xl font-bold text-white">Индивидуальное занятие</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">В эфире</span>
            </div>
            <Button variant="destructive" onClick={() => navigate('/dashboard')}>
              <Icon name="PhoneOff" size={16} />
              <span className="ml-2">Завершить</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-4 h-[250px]">
            <div className="grid grid-cols-2 gap-4 h-full">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" autoPlay muted>
                  <source src="" type="video/mp4" />
                </video>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                  <Icon name="User" size={16} />
                  <span>Вы</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-3 bg-green-400 rounded"></div>
                    <div className="w-1 h-4 bg-green-400 rounded"></div>
                    <div className="w-1 h-2 bg-green-400 rounded"></div>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" autoPlay>
                  <source src="" type="video/mp4" />
                </video>
                <div className="absolute bottom-3 left-3 bg-black/70 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-2">
                  <Icon name="GraduationCap" size={16} />
                  <span>Преподаватель</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-4 bg-blue-400 rounded"></div>
                    <div className="w-1 h-5 bg-blue-400 rounded"></div>
                    <div className="w-1 h-3 bg-blue-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-gray-700 p-4 flex-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-gray-800">Доска для рисования</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  {['#000000', '#FF0000', '#0000FF', '#00FF00', '#FFA500'].map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      className={`w-8 h-8 rounded ${color === c ? 'ring-2 ring-[#45B7D1]' : ''}`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2">
                  <Icon name="Minus" size={16} className="text-gray-600" />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={lineWidth}
                    onChange={(e) => setLineWidth(Number(e.target.value))}
                    className="w-20"
                  />
                  <Icon name="Plus" size={16} className="text-gray-600" />
                </div>
                <Button variant="outline" size="sm" onClick={clearCanvas}>
                  <Icon name="Trash2" size={16} />
                </Button>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              width={800}
              height={450}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full border-2 border-gray-200 rounded-lg bg-white cursor-crosshair"
            />
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Управление</h3>
            <div className="space-y-2">
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <Icon name="Mic" size={16} />
                <span className="ml-2">Микрофон вкл</span>
              </Button>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <Icon name="Video" size={16} />
                <span className="ml-2">Камера вкл</span>
              </Button>
              <Button className="w-full bg-gray-700 hover:bg-gray-600 text-white">
                <Icon name="MonitorUp" size={16} />
                <span className="ml-2">Поделиться экраном</span>
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4 max-h-[400px] overflow-y-auto">
            <h3 className="font-semibold text-white mb-3">Чат</h3>
            <div className="space-y-3">
              <div className="bg-gray-700 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="GraduationCap" size={14} className="text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Преподаватель</span>
                </div>
                <p className="text-sm text-gray-300">Привет! Начнём с квадратных уравнений</p>
              </div>
              <div className="bg-[#45B7D1]/20 rounded-lg p-3 ml-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="User" size={14} className="text-[#45B7D1]" />
                  <span className="text-sm font-medium text-[#45B7D1]">Вы</span>
                </div>
                <p className="text-sm text-gray-300">Готов! Давайте начнём</p>
              </div>
            </div>
            <div className="mt-3">
              <input
                type="text"
                placeholder="Введите сообщение..."
                className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#45B7D1]"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonIndividual;
