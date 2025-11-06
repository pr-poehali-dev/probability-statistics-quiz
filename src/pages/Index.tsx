import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  category: 'taxi' | 'tables';
}

const questions: Question[] = [
  {
    id: 1,
    category: 'taxi',
    text: 'В городе работают 5 служб такси. Вероятность того, что машина первой службы свободна в данный момент, равна 0,3. Для остальных четырёх служб эти вероятности равны 0,2; 0,1; 0,4 и 0,5 соответственно. Найдите вероятность того, что среди всех служб найдётся хотя бы одна свободная машина.',
    options: ['0,992', '0,850', '0,750', '0,900'],
    correctAnswer: 0,
    hint: 'Используйте формулу вероятности противоположного события: P(хотя бы одна) = 1 - P(ни одной)'
  },
  {
    id: 2,
    category: 'taxi',
    text: 'Клиент звонит в три службы такси. Вероятности принятия заказа для каждой службы равны 0,6; 0,7 и 0,5 соответственно. Какова вероятность того, что заказ примут хотя бы в двух службах?',
    options: ['0,59', '0,65', '0,72', '0,45'],
    correctAnswer: 0,
    hint: 'Рассчитайте вероятность для всех комбинаций: принят в двух службах и принят во всех трёх'
  },
  {
    id: 3,
    category: 'taxi',
    text: 'Вероятность того, что такси приедет за 10 минут, равна 0,8. Клиент вызвал две машины. Найдите вероятность того, что хотя бы одна из них приедет вовремя.',
    options: ['0,96', '0,80', '0,64', '0,92'],
    correctAnswer: 0,
    hint: 'P(хотя бы одна) = 1 - P(обе опоздают)'
  },
  {
    id: 4,
    category: 'taxi',
    text: 'Служба такси имеет 10 свободных машин. Вероятность того, что машина занята, равна 0,4 для каждой. Найдите вероятность того, что свободны ровно 6 машин.',
    options: ['0,251', '0,200', '0,300', '0,150'],
    correctAnswer: 0,
    hint: 'Используйте формулу Бернулли: P(k) = C(n,k) × p^k × (1-p)^(n-k)'
  },
  {
    id: 5,
    category: 'tables',
    text: 'За круглым столом случайным образом рассаживаются 5 человек. Какова вероятность того, что два определённых человека окажутся рядом?',
    options: ['0,5', '0,4', '0,25', '0,33'],
    correctAnswer: 0,
    hint: 'Для круглого стола фиксируем положение одного человека, затем считаем благоприятные позиции для второго'
  },
  {
    id: 6,
    category: 'tables',
    text: 'За круглым столом сидят 6 человек. Найдите вероятность того, что три конкретных человека будут сидеть подряд.',
    options: ['0,1', '0,15', '0,20', '0,25'],
    correctAnswer: 0,
    hint: 'Считаем группу из трёх человек как один объект. Расставляем 4 объекта по кругу, учитывая внутренние перестановки'
  },
  {
    id: 7,
    category: 'tables',
    text: 'За круглым столом случайно рассаживаются 4 мальчика и 4 девочки. Какова вероятность того, что мальчики и девочки будут чередоваться?',
    options: ['0,014', '0,020', '0,125', '0,050'],
    correctAnswer: 0,
    hint: 'Фиксируем мальчиков, затем размещаем девочек между ними. Делим на общее число способов'
  },
  {
    id: 8,
    category: 'tables',
    text: 'За круглым столом сидят 7 человек. Найдите вероятность того, что два конкретных человека НЕ окажутся рядом.',
    options: ['0,667', '0,500', '0,333', '0,714'],
    correctAnswer: 0,
    hint: 'P(не рядом) = 1 - P(рядом). Сначала найдите вероятность того, что они сидят рядом'
  }
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    setShowHint(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    setShowHint(false);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length;
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    setShowHint(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const score = calculateScore();

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 animate-scale-in shadow-xl">
            <div className="text-center space-y-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                <Icon name="Trophy" size={48} className="text-white" />
              </div>
              
              <h1 className="text-4xl font-bold text-foreground">Тест завершён!</h1>
              
              <div className="text-6xl font-bold text-primary">
                {score} / {questions.length}
              </div>
              
              <p className="text-xl text-muted-foreground">
                {score === questions.length && 'Отлично! Вы ответили правильно на все вопросы! 🎉'}
                {score >= questions.length * 0.75 && score < questions.length && 'Хороший результат! Продолжайте практиковаться! 👏'}
                {score >= questions.length * 0.5 && score < questions.length * 0.75 && 'Неплохо! Есть над чем поработать 📚'}
                {score < questions.length * 0.5 && 'Рекомендуем повторить материал по теории вероятностей 📖'}
              </p>

              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-semibold">Результаты по категориям:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Car" className="text-primary" />
                      <h4 className="font-semibold">Задачи про такси</h4>
                    </div>
                    <p className="text-2xl font-bold text-primary">
                      {selectedAnswers.slice(0, 4).filter((answer, index) => answer === questions[index].correctAnswer).length} / 4
                    </p>
                  </Card>
                  
                  <Card className="p-4 bg-gradient-to-br from-secondary/5 to-secondary/10">
                    <div className="flex items-center gap-3 mb-2">
                      <Icon name="Users" className="text-secondary" />
                      <h4 className="font-semibold">Задачи про круглые столы</h4>
                    </div>
                    <p className="text-2xl font-bold text-secondary">
                      {selectedAnswers.slice(4, 8).filter((answer, index) => answer === questions[index + 4].correctAnswer).length} / 4
                    </p>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button onClick={restartQuiz} size="lg" className="gap-2">
                  <Icon name="RotateCcw" size={20} />
                  Пройти заново
                </Button>
                <Button 
                  onClick={() => window.print()} 
                  variant="outline" 
                  size="lg"
                  className="gap-2"
                >
                  <Icon name="Printer" size={20} />
                  Распечатать результаты
                </Button>
              </div>
            </div>
          </Card>

          <Card className="mt-8 p-6 animate-fade-in">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Поделиться тестом</h3>
              <p className="text-muted-foreground">Отсканируйте QR-код для быстрого доступа к тесту</p>
              <div className="inline-block p-4 bg-white rounded-lg">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(window.location.href)}`}
                  alt="QR код для доступа к тесту"
                  className="w-48 h-48"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline" className="gap-2">
              {question.category === 'taxi' ? (
                <>
                  <Icon name="Car" size={16} />
                  Такси
                </>
              ) : (
                <>
                  <Icon name="Users" size={16} />
                  Круглые столы
                </>
              )}
            </Badge>
            <span className="text-sm text-muted-foreground font-medium">
              Вопрос {currentQuestion + 1} из {questions.length}
            </span>
          </div>

          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground text-right">{Math.round(progress)}% завершено</p>
        </div>

        <Card className="p-8 animate-slide-up shadow-xl">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground leading-relaxed">
              {question.text}
            </h2>

            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString() || ''}
              onValueChange={(value) => handleAnswer(parseInt(value))}
            >
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 rounded-lg border-2 transition-all hover:bg-accent/5 hover:border-accent cursor-pointer"
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer text-lg"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>

            {showHint && (
              <Card className="p-4 bg-secondary/10 border-secondary animate-scale-in">
                <div className="flex gap-3">
                  <Icon name="Lightbulb" className="text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary mb-1">Подсказка:</h4>
                    <p className="text-sm text-foreground">{question.hint}</p>
                  </div>
                </div>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={() => setShowHint(!showHint)}
                variant="outline"
                className="gap-2"
              >
                <Icon name="Lightbulb" size={18} />
                {showHint ? 'Скрыть подсказку' : 'Показать подсказку'}
              </Button>

              <div className="flex gap-3 sm:ml-auto">
                {currentQuestion > 0 && (
                  <Button onClick={handlePrevious} variant="outline" className="gap-2">
                    <Icon name="ChevronLeft" size={18} />
                    Назад
                  </Button>
                )}
                
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswers[currentQuestion] === null}
                  className="gap-2"
                >
                  {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее'}
                  <Icon name="ChevronRight" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="font-semibold text-lg mb-1">Нужен доступ к тесту?</h3>
              <p className="text-sm text-muted-foreground">
                Отсканируйте QR-код на телефоне для быстрого доступа
              </p>
            </div>
            <div className="p-3 bg-white rounded-lg">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=${encodeURIComponent(window.location.href)}`}
                alt="QR код"
                className="w-24 h-24"
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
