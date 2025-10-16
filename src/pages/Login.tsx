import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Icon from '@/components/ui/icon';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        toast.success('Вход выполнен успешно!');
        navigate('/dashboard');
      } else {
        if (result.error === 'account_not_found') {
          toast.error('Аккаунта с этой электронной почтой не существует');
        } else if (result.error === 'wrong_password') {
          toast.error('Неверный пароль');
        } else {
          toast.error('Ошибка входа');
        }
      }
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        toast.error('Заполните все поля');
        return;
      }

      const result = await register(formData.name, formData.email, formData.password);
      if (result.success) {
        toast.success('Регистрация успешна! Добро пожаловать!');
        navigate('/dashboard');
      } else {
        if (result.error === 'email_exists') {
          toast.error('Пользователь с таким email уже существует');
        } else {
          toast.error('Ошибка регистрации');
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#45B7D1]/10 via-white to-[#FF6DC4]/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-gray-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#45B7D1] to-[#4EDDC4] rounded-2xl flex items-center justify-center">
              <span className="text-white text-3xl font-bold">M</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            {isLogin ? 'Вход' : 'Регистрация'}
          </CardTitle>
          <CardDescription>
            {isLogin 
              ? 'Войдите в свой аккаунт для продолжения' 
              : 'Создайте аккаунт и начните обучение'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Введите ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90 text-white"
              size="lg"
            >
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#45B7D1] hover:underline text-sm"
            >
              {isLogin 
                ? 'Нет аккаунта? Зарегистрируйтесь' 
                : 'Уже есть аккаунт? Войдите'}
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/')}
            >
              <Icon name="ArrowLeft" size={16} />
              <span className="ml-2">Вернуться на главную</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;