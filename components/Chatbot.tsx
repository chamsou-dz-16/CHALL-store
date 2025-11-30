import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { chatWithSupport } from '../services/geminiService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const { language, orders, t } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: t('chat.welcome'),
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Update welcome message when language changes
  useEffect(() => {
    setMessages(prev => {
        if (prev.length === 1 && prev[0].id === 'welcome') {
            return [{ ...prev[0], text: t('chat.welcome') }];
        }
        return prev;
    });
  }, [language, t]);

  const speak = (text: string) => {
    if (!isVoiceEnabled || !window.speechSynthesis) return;
    
    // Cancel any current speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select voice based on language
    if (language === 'fr') utterance.lang = 'fr-FR';
    else if (language === 'en') utterance.lang = 'en-US';
    else if (language === 'ar') utterance.lang = 'ar-SA';
    
    utterance.rate = 1;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Prepare Context (Orders)
    const recentOrders = orders.slice(0, 3).map(o => 
        `Order #${o.id}: ${o.total} DA (${o.status}) - Items: ${o.items.map(i => i.name).join(', ')}`
    ).join('\n');
    
    const contextInfo = recentOrders 
        ? `Recent Orders:\n${recentOrders}` 
        : "No recent orders found.";

    try {
      const responseText = await chatWithSupport(userMessage.text, contextInfo, language);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      speak(responseText);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-200 flex flex-col transition-all duration-300 transform origin-bottom-right" style={{ maxHeight: '500px', height: '60vh' }}>
          {/* Header */}
          <div className="bg-chall-orange p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
                <Bot size={24} />
                <h3 className="font-bold">{t('chat.title')}</h3>
            </div>
            <div className="flex items-center gap-3">
                <button 
                    onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    className="hover:text-orange-200 transition"
                    title={isVoiceEnabled ? "Désactiver la voix" : "Activer la voix"}
                >
                    {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                </button>
                <button onClick={() => setIsOpen(false)} className="hover:text-orange-200 transition">
                    <X size={24} />
                </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-chall-orange text-white rounded-br-none'
                      : 'bg-white text-gray-800 shadow-sm border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className={`text-[10px] block mt-1 ${msg.sender === 'user' ? 'text-orange-100' : 'text-gray-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-lg p-3 rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={t('chat.placeholder')}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-chall-orange focus:ring-1 focus:ring-chall-orange"
            />
            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              className={`p-2 rounded-full bg-chall-orange text-white transition-colors ${
                !inputText.trim() || isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
              }`}
            >
              <Send size={20} className={language === 'ar' ? 'rotate-180' : ''} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-chall-orange text-white p-4 rounded-full shadow-lg hover:bg-orange-600 transition-all transform hover:scale-110 flex items-center justify-center"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
};

export default Chatbot;