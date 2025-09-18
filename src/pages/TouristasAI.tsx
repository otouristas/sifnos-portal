import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  Sparkles, 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff,
  Bot,
  Users,
  Zap,
  Star,
  Globe,
  Heart,
  MapPin,
  Calendar,
  Camera,
  Waves,
  Utensils,
  Ship,
  Sun,
  Gift,
  Clock,
  CheckCircle2,
  Wand2,
  Brain,
  Shield,
  Award,
  TrendingUp,
  PlayCircle,
  ArrowRight
} from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const TouristasAI = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Γεια σου! ✨ I'm Touristas, your intelligent Sifnos travel companion! I combine authentic Greek island charm with modern AI to help you discover perfect accommodations AND ferry schedules. I understand natural dates like \"next weekend\", check real-time availability, consider current weather, and can create complete travel packages combining ferries + hotels. Ready to explore Sifnos together? 🚢",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Hotels available for next weekend",
        "Ferry schedules from Piraeus to Sifnos", 
        "Complete travel packages for a weekend",
        "Weather-aware recommendations",
        "Hidden gems with sea views",
        "Ferry + hotel combinations"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const popularRequests = [
    { icon: "🌅", text: "Hotels for next weekend getaway" },
    { icon: "🚢", text: "Show me ferry schedules from Piraeus to Sifnos" },
    { icon: "🏖️", text: "Hidden beaches locals love" },
    { icon: "🏨", text: "Romantic spots with sunset views" },
    { icon: "✨", text: "Plan my perfect Sifnos adventure" },
    { icon: "🌤️", text: "What's the weather for my dates?" },
    { icon: "🎯", text: "Best hotels considering weather" },
    { icon: "🎁", text: "Complete travel packages" }
  ];

  const features = [
    {
      icon: Brain,
      title: "AI-Powered",
      description: "Advanced natural language understanding for better conversations"
    },
    {
      icon: Clock,
      title: "Real-Time Data", 
      description: "Live hotel availability and pricing from multiple sources"
    },
    {
      icon: Sparkles,
      title: "Smart Suggestions",
      description: "Contextual follow-up questions and recommendations"
    },
    {
      icon: MapPin,
      title: "Local Expert",
      description: "Insider knowledge from Sifnos travel specialists"
    }
  ];

  const stats = [
    { number: "50K+", label: "Recommendations" },
    { number: "98.7%", label: "Accuracy Rate" },
    { number: "4.9★", label: "User Rating" },
    { number: "25", label: "Islands" }
  ];

  const testimonials = [
    {
      name: "Maria & John",
      location: "New York, USA",
      trip: "Santorini Honeymoon • Planned by Touristas AI",
      text: "Touristas AI planned our perfect honeymoon and even called the restaurant in Greek! The mystical oracle knew exactly what we wanted.",
      initials: "M&J"
    },
    {
      name: "Sophie Chen", 
      location: "Singapore",
      trip: "Sifnos Cultural Journey • Planned by Touristas AI",
      text: "Best AI experience ever! Touristas AI found hidden gems even locals didn't know about. The oracle's wisdom is incredible.",
      initials: "SC"
    },
    {
      name: "David Wilson",
      location: "London, UK", 
      trip: "Multi-Island Adventure • Planned by Touristas AI",
      text: "Touristas AI's auto-booking saved me hours. The AI called taxis in perfect Greek and handled everything seamlessly!",
      initials: "DW"
    }
  ];

  // Simulate AI responses based on Sifnos content
  const generateAIResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("hotel") || message.includes("accommodation") || message.includes("stay")) {
      return {
        text: "🏨 Perfect! I found several amazing accommodations on Sifnos for you:\n\n• **Kastro Traditional Suites** - Luxury suites in medieval houses with panoramic sea views (€€€€)\n• **Kamares Beach Hotel** - Family-run hotel directly on the beach (€€)\n• **Omega3 Traditional Taverna** - Also offers rooms with stunning sunset views (€€€)\n\nAll are verified partners with excellent reviews. Would you like me to check availability for specific dates? 🗓️",
        suggestions: [
          "Check availability for next weekend",
          "Show me more luxury options", 
          "Budget-friendly accommodations",
          "Hotels with sea views",
          "Family-friendly places"
        ]
      };
    }
    
    if (message.includes("ferry") || message.includes("boat") || message.includes("piraeus")) {
      return {
        text: "🚢 Here are the ferry connections to Sifnos:\n\n**From Piraeus:**\n• Conventional ferries: 5-6 hours\n• High-speed ferries: 2-3 hours\n• Multiple daily departures in summer\n\n**Other connections:** Milos, Serifos, Santorini, Paros, Syros\n\n📞 **Booking contacts:**\n• Aegean Thesaurus Travel: 22840 33151\n• Sifnos Port Authority: 22840 33617\n\nWould you like me to help you plan the complete journey? 🗺️",
        suggestions: [
          "Book ferry + hotel package",
          "Summer schedule details",
          "Ferry prices and times",
          "Other island connections",
          "Port information"
        ]
      };
    }
    
    if (message.includes("beach") || message.includes("swimming") || message.includes("sea")) {
      return {
        text: "🏖️ Sifnos has incredible beaches! Here are the locals' favorites:\n\n• **Platis Gialos** - Family-friendly sandy beach with tavernas\n• **Kamares** - The port beach with all amenities\n• **Vathi** - Secluded bay perfect for peaceful swimming\n• **Faros** - Lighthouse beach with excellent seafood\n• **Chrissopigi** - Monastery beach, very scenic and spiritual\n\nEach beach has its own character and charm. Which type of beach experience are you looking for? 🌊",
        suggestions: [
          "Secluded beaches for couples",
          "Family beaches with facilities", 
          "Best beaches for photography",
          "Beaches near good restaurants",
          "Nudist-friendly beaches"
        ]
      };
    }
    
    if (message.includes("food") || message.includes("restaurant") || message.includes("taverna") || message.includes("eat")) {
      return {
        text: "🍽️ Sifnos is a culinary paradise! Here are must-try places:\n\n• **Omega3 Traditional Taverna** - Seaside dining with fresh seafood and sunset views\n• **Faros Fish Taverna** - Authentic fishing village taverna with daily catch\n• Local specialties: **Mastelo** (lamb in wine), **Revithada** (Sunday chickpea stew)\n\n🍯 **Local products to try:**\n• Finest thyme honey\n• Traditional cheeses (xynomyzithra, manoura)\n• Sifnos pottery workshops often serve local treats!\n\nWant restaurant recommendations for specific areas? 📍",
        suggestions: [
          "Romantic dinner spots",
          "Traditional tavernas", 
          "Seafood restaurants",
          "Local food experiences",
          "Cooking workshops"
        ]
      };
    }
    
    if (message.includes("pottery") || message.includes("craft") || message.includes("workshop") || message.includes("art")) {
      return {
        text: "🏺 Sifnos is famous for its pottery tradition! Here are the best workshops:\n\n• **Artemon Pottery Workshop** - Traditional ceramics using local clay (Artemonas)\n• **Vathi Pottery Studio** - Working studio where you can watch masters at work\n\nBoth offer:\n✨ Live demonstrations\n🎨 Hands-on workshops\n🛍️ Authentic pieces to purchase\n📦 Shipping available worldwide\n\nPottery workshops are perfect for rainy days or cultural experiences. Would you like workshop schedules? 🎯",
        suggestions: [
          "Book pottery workshop",
          "Best pottery pieces to buy",
          "Workshop schedules",
          "Other craft experiences",
          "Cultural sites to visit"
        ]
      };
    }
    
    if (message.includes("weather") || message.includes("climate") || message.includes("temperature")) {
      return {
        text: "🌤️ Sifnos enjoys a beautiful Mediterranean climate:\n\n**Spring (Mar-May):** 15-22°C, wildflowers, perfect for hiking\n**Summer (Jun-Aug):** 22-28°C, peak season, ideal for beaches\n**Autumn (Sep-Nov):** 18-25°C, warm sea, great for pottery workshops\n**Winter (Dec-Feb):** 10-15°C, quiet and authentic\n\nI can provide weather-aware recommendations based on your travel dates. When are you planning to visit? 📅",
        suggestions: [
          "Best time to visit",
          "Weather for next month",
          "Rainy day activities",
          "Summer vs spring travel",
          "Weather-based hotel recommendations"
        ]
      };
    }
    
    if (message.includes("romantic") || message.includes("honeymoon") || message.includes("couple")) {
      return {
        text: "💕 Sifnos is perfect for romantic getaways! Here's your romantic itinerary:\n\n🏰 **Stay:** Kastro Traditional Suites - Medieval luxury with sea views\n🌅 **Sunset:** Kastro village - Best sunset views on the island\n🍽️ **Dinner:** Omega3 Taverna - Seaside dining under the stars\n🏖️ **Beach:** Chrissopigi - Secluded monastery beach\n🏺 **Activity:** Couples pottery workshop in Artemonas\n\nI can create a complete romantic package with special touches! 💝",
        suggestions: [
          "Book romantic package",
          "Honeymoon suite options",
          "Private dining experiences",
          "Couples activities",
          "Sunset photography spots"
        ]
      };
    }
    
    // Default response
    return {
      text: "✨ I'm here to help you discover the magic of Sifnos! I can assist you with:\n\n🏨 **Accommodations** - From luxury suites to cozy guesthouses\n🚢 **Ferry schedules** - All routes and booking information\n🏖️ **Beaches** - Hidden gems and popular spots\n🍽️ **Restaurants** - Local cuisine and dining experiences\n🏺 **Pottery workshops** - Traditional crafts and experiences\n🌤️ **Weather** - Climate info and activity recommendations\n\nWhat would you like to explore first? Just ask me naturally! 🗣️",
      suggestions: [
        "Plan a weekend trip",
        "Find the best beaches",
        "Recommend local restaurants",
        "Book accommodation",
        "Ferry information"
      ]
    };
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isUser: false,
        timestamp: new Date(),
        suggestions: aiResponse.suggestions
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice Input",
        description: "Voice input feature coming soon! For now, please type your message.",
      });
    }
  };

  return (
    <Layout
      title="Touristas AI - Your Intelligent Sifnos Travel Companion | TravelSifnos.gr"
      description="Meet Touristas AI, the world's first AI-powered Greek island travel companion. Get personalized recommendations, ferry schedules, hotel bookings, and local insights for Sifnos."
      keywords="Touristas AI, Sifnos AI travel, Greek islands AI, travel chatbot, hotel recommendations, ferry schedules, travel planning"
    >
      <div className="min-h-screen">
        {/* Hero Section */}
        <div 
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgb(30, 46, 72) 0%, rgb(42, 60, 90) 50%, rgb(30, 46, 72) 100%)'
          }}
        >
          {/* Floating Background Elements */}
          <div className="absolute inset-0">
            <div 
              className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              style={{ backgroundColor: 'rgba(227, 215, 195, 0.1)' }}
            ></div>
            <div 
              className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
              style={{ backgroundColor: 'rgba(255, 215, 0, 0.08)' }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
              style={{ backgroundColor: 'rgba(227, 215, 195, 0.15)' }}
            ></div>
          </div>

          {/* Hero Content */}
          <div className="relative container mx-auto px-4 py-16 md:py-24">
            <div className="text-center max-w-4xl mx-auto">
              {/* Logo with Glow Effect */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative">
                  <div 
                    className="absolute inset-0 rounded-full blur-xl scale-110"
                    style={{ backgroundColor: 'rgba(227, 215, 195, 0.2)' }}
                  ></div>
                  <div 
                    className="relative backdrop-blur-sm rounded-full p-6 border"
                    style={{ 
                      backgroundColor: 'rgba(227, 215, 195, 0.1)', 
                      borderColor: 'rgba(227, 215, 195, 0.3)' 
                    }}
                  >
                    <img 
                      src="/touristas-ai-logo.svg" 
                      alt="Touristas AI" 
                      className="h-16 w-16 md:h-20 md:w-20"
                      onError={(e) => {
                        // Fallback if logo doesn't exist
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* AI Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium text-white rounded-full backdrop-blur-sm border"
                style={{ 
                  backgroundColor: 'rgba(227, 215, 195, 0.15)', 
                  borderColor: 'rgba(227, 215, 195, 0.3)' 
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: 'rgb(255, 215, 0)' }} />
                <span>Powered by 200+ Automated Trained Agents</span>
              </div>

              {/* Main Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Meet{' '}
                <span 
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, rgb(227, 215, 195) 0%, rgb(255, 215, 0) 50%, rgb(227, 215, 195) 100%)'
                  }}
                >
                  Touristas AI
                </span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed"
                style={{ color: 'rgba(227, 215, 195, 0.9)' }}
              >
                Your intelligent Sifnos travel companion that understands exactly what you're looking for 
                and finds the perfect accommodation in seconds
              </p>

              {/* Feature Badges */}
              <div 
                className="flex items-center justify-center gap-6 mb-10"
                style={{ color: 'rgba(227, 215, 195, 0.8)' }}
              >
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-current" style={{ color: 'rgb(255, 215, 0)' }} />
                  <span className="text-sm font-medium">AI-Powered Matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span className="text-sm font-medium">1000+ Happy Travelers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" style={{ color: 'rgb(255, 215, 0)' }} />
                  <span className="text-sm font-medium">Instant Results</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 font-semibold px-8 py-6 text-lg rounded-full shadow-xl transition-all duration-300 hover:scale-105"
                  style={{ 
                    backgroundColor: 'rgb(227, 215, 195)', 
                    color: 'rgb(30, 46, 72)', 
                    boxShadow: 'rgba(227, 215, 195, 0.3) 0px 10px 30px' 
                  }}
                >
                  Start Planning Your Trip
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-11 font-semibold px-8 py-6 text-lg rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
                  style={{ 
                    borderColor: 'rgba(227, 215, 195, 0.5)', 
                    color: 'rgb(227, 215, 195)', 
                    backgroundColor: 'rgba(227, 215, 195, 0.1)',
                    border: '1px solid rgba(227, 215, 195, 0.5)'
                  }}
                >
                  See How It Works
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rest of the content with white background */}
        <div className="bg-white dark:bg-gray-900">
          <div className="container py-12">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Chat Interface */}
          <Card className="max-w-4xl mx-auto mb-12 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Bot className="h-6 w-6" />
                  <span>Touristas AI</span>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Online</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      <div className="whitespace-pre-wrap">{message.text}</div>
                      {message.suggestions && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs opacity-75">Related Questions You Might Ask:</p>
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="mr-2 mb-2 text-xs"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-muted-foreground px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm">Touristas AI is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask about hotels, get recommendations..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleVoiceInput}
                    className={isListening ? 'bg-red-100 text-red-600' : ''}
                  >
                    {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline" className="text-xs">🎤 Voice input</Badge>
                  <Badge variant="outline" className="text-xs">🌤️ Weather-aware</Badge>
                  <Badge variant="outline" className="text-xs">🚢 Ferry schedules</Badge>
                  <Badge variant="outline" className="text-xs">🧠 AI-powered</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ✨ Try saying "Hotels for next weekend" or "Romantic spots with sunset views"
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Popular Requests */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Try these popular requests:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {popularRequests.map((request, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-4 text-left justify-start"
                  onClick={() => handleSuggestionClick(request.text)}
                >
                  <span className="text-2xl mr-3">{request.icon}</span>
                  <span className="text-sm">{request.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Touristas AI?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">How Touristas AI Works</h2>
            <p className="text-center text-muted-foreground mb-8">Three Simple Steps to Your Perfect Trip</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    01
                  </div>
                  <h3 className="font-semibold mb-2">Tell AI Your Plans</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share your destination, travel style, and preferences through our intelligent chat interface.
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• Natural conversation</p>
                    <p>• Smart follow-up questions</p>
                    <p>• Instant understanding</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    02
                  </div>
                  <h3 className="font-semibold mb-2">AI Analyzes & Matches</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our neural network processes your needs against our database of accommodations and real user experiences.
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• 47 factors analyzed</p>
                    <p>• Real-time processing</p>
                    <p>• Learning algorithm</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                    03
                  </div>
                  <h3 className="font-semibold mb-2">Get Perfect Recommendations</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Receive personalized suggestions with detailed explanations and direct booking options.
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>• Ranked by relevance</p>
                    <p>• Detailed reasoning</p>
                    <p>• Instant booking</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Travelers Love Touristas AI</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {testimonial.initials}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    <p className="text-sm mb-3">"{testimonial.text}"</p>
                    <p className="text-xs text-muted-foreground">{testimonial.trip}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold mb-4">Ready for Touristas AI?</h2>
              <p className="text-lg mb-6 opacity-90">
                Begin your mystical journey with the Greek islands oracle. Experience revolutionary AI 
                that understands Greek culture and speaks your language.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Start AI Consultation
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-500">
                  <PlayCircle className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>
              <div className="flex justify-center gap-8 mt-6 text-sm opacity-75">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Secure & Private
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Award Winning AI
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Trusted by 10K+
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TouristasAI;
