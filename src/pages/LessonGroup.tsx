import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';

const LessonGroup = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(3);

  const students = [
    { id: 1, name: 'Анна' },
    { id: 2, name: 'Иван' },
    { id: 3, name: 'Мария' },
    { id: 4, name: 'Дмитрий' },
  ];

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
            <h1 className="text-xl font-bold text-white">Групповое занятие</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Icon name="Users" size={16} />
              <span>{students.length + 1} участников</span>
            </div>
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
          <Card className="bg-gray-800 border-gray-700 p-4 h-[300px]">
            <div className="grid grid-cols-3 gap-3 h-full">
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <video className="w-full h-full object-cover" autoPlay>
                  <source src="" type="video/mp4" />
                </video>
                <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Icon name="GraduationCap" size={12} />
                  <span>Преподаватель</span>
                </div>
              </div>

              {students.map((student) => (
                <div key={student.id} className="relative bg-gray-900 rounded-lg overflow-hidden">
                  <video className="w-full h-full object-cover" autoPlay muted>
                    <source src="" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                    <Icon name="User" size={12} />
                    <span>{student.name}</span>
                  </div>
                </div>
              ))}

              <div className="relative bg-gray-900 rounded-lg overflow-hidden border-2 border-[#45B7D1]">
                <video className="w-full h-full object-cover" autoPlay muted>
                  <source src="" type="video/mp4" />
                </video>
                <div className="absolute bottom-2 left-2 bg-[#45B7D1] text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Icon name="User" size={12} />
                  <span>Вы</span>
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
              height={350}
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
                <Icon name="Hand" size={16} />
                <span className="ml-2">Поднять руку</span>
              </Button>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4">
            <h3 className="font-semibold text-white mb-3">Участники</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 p-2 bg-blue-500/20 rounded-lg">
                <Icon name="GraduationCap" size={16} className="text-blue-400" />
                <span className="text-sm text-white">Преподаватель</span>
              </div>
              {students.map((student) => (
                <div key={student.id} className="flex items-center gap-2 p-2 bg-gray-700 rounded-lg">
                  <Icon name="User" size={16} className="text-gray-400" />
                  <span className="text-sm text-white">{student.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 p-2 bg-[#45B7D1]/20 rounded-lg">
                <Icon name="User" size={16} className="text-[#45B7D1]" />
                <span className="text-sm text-white">Вы</span>
              </div>
            </div>
          </Card>

          <Card className="bg-gray-800 border-gray-700 p-4 max-h-[200px] overflow-y-auto">
            <h3 className="font-semibold text-white mb-3">Чат</h3>
            <div className="space-y-2">
              <div className="bg-gray-700 rounded-lg p-2">
                <div className="flex items-center gap-1 mb-1">
                  <span className="text-xs font-medium text-blue-400">Преподаватель</span>
                </div>
                <p className="text-xs text-gray-300">Решим задачу вместе</p>
              </div>
            </div>
            <div className="mt-2">
              <input
                type="text"
                placeholder="Сообщение..."
                className="w-full bg-gray-700 text-white rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[#45B7D1]"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LessonGroup;
