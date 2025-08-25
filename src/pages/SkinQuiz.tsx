import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, ArrowLeft, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuizOption {
  value: string;
  label: string;
  points: Record<string, number>;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

const SkinQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, QuizOption>>({});
  const [result, setResult] = useState<string | null>(null);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "How does your skin feel by midday?",
      options: [
        { value: "tight-dry", label: "Tight and dry", points: { dry: 3, sensitive: 1 } },
        { value: "comfortable", label: "Comfortable and balanced", points: { normal: 3 } },
        { value: "oily-tzone", label: "Oily in T-zone, normal elsewhere", points: { combination: 3 } },
        { value: "oily-all", label: "Oily all over", points: { oily: 3 } }
      ]
    },
    {
      id: 2,
      question: "How often do you experience breakouts?",
      options: [
        { value: "never", label: "Never or very rarely", points: { normal: 2, dry: 1 } },
        { value: "occasionally", label: "Occasionally", points: { normal: 1, combination: 2 } },
        { value: "frequently", label: "Frequently", points: { oily: 2, acne: 3 } },
        { value: "constantly", label: "Almost constantly", points: { acne: 3, oily: 1 } }
      ]
    },
    {
      id: 3,
      question: "How does your skin react to new products?",
      options: [
        { value: "no-reaction", label: "No reaction, adapts easily", points: { normal: 3 } },
        { value: "slight-reaction", label: "Slight reaction that settles", points: { normal: 1, sensitive: 1 } },
        { value: "sensitive-reaction", label: "Often gets irritated or red", points: { sensitive: 3 } },
        { value: "breakout-reaction", label: "Tends to break out", points: { acne: 2, oily: 1 } }
      ]
    },
    {
      id: 4,
      question: "How would you describe your pore size?",
      options: [
        { value: "barely-visible", label: "Barely visible", points: { dry: 2, normal: 1 } },
        { value: "small-medium", label: "Small to medium", points: { normal: 3 } },
        { value: "medium-large", label: "Medium to large", points: { combination: 2, oily: 1 } },
        { value: "large-visible", label: "Large and very visible", points: { oily: 3 } }
      ]
    }
  ];

  const skinTypes = {
    dry: {
      name: "Dry Skin",
      description: "Your skin needs extra hydration and gentle, nourishing ingredients.",
      recommendations: ["Hyaluronic Acid Serum", "Rich Moisturizer", "Gentle Cleanser"],
      icon: "挑"
    },
    oily: {
      name: "Oily Skin",
      description: "Your skin benefits from oil-controlling ingredients and lightweight formulas.",
      recommendations: ["Niacinamide Serum", "Oil-Free Moisturizer", "Salicylic Acid Cleanser"],
      icon: "検"
    },
    combination: {
      name: "Combination Skin",
      description: "Your skin needs balanced care for different areas of your face.",
      recommendations: ["Gentle Toner", "Lightweight Moisturizer", "Targeted Treatments"],
      icon: "笞厄ｸ"
    },
    normal: {
      name: "Normal Skin",
      description: "Your skin is well-balanced and just needs maintenance and protection.",
      recommendations: ["Vitamin C Serum", "Daily Moisturizer", "Gentle Cleanser"],
      icon: "笨ｨ"
    },
    sensitive: {
      name: "Sensitive Skin",
      description: "Your skin needs gentle, fragrance-free products with soothing ingredients.",
      recommendations: ["Gentle Cleanser", "Fragrance-Free Moisturizer", "Calming Serum"],
      icon: "減"
    },
    acne: {
      name: "Acne-Prone Skin",
      description: "Your skin needs targeted treatments to prevent and treat breakouts.",
      recommendations: ["Salicylic Acid Treatment", "Non-comedogenic Moisturizer", "Gentle Cleanser"],
      icon: "識"
    }
  };

  const handleAnswer = (option: QuizOption) => {
    const newAnswers = { ...answers, [currentQuestion]: option };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: Record<number, QuizOption>) => {
    const scores = { dry: 0, oily: 0, combination: 0, normal: 0, sensitive: 0, acne: 0 };

    Object.values(allAnswers).forEach(answer => {
      Object.entries(answer.points).forEach(([skinType, points]) => {
        scores[skinType as keyof typeof scores] += points;
      });
    });

    const topSkinType = Object.entries(scores).reduce((a, b) => 
      scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores] ? a : b
    )[0];

    setResult(topSkinType);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
  };

  if (result) {
    const skinTypeInfo = skinTypes[result];
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
        {/* Navigation */}
        <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Palette className="h-8 w-8 text-rose-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Radiant Skin
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Home</span>
              </Button>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Skin Quiz Results</h1>
          </div>

          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">{skinTypeInfo.icon}</div>
              <CardTitle className="text-3xl text-rose-500">{skinTypeInfo.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-xl text-gray-600 mb-6">{skinTypeInfo.description}</p>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Recommended Products:</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {skinTypeInfo.recommendations.map((product, index) => (
                    <Badge key={index} variant="secondary" className="text-sm px-3 py-1">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                  onClick={() => navigate('/#products')}
                >
                  Shop Recommended Products
                </Button>
                <Button 
                  variant="outline"
                  onClick={resetQuiz}
                >
                  Retake Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Radiant Skin
              </span>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Your Skin Type</h1>
          <p className="text-xl text-gray-600">Answer a few questions to get personalized product recommendations</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-rose-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              {questions[currentQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4 hover:bg-rose-50 hover:border-rose-300"
                  onClick={() => handleAnswer(option)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SkinQuiz;