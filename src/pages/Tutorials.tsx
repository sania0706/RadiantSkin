import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Palette, ArrowLeft, ChevronDown, Clock, Droplets, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Tutorials = () => {
  const navigate = useNavigate();
  const [openSkincare, setOpenSkincare] = useState<number | null>(null);
  const [openMakeup, setOpenMakeup] = useState<number | null>(null);

  const skincareSteps = [
    {
      id: 1,
      name: "Face Wash / Cleanser",
      time: "1-2 minutes",
      tip: "Choose a gentle, pH-balanced cleanser suitable for your skin type",
      procedure: [
        "Wet your face with lukewarm water",
        "Apply a small amount of cleanser to your palms",
        "Gently massage in circular motions for 30-60 seconds",
        "Focus on T-zone and areas with more oil/makeup",
        "Rinse thoroughly with lukewarm water",
        "Pat dry with a clean towel"
      ]
    },
    {
      id: 2,
      name: "Toner",
      time: "30 seconds",
      tip: "Apply toner to balance pH and prep skin for better product absorption",
      procedure: [
        "Apply toner to a cotton pad or your palms",
        "Gently pat or swipe across face avoiding eye area",
        "Start from center and work outward",
        "Allow to absorb for 30 seconds",
        "Don't rinse - let it air dry"
      ]
    },
    {
      id: 3,
      name: "Serum",
      time: "1 minute",
      tip: "Apply serums from thinnest to thickest consistency",
      procedure: [
        "Dispense 2-3 drops of serum onto fingertips",
        "Gently press into skin starting from center",
        "Use upward motions and avoid tugging",
        "Focus on areas of concern (dark spots, fine lines)",
        "Allow 1-2 minutes to absorb before next step"
      ]
    },
    {
      id: 4,
      name: "Eye Patches / Eye Cream",
      time: "15-20 minutes (patches) / 30 seconds (cream)",
      tip: "Use eye patches 2-3 times a week, eye cream daily",
      procedure: [
        "For patches: Apply to clean, dry under-eye area",
        "Leave on for recommended time (usually 15-20 minutes)",
        "For eye cream: Use ring finger to gently tap around orbital bone",
        "Start from inner corner and work outward",
        "Never apply directly on eyelid or too close to lash line"
      ]
    },
    {
      id: 5,
      name: "Moisturizer",
      time: "1 minute",
      tip: "Choose based on skin type - lightweight for oily, rich for dry skin",
      procedure: [
        "Take a pea-sized amount of moisturizer",
        "Warm between palms",
        "Apply in upward circular motions",
        "Cover entire face and neck",
        "Don't forget often-missed areas like around nose and hairline"
      ]
    },
    {
      id: 6,
      name: "Lip Care",
      time: "30 seconds",
      tip: "Use SPF lip balm during day, nourishing treatments at night",
      procedure: [
        "Gently exfoliate lips with soft toothbrush if needed",
        "Apply lip balm or treatment",
        "For overnight: use thicker, more nourishing formulas",
        "Reapply throughout the day as needed"
      ]
    },
    {
      id: 7,
      name: "Sunscreen (Morning Only)",
      time: "1 minute",
      tip: "Use SPF 30+ daily, even indoors. Reapply every 2 hours",
      procedure: [
        "Apply as the final step in morning routine",
        "Use 1/4 teaspoon for face and neck",
        "Apply 15-20 minutes before sun exposure",
        "Don't forget ears, lips, and around eyes",
        "Reapply every 2 hours or after sweating/swimming"
      ]
    }
  ];

  const makeupSteps = [
    {
      id: 1,
      name: "Primer",
      time: "2 minutes",
      tip: "Choose primer based on skin concerns - hydrating, mattifying, or color-correcting",
      procedure: [
        "Start with clean, moisturized skin",
        "Apply primer after skincare has absorbed (wait 5-10 minutes)",
        "Use a small amount and blend outward from center",
        "Focus on areas where makeup tends to fade (T-zone, around nose)",
        "Let primer set for 2-3 minutes before foundation"
      ]
    },
    {
      id: 2,
      name: "Foundation",
      time: "3-5 minutes",
      tip: "Match foundation to your neck, not your face, for the most natural look",
      procedure: [
        "Apply foundation with brush, sponge, or fingers",
        "Start with small amounts and build coverage gradually",
        "Begin at center of face and blend outward",
        "Use stippling motions with sponge for natural finish",
        "Blend down to neck and jawline to avoid harsh lines"
      ]
    },
    {
      id: 3,
      name: "Concealer",
      time: "2-3 minutes",
      tip: "Use one shade lighter than foundation for under-eyes, exact match for blemishes",
      procedure: [
        "Apply concealer after foundation",
        "For under-eyes: draw an upside-down triangle and blend",
        "For blemishes: pat directly on spot and blend edges",
        "Set with translucent powder to prevent creasing",
        "Use small amounts and build as needed"
      ]
    },
    {
      id: 4,
      name: "Contour",
      time: "3-4 minutes",
      tip: "Use a shade 2-3 times darker than your skin tone for natural-looking shadows",
      procedure: [
        "Apply contour to hollows of cheeks, temples, jawline",
        "Use angled brush for precision",
        "Blend in circular motions to avoid harsh lines",
        "Focus on areas you want to recede or define",
        "Build gradually - you can always add more"
      ]
    },
    {
      id: 5,
      name: "Blush",
      time: "1-2 minutes",
      tip: "Smile to find the apples of your cheeks for the most natural placement",
      procedure: [
        "Tap excess product off brush",
        "Apply to apples of cheeks first",
        "Blend upward toward temples",
        "Use circular motions for cream blush",
        "Start light and build color gradually"
      ]
    },
    {
      id: 6,
      name: "Eye Makeup",
      time: "5-10 minutes",
      tip: "Always use eyeshadow primer for longer-lasting, more vibrant colors",
      procedure: [
        "Apply eyeshadow primer to entire lid",
        "Start with transition shade in crease",
        "Apply main color to lid with flat brush",
        "Add darker shade to outer corner if desired",
        "Highlight inner corner and brow bone",
        "Apply eyeliner close to lash line",
        "Finish with mascara from roots to tips"
      ]
    },
    {
      id: 7,
      name: "Lipstick",
      time: "2 minutes",
      tip: "Exfoliate and moisturize lips before applying for smoother application",
      procedure: [
        "Line lips with lip liner if desired",
        "Apply lipstick from center outward",
        "Use brush for precise application",
        "Blot with tissue and reapply for longevity",
        "Clean up edges with concealer if needed"
      ]
    },
    {
      id: 8,
      name: "Setting Spray/Powder",
      time: "1 minute",
      tip: "Use powder for oily skin, setting spray for dry skin, or both for maximum longevity",
      procedure: [
        "For powder: lightly dust over T-zone and under-eyes",
        "For setting spray: hold 6-8 inches from face",
        "Spray in X pattern, then T pattern",
        "Let setting spray dry naturally",
        "Don't rub or touch face while drying"
      ]
    }
  ];

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Beauty Tutorials</h1>
          <p className="text-xl text-gray-600">Step-by-step guides for perfect skincare and makeup routines</p>
        </div>

        <Tabs defaultValue="skincare" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="skincare" className="flex items-center space-x-2">
              <Droplets className="h-4 w-4" />
              <span>Skincare Routine</span>
            </TabsTrigger>
            <TabsTrigger value="makeup" className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4" />
              <span>Makeup Application</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skincare">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 General Skincare Tips</h3>
                <ul className="text-blue-800 space-y-1">
                  <li>• Always apply products to clean hands</li>
                  <li>• Wait 1-2 minutes between each step for better absorption</li>
                  <li>• Patch test new products before full application</li>
                  <li>• Be gentle - your skin is delicate</li>
                  <li>• Consistency is key - stick to your routine daily</li>
                </ul>
              </div>

              {skincareSteps.map((step, index) => (
                <Collapsible 
                  key={step.id}
                  open={openSkincare === step.id}
                  onOpenChange={() => setOpenSkincare(openSkincare === step.id ? null : step.id)}
                >
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-rose-600 border-rose-300">
                              Step {index + 1}
                            </Badge>
                            <CardTitle className="text-lg">{step.name}</CardTitle>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{step.time}</span>
                            </div>
                          </div>
                          <ChevronDown className={`h-5 w-5 transition-transform ${openSkincare === step.id ? 'rotate-180' : ''}`} />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-green-900 mb-2">💡 Pro Tip:</h4>
                          <p className="text-green-800">{step.tip}</p>
                        </div>
                        <h4 className="font-semibold mb-3">How to Apply:</h4>
                        <ol className="space-y-2">
                          {step.procedure.map((instruction, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="bg-rose-100 text-rose-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-gray-700">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="makeup">
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">💄 General Makeup Tips</h3>
                <ul className="text-purple-800 space-y-1">
                  <li>• Start with well-moisturized skin for smoother application</li>
                  <li>• Use clean brushes and tools to avoid breakouts</li>
                  <li>• Natural light is best for color matching</li>
                  <li>• Build coverage gradually - you can always add more</li>
                  <li>• Blend, blend, blend for seamless results</li>
                </ul>
              </div>

              {makeupSteps.map((step, index) => (
                <Collapsible 
                  key={step.id}
                  open={openMakeup === step.id}
                  onOpenChange={() => setOpenMakeup(openMakeup === step.id ? null : step.id)}
                >
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="text-purple-600 border-purple-300">
                              Step {index + 1}
                            </Badge>
                            <CardTitle className="text-lg">{step.name}</CardTitle>
                            <div className="flex items-center space-x-1 text-gray-500">
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{step.time}</span>
                            </div>
                          </div>
                          <ChevronDown className={`h-5 w-5 transition-transform ${openMakeup === step.id ? 'rotate-180' : ''}`} />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="pt-0">
                        <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-4">
                          <h4 className="font-semibold text-pink-900 mb-2">💡 Pro Tip:</h4>
                          <p className="text-pink-800">{step.tip}</p>
                        </div>
                        <h4 className="font-semibold mb-3">Application Steps:</h4>
                        <ol className="space-y-2">
                          {step.procedure.map((instruction, idx) => (
                            <li key={idx} className="flex items-start space-x-2">
                              <span className="bg-purple-100 text-purple-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="text-gray-700">{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center">
          <Button 
            className="bg-rose-500 hover:bg-rose-600 text-white"
            onClick={() => navigate('/#products')}
          >
            Shop Products for Your Routine
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Tutorials;