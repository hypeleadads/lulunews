import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle } from 'lucide-react';
import { useScrollProgress } from './useScrollProgress';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  showButton?: boolean;
}

// Helper component to render bot messages with optional button
function BotMessage({ text, showButton }: { text: string; showButton?: boolean }) {
  return (
    <div className="space-y-2">
      <p className="text-sm whitespace-pre-wrap">{text}</p>
      {showButton && (
        <a
          href="https://my.experthealthadvice.com/click"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg text-sm shadow-lg transition-all transform hover:scale-105"
        >
          🔥 SECURE YOUR 70% DISCOUNT NOW
        </a>
      )}
    </div>
  );
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! 👋 Welcome to Lulutox! I'm here to help you get the best deal on our blood vessel detox tea. Ask me anything!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPromotion, setShowPromotion] = useState(true);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress();

  const faqQuestions = [
    "How long until I see results?",
    "What ingredients are in Lulutox?",
    "Is there a money-back guarantee?",
    "How do I take Lulutox?",
    "Is it safe with my medications?"
  ];

  const faqAnswers: { [key: string]: string } = {
    "How long until I see results?": "Most people notice improvements within the first week! By week 4, you'll see significant improvements in blood pressure and circulation. 🌟 Don't miss out - we're offering 70% OFF today only! Stock is running low and I can reserve your order right now.",
    "What ingredients are in Lulutox?": "Lulutox contains 11 natural herbs including Matcha Green Tea, Yerba Mate, Sencha Green Tea, Oolong Tea, Goji Berries, Milk Thistle, Ginseng, Lemongrass, Nettle Leaf, Dandelion Leaf, and Guarana - all working together to support vascular health. ⚡ TODAY ONLY: 70% OFF! This deal expires tonight and we're selling out FAST. Let me reserve your quantity now.",
    "Is there a money-back guarantee?": "Yes! We offer a 30-day money-back guarantee - zero risk! 🛡️ And right now you can save 70% OFF (LAST DAY!). We're almost sold out, so I highly recommend securing your order immediately.",
    "How do I take Lulutox?": "Simply brew one cup each morning before breakfast. It has a delicious peach flavor! 🍑 Want to start feeling the benefits? Grab your supply at 70% OFF before we run out (this happens every promotion!).",
    "Is it safe with my medications?": "Absolutely! Lulutox is 100% natural herbal tea - completely safe and gentle on your body. 💚 Don't wait another day - grab your 70% OFF discount NOW before we sell out! This is the LAST DAY and stock is running extremely low!"
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFAQClick = (question: string) => {
    // Hide quick questions after selection
    setShowQuickQuestions(false);
    
    // Add user question
    const userMessage: Message = {
      id: messages.length + 1,
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Add bot response after a short delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: faqAnswers[question] || "I'd be happy to help! Could you please rephrase your question?",
        sender: 'bot',
        timestamp: new Date(),
        showButton: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 500);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    const questionText = inputValue;
    setInputValue('');

    // Check if it's a FAQ question
    const matchedFAQ = faqQuestions.find(q => 
      questionText.toLowerCase().includes(q.toLowerCase().substring(0, 10))
    );

    if (matchedFAQ && faqAnswers[matchedFAQ]) {
      setTimeout(() => {
        const botMessage: Message = {
          id: messages.length + 2,
          text: faqAnswers[matchedFAQ],
          sender: 'bot',
          timestamp: new Date(),
          showButton: true
        };
        setMessages(prev => [...prev, botMessage]);
      }, 500);
    } else {
      // ChatGPT API Integration
      setIsLoading(true);
      
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            message: questionText
          })
        });
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        const aiResponse = data.response;
        
        const botMessage: Message = {
          id: messages.length + 2,
          text: aiResponse,
          sender: 'bot',
          timestamp: new Date(),
          showButton: true
        };
        setMessages(prev => [...prev, botMessage]);
        
      } catch (error) {
        console.error('ChatGPT API Error:', error);
        const errorMessage: Message = {
          id: messages.length + 2,
          text: "I apologize, I'm having trouble connecting right now. Please try again in a moment or click one of the FAQ questions above.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Show chat widget if scroll progress is >= 80% OR if user has ever opened it */}
      {(scrollProgress >= 80 || hasBeenOpened) && (
        <>
          {/* Chat Button */}
          {!isOpen && (
            <button
              onClick={() => {
                setIsOpen(true);
                setHasBeenOpened(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-bounce"
            >
              <MessageCircle size={28} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                !
              </span>
            </button>
          )}

          {/* Chat Window */}
          {isOpen && (
            <div className="bg-white rounded-lg shadow-2xl w-96 max-w-[calc(100vw-2rem)] flex flex-col animate-in slide-in-from-bottom-4 duration-300">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Lulutox Support</h3>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto bg-gray-50">
                {/* Promotional Banner */}
                {showPromotion && (
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 shadow-lg animate-pulse">
                    <div className="text-center">
                      <p className="text-xs font-bold uppercase mb-1">🔥 LAST DAY TO GRAB THIS!</p>
                      <p className="text-2xl font-black mb-1">DISCOUNT 70%</p>
                      <p className="text-xs mb-3">⚡ Almost Sold Out - Let me reserve your order!</p>
                      <a
                        href="https://my.experthealthadvice.com/click"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-red-600 font-bold py-2 px-6 rounded-full hover:bg-gray-100 transition-colors text-sm"
                      >
                        CLAIM YOUR 70% OFF NOW
                      </a>
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-800 shadow-sm'
                      }`}
                    >
                      {message.sender === 'bot' ? (
                        <BotMessage text={message.text} showButton={message.showButton} />
                      ) : (
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 shadow-sm rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                {/* FAQ Buttons - ALWAYS show */}
                {showQuickQuestions && (
                  <div className="space-y-2 pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-600 font-semibold mb-2">Quick Questions:</p>
                    {faqQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleFAQClick(question)}
                        className="w-full text-left bg-white hover:bg-blue-50 border border-gray-200 rounded-lg p-3 text-sm transition-colors shadow-sm"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                )}

                {/* Show button to bring back quick questions */}
                {!showQuickQuestions && messages.length > 1 && (
                  <div className="pt-2 text-center">
                    <button
                      onClick={() => setShowQuickQuestions(true)}
                      className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-3 px-6 rounded-lg text-sm shadow-lg transition-all transform hover:scale-105"
                    >
                      💬 Ask Another Question
                    </button>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t bg-white rounded-b-lg">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                    placeholder="Type your question..."
                    disabled={isLoading}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !inputValue.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Ask me anything about Lulutox
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}