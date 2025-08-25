import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingBag, Eye, Palette, Menu, X, ArrowDown, Trash2, Droplets, Leaf } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeType, setActiveType] = useState("all");
  const [selectedSkinType, setSelectedSkinType] = useState<string | null>(null);
  const [cart, setCart] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const products = [
    {
      id: "1",
      name: "Hydrating Vitamin C Serum",
      price: "₹3,750",
      category: "skincare",
      type: "serum",
      skinType: ["all", "dry", "normal"],
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
      description: "Brightening serum for all skin types"
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
      description: "Long-lasting foundation with sun protection"
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
      description: "Removes makeup while nourishing skin"
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
      description: "Multi-dimensional glow for every skin tone"
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
      description: "Minimizes pores and controls oil"
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
      description: "Sets makeup with a natural glow"
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
      description: "Sulfate-free shampoo infused with argan oil."
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
      description: "Restores moisture for soft, manageable hair."
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
      description: "Gentle body wash with natural extracts."
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
      description: "Lightweight, non-greasy lotion for daily use."
    },
  ];

  const skinTypes = [
    { id: "all", name: "All Skin Types", icon: "💧" },
    { id: "dry", name: "Dry", icon: "🌵" },
    { id: "oily", name: "Oily", icon: "💦" },
    { id: "combination", name: "Combination", icon: "☯️" },
    { id: "sensitive", name: "Sensitive", icon: "🌸" },
    { id: "acne-prone", name: "Acne-Prone", icon: "🎯" }
  ];

  const subcategories = {
    "skincare": ["All", "Cleanser", "Toner", "Serum"],
    "makeup": ["All", "Foundation", "Highlighter", "Setting Spray"],
    "haircare": ["All", "Shampoo", "Conditioner"],
    "bodycare": ["All", "Body Wash", "Lotion"],
  };

  const getFilteredProducts = () => {
    let filtered = products;

    if (selectedSkinType && selectedSkinType !== "all") {
      filtered = filtered.filter(product => product.skinType.includes(selectedSkinType));
    }
    
    if (activeCategory !== "all") {
      filtered = filtered.filter(product => product.category === activeCategory);
    }

    if (activeType !== "all") {
      filtered = filtered.filter(product => product.type === activeType);
    }
    
    return filtered;
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existingProduct = prev.find(item => item.id === product.id);
      if (existingProduct) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };
  
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleSkinTypeClick = (skinType) => {
    setSelectedSkinType(skinType.id);
    setActiveCategory("all");
    setActiveType("all");
    
    setTimeout(() => {
      const element = document.getElementById('products');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    setActiveType("all");
    setSelectedSkinType(null);
  };

  const handleTypeClick = (type) => {
    setActiveType(type.toLowerCase());
  };

  const handleTutorials = () => {
    navigate('/tutorials');
  };

  const handleSkinQuiz = () => {
    navigate('/skin-quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Palette className="h-8 w-8 text-rose-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                Radiant Skin
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('products')} 
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Shop
              </button>
              <button 
                onClick={handleTutorials} 
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Tutorials
              </button>
              <button 
                onClick={handleSkinQuiz} 
                className="text-gray-700 hover:text-rose-500 transition-colors"
              >
                Skin Quiz
              </button>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    className="bg-rose-500 hover:bg-rose-600 text-white"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Cart ({cart.reduce((total, item) => total + item.quantity, 0)})
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Your Cart</DrawerTitle>
                      <DrawerDescription>Items you have added to your cart.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      {cart.length > 0 ? (
                        <ul className="space-y-4">
                          {cart.map(item => (
                            <li key={item.id} className="flex items-center space-x-4">
                              <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">{item.price} x {item.quantity}</p>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                      )}
                    </div>
                    <DrawerFooter>
                      <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                        Checkout
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">
                          Close
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-rose-100">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button 
                onClick={() => scrollToSection('products')} 
                className="block px-3 py-2 text-gray-700 hover:text-rose-500 transition-colors w-full text-left"
              >
                Shop
              </button>
              <button 
                onClick={handleTutorials} 
                className="block px-3 py-2 text-gray-700 hover:text-rose-500 transition-colors w-full text-left"
              >
                Tutorials
              </button>
              <button 
                onClick={handleSkinQuiz} 
                className="block px-3 py-2 text-gray-700 hover:text-rose-500 transition-colors w-full text-left"
              >
                Skin Quiz
              </button>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button 
                    className="bg-rose-500 hover:bg-rose-600 text-white w-full"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Cart ({cart.length})
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Your Cart</DrawerTitle>
                      <DrawerDescription>Items you have added to your cart.</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                      {cart.length > 0 ? (
                        <ul className="space-y-4">
                          {cart.map(item => (
                            <li key={item.id} className="flex items-center space-x-4">
                              <img src={item.image} alt={item.name} className="h-12 w-12 rounded-md object-cover" />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">{item.price} x {item.quantity}</p>
                              </div>
                              <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)}>
                                <Trash2 className="h-4 w-4 text-red-500" />
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                      )}
                    </div>
                    <DrawerFooter>
                      <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                        Checkout
                      </Button>
                      <DrawerClose asChild>
                        <Button variant="outline">
                          Close
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-gray-900">Beauty That</span>
                <br />
                <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Loves Your Skin
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover personalized skincare and makeup products designed for every skin type. 
                From gentle cleansers to bold lipsticks, we've got your beauty journey covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3"
                  onClick={() => scrollToSection('products')}
                >
                  Shop Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-rose-300 text-rose-600 hover:bg-rose-50 px-8 py-3"
                  onClick={handleSkinQuiz}
                >
                  Take Our Skin Quiz
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-rose-100 to-pink-100 p-8">
                <img 
                  src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=600&fit=crop" 
                  alt="Beautiful woman with natural makeup"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9/5</span>
                  <span className="text-gray-500">10k+ reviews</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skin Type Guide */}
      <section className="py-16 bg-white" id="skin-types">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Match</h2>
            <p className="text-xl text-gray-600">Products tailored to your unique skin type</p>
            {selectedSkinType && (
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Badge variant="outline" className="text-rose-600 border-rose-300">
                  Showing products for: {skinTypes.find(type => type.id === selectedSkinType)?.name}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedSkinType(null)}
                  className="text-rose-600 hover:text-rose-700"
                >
                  Clear filter
                </Button>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {skinTypes.map((type) => (
              <Card 
                key={type.id} 
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  selectedSkinType === type.id ? 'ring-2 ring-rose-500 bg-rose-50' : ''
                }`}
                onClick={() => handleSkinTypeClick(type)}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-3">{type.icon}</div>
                  <h3 className="font-semibold text-gray-900">{type.name}</h3>
                  {selectedSkinType === type.id && (
                    <ArrowDown className="h-4 w-4 mx-auto mt-2 text-rose-500 animate-bounce" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50" id="products">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {activeCategory === "all" ? "All Collections" : capitalizeFirstLetter(activeCategory)}
            </h2>
            <div className="flex flex-wrap justify-center space-x-2 space-y-2 mb-8">
              <Button 
                variant={activeCategory === "all" ? "default" : "outline"}
                onClick={() => handleCategoryClick("all")}
                className={activeCategory === "all" ? "bg-rose-500 text-white" : ""}
              >
                All Products
              </Button>
              <Button 
                variant={activeCategory === "skincare" ? "default" : "outline"}
                onClick={() => handleCategoryClick("skincare")}
                className={activeCategory === "skincare" ? "bg-rose-500 text-white" : ""}
              >
                <Droplets className="h-4 w-4 mr-2" />
                Skincare
              </Button>
              <Button 
                variant={activeCategory === "makeup" ? "default" : "outline"}
                onClick={() => handleCategoryClick("makeup")}
                className={activeCategory === "makeup" ? "bg-rose-500 text-white" : ""}
              >
                <Palette className="h-4 w-4 mr-2" />
                Makeup
              </Button>
              <Button 
                variant={activeCategory === "haircare" ? "default" : "outline"}
                onClick={() => handleCategoryClick("haircare")}
                className={activeCategory === "haircare" ? "bg-rose-500 text-white" : ""}
              >
                <Leaf className="h-4 w-4 mr-2" />
                Haircare
              </Button>
              <Button 
                variant={activeCategory === "bodycare" ? "default" : "outline"}
                onClick={() => handleCategoryClick("bodycare")}
                className={activeCategory === "bodycare" ? "bg-rose-500 text-white" : ""}
              >
                <Droplets className="h-4 w-4 mr-2" />
                Bodycare
              </Button>
            </div>
            
            {/* Subcategory Buttons */}
            {activeCategory !== "all" && (
              <div className="flex flex-wrap justify-center space-x-2 mt-4">
                {subcategories[activeCategory]?.map((type) => (
                  <Button 
                    key={type}
                    variant={activeType === type.toLowerCase() ? "secondary" : "ghost"}
                    onClick={() => handleTypeClick(type)}
                    className={activeType === type.toLowerCase() ? "bg-rose-100 text-rose-700" : "hover:bg-rose-50"}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
            {getFilteredProducts().map((product, index) => (
              <Card 
                key={product.id} 
                className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/products/${product.id}`} className="block">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="secondary" className={
                      product.category === "skincare" ? "bg-green-100 text-green-800" : 
                      product.category === "makeup" ? "bg-purple-100 text-purple-800" :
                      product.category === "haircare" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-800"
                    }>
                      {capitalizeFirstLetter(product.type)}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-rose-500">{product.price}</span>
                    <Button 
                      size="sm" 
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {getFilteredProducts().length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found for this selection.</p>
              <Button 
                className="mt-4 bg-rose-500 hover:bg-rose-600 text-white"
                onClick={() => {
                  setActiveCategory("all");
                  setActiveType("all");
                  setSelectedSkinType(null);
                }}
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Educational Section */}
      <section className="py-16 bg-white" id="education">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Master Your Beauty Routine
              </h2>
              <div className="space-y-6">
                <div className="border-l-4 border-rose-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Step-by-Step Tutorials</h3>
                  <p className="text-gray-600">Learn the proper order and techniques for applying skincare and makeup products for best results.</p>
                </div>
                <div className="border-l-4 border-rose-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Pro Tips & Tricks</h3>
                  <p className="text-gray-600">Discover insider secrets and professional techniques to elevate your beauty routine.</p>
                </div>
                <div className="border-l-4 border-rose-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Personalized Guidance</h3>
                  <p className="text-gray-600">Get customized advice based on your skin type and beauty goals.</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  className="bg-rose-500 hover:bg-rose-600 text-white"
                  onClick={handleTutorials}
                >
                  View Complete Tutorials
                </Button>
                <Button 
                  variant="outline"
                  className="border-rose-300 text-rose-600 hover:bg-rose-50"
                  onClick={handleSkinQuiz}
                >
                  Take Our Skin Quiz
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img 
                src="https://images.unsplash.com/photo-1570554886111-e80fcca6a029?w=300&h=400&fit=crop" 
                alt="Skincare routine"
                className="rounded-lg object-cover h-64"
              />
              <img 
                src="https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=400&fit=crop" 
                alt="Natural ingredients"
                className="rounded-lg object-cover h-64 mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="h-6 w-6 text-rose-400" />
                <span className="text-xl font-bold">Radiant Skin</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for personalized beauty and skincare solutions.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={() => scrollToSection('products')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    All Products
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('skincare')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Skincare
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('makeup')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Makeup
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('haircare')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Haircare
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleCategoryClick('bodycare')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Bodycare
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                846836459
              </p>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button 
                    onClick={handleSkinQuiz} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Skin Quiz
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('education')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Beauty Tips
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => console.log('Returns clicked')} 
                    className="hover:text-rose-400 transition-colors"
                  >
                    Returns
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <p className="text-gray-400 mb-4">Stay updated with our latest products and beauty tips.</p>
              <div className="flex space-x-4">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600 text-gray-400 hover:border-rose-400 hover:text-rose-400"
                  onClick={() => window.open('https://instagram.com', '_blank')}
                >
                  Instagram
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600 text-gray-400 hover:border-rose-400 hover:text-rose-400"
                  onClick={() => window.open('https://tiktok.com', '_blank')}
                >
                  TikTok
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Radiant Skin. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;