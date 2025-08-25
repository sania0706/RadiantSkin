import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, ArrowLeft } from "lucide-react";
import React from "react";

const allProducts = [
  {
    id: "1",
    name: "Hydrating Vitamin C Serum",
    price: "₹3,750",
    category: "skincare",
    type: "serum",
    skinType: ["all", "dry", "normal"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    description: "A powerful serum formulated with Vitamin C to brighten, hydrate, and protect your skin from environmental damage.",
    ingredients: ["Ascorbic Acid (Vitamin C)", "Hyaluronic Acid", "Glycerin", "Water"],
    usage: "Apply 2-3 drops to clean, dry skin every morning. Follow with moisturizer and sunscreen.",
    benefits: ["Brightens complexion", "Reduces dark spots", "Provides antioxidant protection", "Hydrates skin"]
  },
  {
    id: "2",
    name: "Matte Foundation SPF 30",
    price: "₹3,150",
    category: "makeup",
    type: "foundation",
    skinType: ["oily", "combination"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    description: "A long-lasting, oil-free foundation that provides a flawless matte finish and broad-spectrum sun protection.",
    ingredients: ["Titanium Dioxide", "Zinc Oxide", "Silica", "Dimethicone"],
    usage: "Apply with a sponge or brush, blending from the center of the face outward. Build coverage as needed.",
    benefits: ["Controls oil and shine", "Provides sun protection", "Long-lasting wear", "Smooth, matte finish"]
  },
  {
    id: "3",
    name: "Gentle Cleansing Oil",
    price: "₹2,650",
    category: "skincare",
    type: "cleanser",
    skinType: ["all", "sensitive", "dry"],
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    description: "A nourishing cleansing oil that effectively removes makeup and impurities without stripping the skin of its natural moisture.",
    ingredients: ["Jojoba Oil", "Sunflower Seed Oil", "Vitamin E"],
    usage: "Massage onto dry skin, then add water to emulsify and rinse thoroughly.",
    benefits: ["Deeply cleanses pores", "Dissolves waterproof makeup", "Leaves skin soft and hydrated", "Suitable for sensitive skin"]
  },
  {
    id: "4",
    name: "Luminous Highlighter Palette",
    price: "₹2,300",
    category: "makeup",
    type: "highlighter",
    skinType: ["all"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    description: "A versatile palette with three multi-dimensional shades to create a radiant, glowing look for all skin tones.",
    ingredients: ["Mica", "Talc", "Magnesium Stearate", "Jojoba Esters"],
    usage: "Apply to the high points of the face (cheekbones, brow bone, nose bridge) using a brush.",
    benefits: ["Instant radiance", "Blendable and buildable formula", "Long-lasting glow", "Suitable for all skin tones"]
  },
  {
    id: "5",
    name: "Niacinamide Pore Refining Toner",
    price: "₹2,150",
    category: "skincare",
    type: "toner",
    skinType: ["oily", "combination", "acne-prone"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    description: "An alcohol-free toner with Niacinamide to minimize the appearance of pores, control oil, and improve skin texture.",
    ingredients: ["Niacinamide", "Witch Hazel", "Aloe Vera", "Water"],
    usage: "After cleansing, saturate a cotton pad and gently swipe over face and neck. Use morning and night.",
    benefits: ["Reduces pore size", "Balances oil production", "Improves uneven skin tone", "Soothes skin"]
  },
  {
    id: "6",
    name: "Dewy Finish Setting Spray",
    price: "₹2,000",
    category: "makeup",
    type: "setting spray",
    skinType: ["dry", "normal"],
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1583241800698-14828451b28d?w=400&h=400&fit=crop",
    description: "A lightweight setting spray that locks makeup in place for hours while giving a radiant, dewy finish.",
    ingredients: ["Glycerin", "Green Tea Extract", "Coconut Water", "Water"],
    usage: "After applying makeup, shake well and hold 8-10 inches away from face. Spray in an 'X' and 'T' formation.",
    benefits: ["Melts makeup together", "Provides a luminous finish", "Extends makeup wear", "Hydrating formula"]
  },
  {
    id: "7",
    name: "Nourishing Argan Oil Shampoo",
    price: "₹1,800",
    category: "haircare",
    type: "shampoo",
    skinType: ["all"],
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1617038234857-e630db00067a?w=400&h=400&fit=crop",
    description: "Sulfate-free shampoo infused with argan oil to cleanse and nourish hair.",
    ingredients: ["Argan Oil", "Keratin", "Biotin"],
    usage: "Apply to wet hair, lather, and rinse. Follow with conditioner.",
    benefits: ["Strengthens hair", "Adds shine", "Prevents breakage"]
  },
  {
    id: "8",
    name: "Deep Hydration Conditioner",
    price: "₹1,800",
    category: "haircare",
    type: "conditioner",
    skinType: ["dry"],
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1628172922119-974a4413997f?w=400&h=400&fit=crop",
    description: "Restores moisture for soft, manageable hair.",
    ingredients: ["Shea Butter", "Coconut Oil", "Aloe Vera"],
    usage: "After shampooing, apply to hair ends and rinse after 2-3 minutes.",
    benefits: ["Deeply hydrates hair", "Detangles and smooths", "Reduces frizz"]
  },
  {
    id: "9",
    name: "Soothing Body Wash",
    price: "₹1,500",
    category: "bodycare",
    type: "body wash",
    skinType: ["sensitive", "dry"],
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1629851688755-f851080b06b0?w=400&h=400&fit=crop",
    description: "Gentle body wash with natural extracts to soothe and cleanse the skin.",
    ingredients: ["Chamomile Extract", "Oatmeal", "Glycerin"],
    usage: "Lather onto wet skin and rinse thoroughly.",
    benefits: ["Calms irritated skin", "Hydrating formula", "Gentle for daily use"]
  },
  {
    id: "10",
    name: "Daily Body Lotion",
    price: "₹1,650",
    category: "bodycare",
    type: "lotion",
    skinType: ["all", "dry", "normal"],
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1580870341775-f538e1a72179?w=400&h=400&fit=crop",
    description: "Lightweight, non-greasy lotion for daily use that locks in moisture.",
    ingredients: ["Hyaluronic Acid", "Shea Butter", "Vitamin E"],
    usage: "Apply daily to clean, dry skin, massaging until fully absorbed.",
    benefits: ["24-hour hydration", "Quick-absorbing", "Leaves skin feeling soft and smooth"]
  },
];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    alert(`Added "${product.name}" to cart!`);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case "skincare": return "bg-green-100 text-green-800";
      case "makeup": return "bg-purple-100 text-purple-800";
      case "haircare": return "bg-yellow-100 text-yellow-800";
      case "bodycare": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-700 hover:text-rose-500"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Button>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
              Radiant Skin
            </span>
          </div>
          <div></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className={getCategoryColor(product.category)}>
                {capitalizeFirstLetter(product.type)}
              </Badge>
              <div className="flex items-center space-x-1 text-gray-500">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{product.rating}</span>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-2xl font-semibold text-rose-500">{product.price}</p>
            <p className="text-gray-700">{product.description}</p>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">Key Benefits</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">How to Use</h3>
                <p className="text-gray-600">{product.usage}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Ingredients</h3>
                <p className="text-gray-600">{product.ingredients.join(', ')}</p>
              </div>
            </div>

            <Button 
              size="lg"
              className="w-full bg-rose-500 hover:bg-rose-600 text-white"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Placeholder for Reviews and Related Products */}
        <div className="mt-20 space-y-12">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Related Products</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Similar products will be displayed here.</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;