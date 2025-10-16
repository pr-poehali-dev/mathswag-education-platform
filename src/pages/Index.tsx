import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const [isTeacherDialogOpen, setIsTeacherDialogOpen] = useState(false);

  const handleBuyLesson = () => {
    if (!isAuthenticated) {
      toast.error('Войдите в систему, чтобы купить уроки');
      navigate('/login');
    } else {
      toast.success('Перенаправление на страницу оплаты...');
    }
  };

  const handleGoToDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const pricingPlans = [
    {
      name: 'Индивидуальные',
      price: '400₽',
      duration: 'урок',
      lessons: '2500₽ за 10 уроков',
      features: [
        'Индивидуальные занятия 1-на-1',
        'Персональная программа',
        'Интерактивная доска',
        'Запись всех уроков',
        'Домашние задания',
      ],
      popular: false,
    },
    {
      name: 'Групповые',
      price: '410₽',
      duration: 'урок',
      lessons: 'Группа до 6 человек',
      features: [
        'Группа до 6 человек',
        'Совместное решение задач',
        'Общая доска для рисования',
        'Чат и видеосвязь',
        'Поддержка преподавателя',
      ],
      popular: true,
    },
    {
      name: 'Поток',
      price: '200₽',
      duration: 'урок',
      lessons: 'До 30 участников',
      features: [
        'Прямая трансляция урока',
        'Возможность задавать вопросы',
        'Быстрые реакции',
        'Материалы для скачивания',
        'Доступ к записям',
      ],
      popular: false,
    },
  ];

  const teachers = [
    { 
      name: 'Анна Петровна', 
      subject: 'Алгебра и анализ', 
      experience: '12 лет', 
      rating: 4.9,
      description: 'Кандидат педагогических наук, специалист по алгебре и математическому анализу. Работает с учениками 7-11 классов и студентами первых курсов. Более 500 учеников успешно сдали ЕГЭ на 90+ баллов.',
      education: 'МГУ им. М.В. Ломоносова, механико-математический факультет',
      achievements: ['Лучший преподаватель 2023', 'Автор методических пособий', 'Эксперт ЕГЭ']
    },
    { 
      name: 'Михаил Сергеевич', 
      subject: 'Геометрия', 
      experience: '8 лет', 
      rating: 4.8,
      description: 'Преподаватель геометрии с акцентом на наглядные методы обучения. Специализируется на подготовке к олимпиадам и углубленном изучении стереометрии. Помогает ученикам "видеть" геометрию в пространстве.',
      education: 'МФТИ, факультет прикладной математики',
      achievements: ['Призер всероссийской олимпиады', '200+ учеников поступили в топ-вузы', 'Разработчик курса по геометрии']
    },
    { 
      name: 'Елена Ивановна', 
      subject: 'Высшая математика', 
      experience: '15 лет', 
      rating: 5.0,
      description: 'Доцент кафедры высшей математики, специалист по математическому анализу и дифференциальным уравнениям. Готовит студентов технических вузов, помогает с курсовыми и сессиями. Объясняет сложные концепции простым языком.',
      education: 'МГТУ им. Баумана, кафедра высшей математики',
      achievements: ['15 лет преподавания в вузе', 'Автор 20+ научных статей', '100% студентов сдают сессию с первого раза']
    },
  ];

  const openTeacherDialog = (teacher: any) => {
    setSelectedTeacher(teacher);
    setIsTeacherDialogOpen(true);
  };

  const faqs = [
    {
      question: 'Как проходят занятия?',
      answer: 'Занятия проходят онлайн через нашу платформу с видеосвязью, интерактивной доской для рисования и чатом. Вы можете выбрать индивидуальный формат, групповые занятия или потоковые лекции.',
    },
    {
      question: 'Какое оборудование нужно для занятий?',
      answer: 'Вам понадобится компьютер или планшет с камерой и микрофоном, стабильное интернет-соединение и современный браузер. Никакого дополнительного ПО устанавливать не нужно.',
    },
    {
      question: 'Можно ли отменить или перенести урок?',
      answer: 'Да, вы можете отменить или перенести урок не позднее чем за 24 часа до начала. В этом случае урок будет сохранён в вашем балансе.',
    },
    {
      question: 'Как выбрать преподавателя?',
      answer: 'После регистрации вы можете ознакомиться с профилями всех преподавателей, посмотреть их опыт работы, специализацию и отзывы учеников. Первое пробное занятие поможет определиться с выбором.',
    },
    {
      question: 'Есть ли пробный урок?',
      answer: 'Да, мы предлагаем первый пробный урок со скидкой 50%, чтобы вы могли познакомиться с платформой и преподавателем.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-[#45B7D1] to-[#4EDDC4] rounded-2xl flex items-center justify-center">
                <span className="text-white text-2xl font-bold">M</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">MathSwag</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => scrollToSection('home')} className="text-gray-600 hover:text-[#45B7D1] transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('pricing')} className="text-gray-600 hover:text-[#45B7D1] transition-colors">
                Тарифы
              </button>
              <button onClick={() => scrollToSection('teachers')} className="text-gray-600 hover:text-[#45B7D1] transition-colors">
                Преподаватели
              </button>
              <button onClick={() => scrollToSection('faq')} className="text-gray-600 hover:text-[#45B7D1] transition-colors">
                FAQ
              </button>
              <button onClick={() => scrollToSection('contacts')} className="text-gray-600 hover:text-[#45B7D1] transition-colors">
                Контакты
              </button>
            </div>

            <Button onClick={handleGoToDashboard} className="bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90 text-white">
              <Icon name="User" size={16} />
              <span className="ml-2">{isAuthenticated ? `${user?.name}` : 'Войти'}</span>
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="py-20 bg-gradient-to-br from-[#45B7D1]/10 via-white to-[#FF6DC4]/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 leading-tight">
                Учись математике онлайн
              </h1>
              <p className="text-xl text-gray-600">
                Индивидуальные и групповые занятия с лучшими преподавателями. 
                Интерактивная доска, видеосвязь и персональный подход к каждому ученику.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('pricing')}
                  className="bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90 text-white text-lg px-8"
                >
                  Выбрать тариф
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="border-2 border-[#45B7D1] text-[#45B7D1] hover:bg-[#45B7D1] hover:text-white text-lg px-8"
                >
                  Попробовать бесплатно
                </Button>
              </div>
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-[#45B7D1]">500+</div>
                  <div className="text-gray-600">Учеников</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FF6DC4]">15+</div>
                  <div className="text-gray-600">Преподавателей</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#FFA07A]">4.9</div>
                  <div className="text-gray-600">Рейтинг</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#45B7D1]/20 transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">📊</div>
                    <h3 className="font-semibold text-gray-800">Статистика</h3>
                    <p className="text-sm text-gray-600">Отслеживай прогресс</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#FF6DC4]/20 transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">🎯</div>
                    <h3 className="font-semibold text-gray-800">Персонально</h3>
                    <p className="text-sm text-gray-600">Индивидуальная программа</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#4EDDC4]/20 transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">👨‍🏫</div>
                    <h3 className="font-semibold text-gray-800">Эксперты</h3>
                    <p className="text-sm text-gray-600">Лучшие преподаватели</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-[#FFA07A]/20 transform hover:scale-105 transition-transform">
                    <div className="text-4xl mb-2">💻</div>
                    <h3 className="font-semibold text-gray-800">Удобно</h3>
                    <p className="text-sm text-gray-600">Занятия из дома</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Выберите формат обучения</h2>
            <p className="text-xl text-gray-600">Подберём идеальный вариант для ваших целей</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className="relative hover:shadow-2xl transition-all border-2 border-gray-200"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF6DC4] to-[#FFA07A] text-white px-6 py-1 rounded-full text-sm font-semibold">
                    Популярный
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.lessons}</CardDescription>
                  <div className="pt-4">
                    <span className="text-5xl font-bold text-gray-800">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/ {plan.duration}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={handleBuyLesson}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-[#FF6DC4] to-[#FFA07A] hover:opacity-90' 
                        : 'bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90'
                    } text-white`}
                    size="lg"
                  >
                    {isAuthenticated ? 'Купить уроки' : 'Войти для покупки'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="teachers" className="py-20 bg-gradient-to-br from-[#4EDDC4]/10 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Наши преподаватели</h2>
            <p className="text-xl text-gray-600">Профессионалы с многолетним опытом</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <Card 
                key={index} 
                className="border-2 border-gray-200 hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => openTeacherDialog(teacher)}
              >
                <CardHeader className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#45B7D1] to-[#4EDDC4] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                    {teacher.name[0]}
                  </div>
                  <CardTitle className="text-xl">{teacher.name}</CardTitle>
                  <CardDescription>{teacher.subject}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <Icon name="Briefcase" size={16} />
                      <span>Опыт: {teacher.experience}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-yellow-500">
                      <Icon name="Star" size={16} fill="currentColor" />
                      <span className="font-semibold">{teacher.rating}</span>
                    </div>
                  </div>
                  <Button 
                    className="mt-4 bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      openTeacherDialog(teacher);
                    }}
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Часто задаваемые вопросы</h2>
            <p className="text-xl text-gray-600">Ответы на популярные вопросы</p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-2 border-gray-200 rounded-lg px-6">
                <AccordionTrigger className="text-left font-semibold text-gray-800 hover:text-[#45B7D1]">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-gradient-to-br from-[#45B7D1]/10 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Свяжитесь с нами</h2>
            <p className="text-xl text-gray-600 mb-8">Остались вопросы? Мы всегда на связи!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-2 border-[#45B7D1]/20">
                <CardContent className="pt-6 text-center">
                  <Icon name="Mail" size={32} className="mx-auto mb-3 text-[#45B7D1]" />
                  <h3 className="font-semibold mb-2">Email</h3>
                  <p className="text-gray-600">info@mathswag.ru</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[#FF6DC4]/20">
                <CardContent className="pt-6 text-center">
                  <Icon name="Phone" size={32} className="mx-auto mb-3 text-[#FF6DC4]" />
                  <h3 className="font-semibold mb-2">Телефон</h3>
                  <p className="text-gray-600">+7 (495) 123-45-67</p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-[#4EDDC4]/20">
                <CardContent className="pt-6 text-center">
                  <Icon name="MessageCircle" size={32} className="mx-auto mb-3 text-[#4EDDC4]" />
                  <h3 className="font-semibold mb-2">Telegram</h3>
                  <p className="text-gray-600">@mathswag_support</p>
                </CardContent>
              </Card>
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90 text-white text-lg px-12"
            >
              Написать нам
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#45B7D1] to-[#4EDDC4] rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">M</span>
            </div>
            <h2 className="text-2xl font-bold">MathSwag</h2>
          </div>
          <p className="text-gray-400">© 2025 MathSwag. Все права защищены.</p>
        </div>
      </footer>

      <Dialog open={isTeacherDialogOpen} onOpenChange={setIsTeacherDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedTeacher && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-[#45B7D1] to-[#4EDDC4] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {selectedTeacher.name[0]}
                  </div>
                  <div className="text-left">
                    <DialogTitle className="text-2xl">{selectedTeacher.name}</DialogTitle>
                    <DialogDescription className="text-lg">{selectedTeacher.subject}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Icon name="Briefcase" size={20} />
                    <span className="font-medium">Опыт: {selectedTeacher.experience}</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-500">
                    <Icon name="Star" size={20} fill="currentColor" />
                    <span className="font-semibold text-lg">{selectedTeacher.rating}</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Icon name="User" size={18} />
                    О преподавателе
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{selectedTeacher.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <Icon name="GraduationCap" size={18} />
                    Образование
                  </h3>
                  <p className="text-gray-700">{selectedTeacher.education}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <Icon name="Award" size={18} />
                    Достижения
                  </h3>
                  <ul className="space-y-2">
                    {selectedTeacher.achievements.map((achievement: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <Icon name="CheckCircle" size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className="w-full bg-gradient-to-r from-[#45B7D1] to-[#4EDDC4] hover:opacity-90 text-white"
                    size="lg"
                  >
                    Записаться на урок
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;