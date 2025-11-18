import React, { useState, useEffect } from "react";
import {
  ShoppingCart,
  Menu,
  X,
  Star,
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Check,
  Plus,
  Minus,
  CreditCard,
  Lock,
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  Battery,
  Volume2,
  Bluetooth,
  Wifi,
  Users,
  Award,
  Package,
  ArrowRight,
} from "lucide-react";

// Mock product data
const productData = {
  id: "prod-001",
  name: "NovaPro Wireless Headphones",
  description:
    "Experience audio perfection with our flagship wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium memory foam ear cushions for all-day comfort.",
  price: 349.99,
  originalPrice: 399.99,
  discount: 13,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
  ],
  colors: [
    { name: "Matte Black", value: "#1a1a1a" },
    { name: "Silver", value: "#f3f4f6" },
    { name: "Deep Blue", value: "#1e40af" },
  ],
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Memory foam ear cushions",
    "Bluetooth 5.2",
    "Voice assistant compatible",
    "Rapid charging (15min = 5hrs)",
  ],
  specifications: {
    general: [
      { name: "Model", value: "NovaPro X1" },
      { name: "Weight", value: "265g" },
      { name: "Driver Size", value: "40mm" },
      { name: "Impedance", value: "32Ω" },
    ],
    battery: [
      { name: "Battery Life", value: "30 hours" },
      { name: "Charging Time", value: "2 hours" },
      { name: "Quick Charge", value: "15min = 5 hours" },
      { name: "Standby Time", value: "200 hours" },
    ],
    connectivity: [
      { name: "Bluetooth Version", value: "5.2" },
      { name: "Wireless Range", value: "10m" },
      { name: "NFC", value: "Yes" },
      { name: "Audio Codecs", value: "AAC, aptX, LDAC" },
    ],
  },
  stock: 12,
  rating: 4.8,
  reviews: 1247,
  limitedTime: true,
};

const reviews = [
  {
    id: 1,
    name: "Alex Johnson",
    rating: 5,
    comment:
      "Best headphones I've ever owned! The noise cancellation is incredible.",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Sarah Chen",
    rating: 5,
    comment: "Worth every penny. The comfort and sound quality are unmatched.",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    rating: 4,
    comment: "Great product, but wish the case was included.",
    date: "2024-01-08",
  },
];

const shippingOptions = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 0,
    days: "5-7 business days",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 9.99,
    days: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    price: 19.99,
    days: "Next business day",
  },
];

// App Views
const VIEWS = {
  PRODUCT: "product",
  CHECKOUT: "checkout",
  CONFIRMATION: "confirmation",
};

const App = () => {
  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentView, setCurrentView] = useState(VIEWS.PRODUCT);
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);
  const [checkoutData, setCheckoutData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Auto-advance images
  useEffect(() => {
    if (currentView === VIEWS.PRODUCT) {
      const timer = setInterval(() => {
        setCurrentImageIndex((prev) =>
          prev === productData.images.length - 1 ? 0 : prev + 1,
        );
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [currentView]);

  const addToCart = () => {
    const newItem = {
      ...productData,
      selectedColor,
      quantity,
      id: `${productData.id}-${selectedColor.name}`,
    };
    setCartItems([...cartItems, newItem]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === productData.images.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? productData.images.length - 1 : prev - 1,
    );
  };

  const handleCheckout = () => {
    setCurrentView(VIEWS.CHECKOUT);
    setIsCartOpen(false);
  };

  const handlePlaceOrder = () => {
    setCurrentView(VIEWS.CONFIRMATION);
  };

  const continueShopping = () => {
    setCurrentView(VIEWS.PRODUCT);
    setCartItems([]);
  };

  const totalPrice = (productData.price * quantity).toFixed(2);
  const savings = (
    (productData.originalPrice - productData.price) *
    quantity
  ).toFixed(2);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const orderTotal = cartTotal + selectedShipping.price;

  const renderProductView = () => (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isMenuOpen ? "bg-white" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-black">NOVA</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-[#8E8E93] hover:text-black transition-colors"
              >
                Features
              </a>
              <a
                href="#specifications"
                className="text-[#8E8E93] hover:text-black transition-colors"
              >
                Specifications
              </a>
              <a
                href="#reviews"
                className="text-[#8E8E93] hover:text-black transition-colors"
              >
                Reviews
              </a>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-black hover:bg-gray-100 rounded-full transition-colors md:hidden"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a
                href="#features"
                className="block text-[#8E8E93] hover:text-black transition-colors"
              >
                Features
              </a>
              <a
                href="#specifications"
                className="block text-[#8E8E93] hover:text-black transition-colors"
              >
                Specifications
              </a>
              <a
                href="#reviews"
                className="block text-[#8E8E93] hover:text-black transition-colors"
              >
                Reviews
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {/* Product Hero Section */}
        <section className="relative">
          <div className="max-w-7xl mx-auto lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:min-h-[80vh] px-4 sm:px-6 lg:px-8 py-12">
            {/* Image Gallery */}
            <div className="relative">
              <div
                className="relative bg-white rounded-2xl overflow-hidden shadow-xl"
                style={{
                  background:
                    "radial-gradient(circle at center, rgba(0,0,0,0.02) 0%, transparent 70%)",
                }}
              >
                <img
                  src={productData.images[currentImageIndex]}
                  alt={productData.name}
                  className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
                />

                {/* Navigation Arrows */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <ChevronLeft size={20} className="text-black" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200"
                >
                  <ChevronRight size={20} className="text-black" />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {productData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentImageIndex ? "bg-black" : "bg-white/60"
                      }`}
                    />
                  ))}
                </div>

                {/* Limited Time Badge */}
                {productData.limitedTime && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-[#FF3B30] to-[#FF9500] text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg animate-pulse">
                      Limited Time Offer
                    </div>
                  </div>
                )}
              </div>

              {/* Thumbnail Strip */}
              <div className="flex space-x-4 mt-4">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-1 h-20 bg-white rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === currentImageIndex
                        ? "border-black"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${productData.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-8 lg:mt-0">
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(productData.rating)
                          ? "fill-[#FF3B30] text-[#FF3B30]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[#8E8E93] text-sm">
                  {productData.rating} • {productData.reviews.toLocaleString()}{" "}
                  reviews
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-4">
                {productData.name}
              </h1>

              {/* Description */}
              <p className="text-[#8E8E93] text-lg mb-6 leading-relaxed">
                {productData.description}
              </p>

              {/* Pricing */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  ${productData.price}
                </span>
                <span className="text-lg text-[#8E8E93] line-through">
                  ${productData.originalPrice}
                </span>
                <span className="bg-[#FF3B30] text-white px-2 py-1 rounded text-sm font-semibold">
                  Save {productData.discount}%
                </span>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-black mb-3">COLOR</h3>
                <div className="flex space-x-3">
                  {productData.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                        selectedColor.name === color.name
                          ? "border-black bg-gray-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: color.value }}
                      />
                      <span className="text-sm text-black">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Stock */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-black">QUANTITY</h3>
                  <div
                    className={`text-sm font-semibold ${
                      productData.stock < 5
                        ? "text-[#FF3B30]"
                        : "text-[#8E8E93]"
                    }`}
                  >
                    {productData.stock < 5 && "Only "}
                    {productData.stock} left in stock
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Minus size={16} className="text-black" />
                    </button>
                    <span className="px-4 py-2 text-black font-semibold min-w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(productData.stock, quantity + 1))
                      }
                      className="p-3 hover:bg-gray-50 transition-colors"
                    >
                      <Plus size={16} className="text-black" />
                    </button>
                  </div>

                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <button
                      onClick={addToCart}
                      className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
                    >
                      Add to Cart
                    </button>
                    <button className="border border-gray-200 text-black py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Total & Savings */}
              <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#8E8E93]">Total</span>
                  <span className="text-xl font-bold text-black">
                    ${totalPrice}
                  </span>
                </div>
                <div className="text-sm text-[#FF3B30] font-semibold">
                  You save ${savings}
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 text-[#8E8E93]">
                  <Truck size={16} />
                  <span className="text-sm">Free shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-[#8E8E93]">
                  <Shield size={16} />
                  <span className="text-sm">2-year warranty</span>
                </div>
                <div className="flex items-center space-x-2 text-[#8E8E93]">
                  <RotateCcw size={16} />
                  <span className="text-sm">30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Premium Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {productData.features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-black" />
                  </div>
                  <h3 className="text-lg font-semibold text-black mb-2">
                    {feature}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section id="specifications" className="py-16 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Technical Specifications
            </h2>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* General Specs */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Package size={20} className="text-black" />
                  <h3 className="text-lg font-semibold text-black">General</h3>
                </div>
                <div className="space-y-3">
                  {productData.specifications.general.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-[#8E8E93]">{spec.name}</span>
                      <span className="font-semibold text-black">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Battery Specs */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Battery size={20} className="text-black" />
                  <h3 className="text-lg font-semibold text-black">Battery</h3>
                </div>
                <div className="space-y-3">
                  {productData.specifications.battery.map((spec, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-100"
                    >
                      <span className="text-[#8E8E93]">{spec.name}</span>
                      <span className="font-semibold text-black">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Connectivity Specs */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Bluetooth size={20} className="text-black" />
                  <h3 className="text-lg font-semibold text-black">
                    Connectivity
                  </h3>
                </div>
                <div className="space-y-3">
                  {productData.specifications.connectivity.map(
                    (spec, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                      >
                        <span className="text-[#8E8E93]">{spec.name}</span>
                        <span className="font-semibold text-black">
                          {spec.value}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Reviews Section */}
        <section id="reviews" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Customer Reviews
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < review.rating
                              ? "fill-[#FF3B30] text-[#FF3B30]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-[#8E8E93] mb-4">{review.comment}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-black">
                      {review.name}
                    </span>
                    <span className="text-sm text-[#8E8E93]">
                      {review.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-[#F5F5F7]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-black text-center mb-12">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  question: "What's included in the box?",
                  answer:
                    "NovaPro headphones, USB-C charging cable, 3.5mm audio cable, carrying pouch, and user manual.",
                },
                {
                  question: "Is the noise cancellation adjustable?",
                  answer:
                    "Yes, you can adjust the level of noise cancellation through our mobile app or using the touch controls on the ear cup.",
                },
                {
                  question: "How long does the battery last with ANC on?",
                  answer:
                    "With Active Noise Cancellation enabled, you get up to 28 hours of continuous playback.",
                },
                {
                  question: "Are they compatible with voice assistants?",
                  answer:
                    "Yes, they support Google Assistant, Amazon Alexa, and Siri with quick access via the touch controls.",
                },
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="font-semibold text-black mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#8E8E93]">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Sticky Purchase Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-black">
                ${productData.price}
              </div>
              {productData.originalPrice && (
                <div className="text-sm text-[#8E8E93] line-through">
                  ${productData.originalPrice}
                </div>
              )}
            </div>
            <button
              onClick={addToCart}
              className="bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex-1 max-w-48"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-black">Your Cart</h2>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} className="text-black" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <div className="text-center text-[#8E8E93] py-12">
                    <ShoppingCart
                      size={48}
                      className="mx-auto mb-4 text-gray-300"
                    />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 bg-gray-50 rounded-lg p-4"
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-black">
                            {item.name}
                          </h3>
                          <p className="text-sm text-[#8E8E93]">
                            {item.selectedColor.name}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="font-semibold text-black">
                              ${item.price}
                            </span>
                            <span className="text-sm text-[#8E8E93]">
                              Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[#8E8E93]">Subtotal</span>
                    <span className="font-semibold text-black">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                  >
                    <CreditCard size={20} />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add to Cart Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right-5">
          <div className="flex items-center space-x-2">
            <Check size={20} />
            <span>Added to cart successfully!</span>
          </div>
        </div>
      )}
    </div>
  );

  const renderCheckoutView = () => (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Checkout Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentView(VIEWS.PRODUCT)}
              className="flex items-center space-x-2 text-black hover:text-gray-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
            <span className="text-2xl font-bold text-black">NOVA</span>
            <div className="w-6"></div> {/* Spacer for balance */}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black">Checkout</h2>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={checkoutData.email}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin size={20} className="text-black" />
                <h3 className="text-lg font-semibold text-black">
                  Shipping Address
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  value={checkoutData.firstName}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      firstName: e.target.value,
                    })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={checkoutData.lastName}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      lastName: e.target.value,
                    })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={checkoutData.address}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      address: e.target.value,
                    })
                  }
                  className="col-span-2 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="City"
                  value={checkoutData.city}
                  onChange={(e) =>
                    setCheckoutData({ ...checkoutData, city: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={checkoutData.zipCode}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      zipCode: e.target.value,
                    })
                  }
                  className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <Truck size={20} className="text-black" />
                <h3 className="text-lg font-semibold text-black">
                  Shipping Method
                </h3>
              </div>
              <div className="space-y-3">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={selectedShipping.id === option.id}
                      onChange={() => setSelectedShipping(option)}
                      className="text-black focus:ring-black"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-black">
                          {option.name}
                        </span>
                        <span className="font-semibold text-black">
                          {option.price === 0 ? "Free" : `$${option.price}`}
                        </span>
                      </div>
                      <p className="text-sm text-[#8E8E93]">{option.days}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard size={20} className="text-black" />
                <h3 className="text-lg font-semibold text-black">
                  Payment Method
                </h3>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Card Number"
                  value={checkoutData.cardNumber}
                  onChange={(e) =>
                    setCheckoutData({
                      ...checkoutData,
                      cardNumber: e.target.value,
                    })
                  }
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={checkoutData.expiryDate}
                    onChange={(e) =>
                      setCheckoutData({
                        ...checkoutData,
                        expiryDate: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={checkoutData.cvv}
                    onChange={(e) =>
                      setCheckoutData({ ...checkoutData, cvv: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-black mb-4">
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-black text-sm">
                        {item.name}
                      </h4>
                      <p className="text-xs text-[#8E8E93]">
                        {item.selectedColor.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-black">
                        ${item.price}
                      </div>
                      <div className="text-xs text-[#8E8E93]">
                        Qty: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between text-[#8E8E93]">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[#8E8E93]">
                  <span>Shipping</span>
                  <span>
                    {selectedShipping.price === 0
                      ? "Free"
                      : `$${selectedShipping.price}`}
                  </span>
                </div>
                <div className="flex justify-between text-[#8E8E93]">
                  <span>Tax</span>
                  <span>${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-black text-lg border-t border-gray-200 pt-3">
                  <span>Total</span>
                  <span>${(orderTotal + cartTotal * 0.08).toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center justify-center space-x-2 mt-6 pt-6 border-t border-gray-200">
                <Lock size={16} className="text-[#8E8E93]" />
                <span className="text-sm text-[#8E8E93]">Secure checkout</span>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors mt-6 flex items-center justify-center space-x-2"
              >
                <Lock size={20} />
                <span>Place Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderConfirmationView = () => (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={32} className="text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-black mb-4">Order Confirmed!</h1>
        <p className="text-[#8E8E93] mb-6">
          Thank you for your purchase. Your order has been confirmed and will be
          shipped within 24 hours.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#8E8E93]">Order Number</span>
            <span className="font-semibold text-black">
              #NO-{Date.now().toString().slice(-6)}
            </span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-[#8E8E93]">Estimated Delivery</span>
            <span className="font-semibold text-black">Jan 28, 2024</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[#8E8E93]">Total</span>
            <span className="font-semibold text-black">
              ${(orderTotal + cartTotal * 0.08).toFixed(2)}
            </span>
          </div>
        </div>

        <button
          onClick={continueShopping}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
        >
          <ArrowRight size={20} />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );

  // Main render with view switching
  return (
    <>
      {currentView === VIEWS.PRODUCT && renderProductView()}
      {currentView === VIEWS.CHECKOUT && renderCheckoutView()}
      {currentView === VIEWS.CONFIRMATION && renderConfirmationView()}
    </>
  );
};

export default App;
