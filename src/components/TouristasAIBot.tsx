import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  Send, 
  X, 
  Minimize2, 
  Maximize2,
  Bot,
  Sparkles,
  ChevronUp,
  ChevronDown
} from "lucide-react";

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  suggestions?: string[];
}

const TouristasAIBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      text: "Γεια σου! ✨ I'm Touristas AI, your Sifnos travel companion! Ask me about hotels, ferries, beaches, restaurants, or anything about Sifnos. How can I help you today? 🏖️",
      isUser: false,
      timestamp: new Date(),
      suggestions: [
        "Hotels for this weekend",
        "Best beaches to visit", 
        "Ferry schedules",
        "Local restaurants"
      ]
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Same AI response logic as the main page but more concise
  const generateAIResponse = (userMessage: string): { text: string; suggestions?: string[] } => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("hotel") || message.includes("accommodation")) {
      return {
        text: "🏨 Great! I found these top Sifnos accommodations:\n\n• **Kastro Traditional Suites** - Luxury medieval suites (€€€€)\n• **Kamares Beach Hotel** - Beachfront family hotel (€€)\n• **Omega3 Taverna** - Rooms with sunset views (€€€)\n\nNeed specific dates or more options?",
        suggestions: ["Check availability", "More luxury options", "Budget hotels", "Sea view rooms"]
      };
    }
    
    if (message.includes("ferry") || message.includes("boat")) {
      return {
        text: "🚢 Ferry info for Sifnos:\n\n**From Piraeus:** 2-6 hours (high-speed to conventional)\n**Daily departures** in summer season\n**Booking:** 22840 33151 (Aegean Thesaurus)\n\n[Book on Ferryscanner.com](https://www.ferryscanner.com/en/ferry/results?dep=PIR&arr=JTR)",
        suggestions: ["Ferry + hotel packages", "Other island connections", "Port information", "Summer schedules"]
      };
    }
    
    if (message.includes("beach") || message.includes("swimming")) {
      return {
        text: "🏖️ Best Sifnos beaches:\n\n• **Platis Gialos** - Family-friendly with tavernas\n• **Vathi** - Secluded peaceful bay\n• **Chrissopigi** - Scenic monastery beach\n• **Kamares** - Port beach with facilities\n\nWhich type of beach experience interests you?",
        suggestions: ["Romantic beaches", "Family beaches", "Secluded spots", "Beach restaurants"]
      };
    }
    
    if (message.includes("food") || message.includes("restaurant")) {
      return {
        text: "🍽️ Sifnos culinary highlights:\n\n• **Omega3 Taverna** - Seafood with sunset views\n• **Faros Fish Taverna** - Fresh daily catch\n• **Local specialties:** Mastelo lamb, Revithada chickpeas\n• **Must-try:** Thyme honey & local cheeses\n\nWant restaurant recommendations by area?",
        suggestions: ["Romantic dining", "Traditional tavernas", "Seafood restaurants", "Local specialties"]
      };
    }
    
    if (message.includes("pottery") || message.includes("workshop")) {
      return {
        text: "🏺 Sifnos pottery experiences:\n\n• **Artemon Pottery Workshop** - Traditional techniques (Artemonas)\n• **Vathi Pottery Studio** - Watch masters work (Vathi)\n\nBoth offer workshops, demonstrations, and authentic pieces. Perfect for cultural experiences!",
        suggestions: ["Book workshop", "Pottery shopping", "Workshop schedules", "Other cultural sites"]
      };
    }
    
    return {
      text: "✨ I'm here to help with your Sifnos adventure! I can assist with:\n\n🏨 Hotels & accommodation\n🚢 Ferry schedules & bookings\n🏖️ Beach recommendations\n🍽️ Restaurants & local food\n🏺 Pottery workshops & culture\n\nWhat interests you most?",
      suggestions: ["Find hotels", "Ferry information", "Best beaches", "Local restaurants"]
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
    }, 1000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const closeChat = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <>
      {/* Chat Button - Always visible */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={toggleChat}
            className="bg-gradient-to-br from-blue-800 to-[#3a5585] h-14 w-14 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ opacity: 1, transform: 'none' }}
          >
            <img 
              src="/touristas-ai-logo.svg" 
              alt="Touristas AI" 
              className="h-8 w-8"
              onError={(e) => {
                // Fallback to bot icon if logo doesn't load
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement!.innerHTML = '<svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>';
              }}
            />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Card className={`w-80 shadow-2xl transition-all duration-300 ${
            isMinimized ? 'h-14' : 'h-96'
          }`}>
            {/* Header */}
            <CardHeader 
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-t-lg p-3 cursor-pointer"
              onClick={toggleMinimize}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5" />
                  <div>
                    <p className="font-semibold text-sm">Touristas AI</p>
                    <p className="text-xs opacity-75">Your Sifnos companion</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMinimize}
                    className="h-8 w-8 p-0 hover:bg-white/20"
                  >
                    {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={closeChat}
                    className="h-8 w-8 p-0 hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Chat Content - Only show when not minimized */}
            {!isMinimized && (
              <CardContent className="p-0 flex flex-col h-80">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                        message.isUser 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        <div className="whitespace-pre-wrap">{message.text}</div>
                        {message.suggestions && (
                          <div className="mt-2 space-y-1">
                            {message.suggestions.map((suggestion, idx) => (
                              <Button
                                key={idx}
                                variant="outline"
                                size="sm"
                                className="mr-1 mb-1 text-xs h-6"
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
                      <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-xs">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t p-3">
                  <div className="flex gap-2">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Ask me anything..."
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1 text-sm"
                      size="sm"
                    />
                    <Button 
                      onClick={handleSendMessage} 
                      disabled={!inputMessage.trim()}
                      size="sm"
                      className="px-3"
                    >
                      <Send className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Sparkles className="h-3 w-3 text-primary" />
                    <span className="text-xs text-muted-foreground">Powered by AI</span>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default TouristasAIBot;
