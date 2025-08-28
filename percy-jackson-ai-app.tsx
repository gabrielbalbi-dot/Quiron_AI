import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Zap, Shield, Waves, Sparkles } from 'lucide-react';

const PercyJacksonAI = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: '¡Hola, semidiós! Soy Quirón, tu guía en el Campamento Mestizo. ¿Qué quieres saber sobre el mundo de Percy Jackson?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Partículas ambientales
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generar partículas iniciales
    const initialParticles = [];
    for (let i = 0; i < 15; i++) {
      initialParticles.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        opacity: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.5 + 0.2,
        direction: Math.random() * 360
      });
    }
    setParticles(initialParticles);

    // Animar partículas
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: (particle.y + particle.speed) % 105,
        x: particle.x + Math.sin(Date.now() / 1000 + particle.id) * 0.1
      })));
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const percyJacksonKnowledge = {
    personajes: {
      // Protagonistas principales
      'percy': 'Percy Jackson, hijo de Poseidón, protagonista de la saga. Puede controlar el agua, respirar bajo el agua y tiene fuerza sobrehumana. En el último libro recibe la bendición de la Estigia y se vuelve casi invulnerable.',
      'annabeth': 'Annabeth Chase, hija de Atenea, arquitecta brillante y estratega. Mejor amiga y luego novia de Percy. Es muy inteligente y usa un puñal de bronce celestial.',
      'grover': 'Grover Underwood, sátiro que es el mejor amigo y protector de Percy. Tiene la misión de encontrar al dios Pan.',
      'luke': 'Luke Castellan, hijo de Hermes. Inicialmente aliado, luego se convierte en el anfitrión de Cronos. Se sacrifica al final para destruir al titán.',
      
      // Semidioses importantes
      'thalia': 'Thalia Grace, hija de Zeus. Fue convertida en árbol para proteger el campamento, luego resucitó gracias al Vellocino. Se convierte en cazadora de Artemisa.',
      'nico': 'Nico di Angelo, hijo de Hades. Puede controlar los muertos, viajar por las sombras y invocar esqueletos. Su papel se vuelve más importante a lo largo de la saga.',
      'bianca': 'Bianca di Angelo, hermana de Nico, hija de Hades. Se convierte en cazadora de Artemisa pero muere en una misión.',
      'clarisse': 'Clarisse La Rue, hija de Ares. Inicialmente rival de Percy, luego se convierte en aliada. Es muy fuerte y agresiva en combate.',
      'tyson': 'Tyson es un cíclope, medio hermano de Percy (también hijo de Poseidón). Trabaja en las forjas submarinas.',
      'beckendorf': 'Charles Beckendorf, hijo de Hefesto. Gran amigo de Percy y novio de Silena. Experto en explosivos.',
      'silena': 'Silena Beauregard, hija de Afrodita. Novia de Beckendorf y espía de Luke (luego se redime).',
      'rachel': 'Rachel Elizabeth Dare, mortal que puede ver a través de la Niebla. Se convierte en el nuevo Oráculo.',
      'zoe': 'Zoë Nightshade, teniente de las Cazadoras de Artemisa. Pieza clave en "La Maldición del Titán", donde se sacrifica.'
    },
    
    libros: {
      'ladron': 'El Ladrón del Rayo: Percy descubre que es hijo de Poseidón y es acusado de robar el rayo de Zeus. Viaja al inframundo y descubre que Luke es el verdadero ladrón.',
      'mar': 'El Mar de los Monstruos: El árbol de Thalia está envenenado. Percy va al Mar de Bermudas por el Vellocino de Oro y Thalia resucita.',
      'maldicion': 'La Maldición del Titán: Artemisa y Annabeth son capturadas. Percy se une a las cazadoras en una misión de rescate. Nico se revela como hijo de Hades.',
      'batalla': 'La Batalla del Laberinto: Cronos planea invadir por el Laberinto de Dédalo. Dédalo se sacrifica para destruir su creación.',
      'ultimo': 'El Último Héroe del Olimpo: Guerra final contra Cronos en Nueva York. Luke se sacrifica para destruir a Cronos y Percy rechaza la inmortalidad.'
    },

    dioses: {
      // Los Tres Grandes
      'poseidon': 'Poseidón, dios del mar y padre de Percy. Uno de los Tres Grandes junto con Zeus y Hades.',
      'zeus': 'Zeus, rey de los dioses, dios del rayo y el cielo. Padre de Thalia Grace.',
      'hades': 'Hades, dios del inframundo, padre de Nico y Bianca di Angelo. Inicialmente visto como villano.',
      
      // Otros olímpicos importantes
      'atenea': 'Atenea, diosa de la sabiduría y la estrategia. Madre de Annabeth Chase.',
      'ares': 'Ares, dios de la guerra. Padre de Clarisse La Rue, agresivo y conflictivo.',
      'hermes': 'Hermes, dios mensajero y de los ladrones. Padre de Luke Castellan.',
      'artemisa': 'Artemisa, diosa de la caza. Líder de las Cazadoras, hermana gemela de Apolo.',
      'apolo': 'Apolo, dios del sol, la música y las profecías. Hermano gemelo de Artemisa.',
      'afrodita': 'Afrodita, diosa del amor. Madre de Silena Beauregard.',
      'hefesto': 'Hefesto, dios del fuego y la forja. Padre de Charles Beckendorf.',
      'dionisio': 'Dionisio (Sr. D), dios del vino. Director castigado del Campamento Mestizo.',
      'hera': 'Hera, diosa del matrimonio y reina del Olimpo. Esposa de Zeus.'
    },

    antagonistas: {
      'cronos': 'Cronos, titán del tiempo y enemigo principal. Se reconstruye en un ataúd dorado y posee el cuerpo de Luke.',
      'atlas': 'Atlas, titán condenado a cargar el cielo. Se alía con Cronos en "La Maldición del Titán".',
      'tifon': 'Tifón, monstruo gigante que distrae a los dioses mientras Cronos ataca el Olimpo.',
      'kampe': 'Kampê, monstruo guardián del Tártaro liberado por Cronos.',
      'polifemo': 'Polifemo, cíclope que captura a Grover en el Mar de los Monstruos.',
      'minotauro': 'El Minotauro, primer monstruo que Percy derrota al llegar al campamento.'
    },

    lugares: {
      'campamento': 'El Campamento Mestizo, refugio seguro para semidioses dirigido por Quirón y Dionisio. Protegido por el árbol de Thalia.',
      'olimpo': 'El Monte Olimpo, hogar de los dioses que se mueve según el corazón de la civilización occidental. En la saga está sobre el Empire State.',
      'inframundo': 'El Inframundo, reino de Hades. Percy lo visita en el primer libro para recuperar el rayo de Zeus.',
      'laberinto': 'El Laberinto de Dédalo, construcción mágica que se extiende bajo todo el mundo y cambia constantemente.',
      'bermudas': 'El Mar de los Monstruos (Triángulo de las Bermudas), donde está la isla de Polifemo y el Vellocino de Oro.'
    },

    objetos: {
      'turbulencia': 'Turbulencia (Riptide), la espada de Percy hecha de bronce celestial. Siempre regresa a su bolsillo como bolígrafo.',
      'vellocino': 'El Vellocino de Oro, tiene poderes curativos y protectores. Rescatado en el segundo libro para salvar el campamento.',
      'gorra': 'La gorra de invisibilidad de Annabeth, regalo de su madre Atenea.',
      'rayo': 'El rayo maestro de Zeus, el arma más poderosa del universo. Su robo inicia la primera aventura.',
      'ataud': 'El ataúd dorado de Cronos, donde el titán se reconstruye a lo largo de la saga.'
    },

    temas: {
      'profecia': 'La Gran Profecía habla de un hijo de los Tres Grandes que decidirá el destino del Olimpo al cumplir 16 años.',
      'lealtad': 'El tema central es que la lealtad y la amistad pesan más que la fuerza.',
      'eleccion': 'Percy aprende que aunque el destino existe, las elecciones personales cambian el rumbo.',
      'familia': 'La relación complicada entre dioses y semidioses, donde Percy logra que los dioses asuman más responsabilidad.'
    }
  };

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // Buscar en libros específicos
    for (const [key, value] of Object.entries(percyJacksonKnowledge.libros)) {
      if (lowerInput.includes(key) || 
          (key === 'ladron' && (lowerInput.includes('ladrón') || lowerInput.includes('rayo'))) ||
          (key === 'mar' && lowerInput.includes('monstruos')) ||
          (key === 'maldicion' && lowerInput.includes('maldición')) ||
          (key === 'batalla' && lowerInput.includes('laberinto')) ||
          (key === 'ultimo' && (lowerInput.includes('último') || lowerInput.includes('final')))) {
        return `📖 ${value} ¿Quieres que te cuente más detalles sobre esta aventura?`;
      }
    }

    // Buscar en personajes (ahora más completo)
    for (const [key, value] of Object.entries(percyJacksonKnowledge.personajes)) {
      if (lowerInput.includes(key) || 
          (key === 'beckendorf' && lowerInput.includes('charles')) ||
          (key === 'rachel' && lowerInput.includes('dare')) ||
          (key === 'zoe' && (lowerInput.includes('zoë') || lowerInput.includes('nightshade')))) {
        return `🏛️ ${value} ¿Te gustaría saber algo más específico sobre este personaje?`;
      }
    }

    // Buscar en antagonistas
    for (const [key, value] of Object.entries(percyJacksonKnowledge.antagonistas)) {
      if (lowerInput.includes(key) || 
          (key === 'tifon' && lowerInput.includes('tifón')) ||
          (key === 'kampe' && lowerInput.includes('kampê'))) {
        return `👹 ${value} Los villanos de Percy Jackson son realmente aterradores.`;
      }
    }

    // Buscar en dioses
    for (const [key, value] of Object.entries(percyJacksonKnowledge.dioses)) {
      if (lowerInput.includes(key) || 
          (key === 'poseidon' && lowerInput.includes('poseidón')) ||
          (key === 'dionisio' && (lowerInput.includes('señor d') || lowerInput.includes('sr. d')))) {
        return `⚡ ${value} Los dioses olímpicos son muy poderosos pero también muy complicados.`;
      }
    }

    // Buscar en lugares
    for (const [key, value] of Object.entries(percyJacksonKnowledge.lugares)) {
      if (lowerInput.includes(key) || 
          (key === 'campamento' && lowerInput.includes('mestizo')) ||
          (key === 'bermudas' && (lowerInput.includes('triángulo') || lowerInput.includes('bermudas')))) {
        return `🏕️ ${value} Es un lugar muy importante en la saga.`;
      }
    }

    // Buscar en objetos
    for (const [key, value] of Object.entries(percyJacksonKnowledge.objetos)) {
      if (lowerInput.includes(key) || 
          (key === 'vellocino' && (lowerInput.includes('vellocino') || lowerInput.includes('oro'))) ||
          (key === 'ataud' && (lowerInput.includes('ataúd') || lowerInput.includes('dorado'))) ||
          lowerInput.includes('espada') || lowerInput.includes('arma')) {
        return `⚔️ ${value} Los objetos mágicos son fundamentales en las aventuras.`;
      }
    }

    // Buscar en temas
    for (const [key, value] of Object.entries(percyJacksonKnowledge.temas)) {
      if (lowerInput.includes(key) || 
          (key === 'profecia' && lowerInput.includes('profecía')) ||
          (key === 'eleccion' && (lowerInput.includes('elección') || lowerInput.includes('destino')))) {
        return `🎯 ${value} Este es uno de los temas más profundos de la saga.`;
      }
    }

    // Preguntas específicas sobre la saga
    if (lowerInput.includes('cronos') || lowerInput.includes('titán')) {
      return `👑 Cronos es el titán del tiempo y el enemigo principal de toda la saga. Se reconstruye en un ataúd dorado y al final posee el cuerpo de Luke. Su objetivo es destruir a los dioses olímpicos y recuperar el poder.`;
    }

    if (lowerInput.includes('tres grandes') || lowerInput.includes('big three')) {
      return `⚡🌊💀 Los Tres Grandes son Zeus (cielo), Poseidón (mar) y Hades (inframundo). Hicieron un pacto de no tener más hijos semidioses porque son muy poderosos, pero lo rompieron.`;
    }

    if (lowerInput.includes('cazadoras') || lowerInput.includes('artemisa')) {
      return `🏹 Las Cazadoras de Artemisa son chicas inmortales que renuncian al amor romántico para servir a la diosa. Thalia y Bianca se unieron a ellas. Son excelentes arqueras y cazadoras.`;
    }

    if (lowerInput.includes('orden') || lowerInput.includes('secuencia') || lowerInput.includes('cuántos')) {
      return `📚 La saga tiene 5 libros en orden: 1) El Ladrón del Rayo, 2) El Mar de los Monstruos, 3) La Maldición del Titán, 4) La Batalla del Laberinto, 5) El Último Héroe del Olimpo. ¡También existe Los Héroes del Olimpo!`;
    }

    if (lowerInput.includes('final') || lowerInput.includes('termina') || lowerInput.includes('ending')) {
      return `🏆 La saga termina con Luke sacrificándose para destruir a Cronos. Percy rechaza la inmortalidad y pide que los dioses reconozcan a todos sus hijos. Al final, Percy y Annabeth quedan juntos y el Olimpo se renueva.`;
    }

    // Preguntas sobre poderes
    if (lowerInput.includes('poder') || lowerInput.includes('habilidad')) {
      return `✨ Los semidioses heredan poderes de sus padres divinos. Percy controla agua, Thalia electricidad, Nico los muertos, Annabeth tiene sabiduría estratégica. ¡Cada hijo tiene habilidades únicas según su padre/madre divina!`;
    }

    // Respuestas generales mejoradas
    const generalResponses = [
      "🌊 Como centauro sabio del campamento, conozco cada detalle de las aventuras de Percy. ¿Quieres saber sobre algún libro específico, personaje, o batalla épica?",
      "⚡ En mis años como entrenador he visto muchas historias heroicas. Pregúntame sobre la Gran Profecía, los Tres Grandes, o cualquier personaje de la saga.",
      "🏛️ El universo de Percy Jackson tiene 5 libros llenos de aventuras. ¿Te interesa algún villano como Cronos, algún dios específico, o quizás sobre el Campamento Mestizo?",
      "🎯 Soy experto en mitología griega y las aventuras desde El Ladrón del Rayo hasta El Último Héroe del Olimpo. ¿Qué aspecto de la saga te llama más la atención?",
      "📖 Desde que Percy llegó al campamento he sido testigo de batallas épicas. Puedo contarte sobre Luke, las Cazadoras de Artemisa, el Laberinto de Dédalo... ¿Por dónde empezamos?"
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simular tiempo de respuesta
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: generateResponse(inputText),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "¿Cuál es el orden de los libros?",
    "Cuéntame sobre Cronos",
    "¿Quiénes son los Tres Grandes?",
    "¿Cómo termina la saga?",
    "¿Qué es la Gran Profecía?",
    "Háblame de Luke Castellan"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Partículas ambientales */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-gray-400"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `float ${3 + particle.id % 3}s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Estrellas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-16 w-1 h-1 bg-gray-500 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-40 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-40 left-1/3 w-1 h-1 bg-gray-500 rounded-full opacity-50 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-40 right-16 w-1.5 h-1.5 bg-gray-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute bottom-60 left-20 w-1 h-1 bg-gray-500 rounded-full opacity-40 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-gray-400 rounded-full opacity-50 animate-pulse" style={{animationDelay: '2.5s'}}></div>
        <div className="absolute bottom-80 left-1/2 w-1.5 h-1.5 bg-gray-500 rounded-full opacity-45 animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-80 right-12 w-1 h-1 bg-gray-400 rounded-full opacity-55 animate-pulse" style={{animationDelay: '0.8s'}}></div>
      </div>

      {/* Efectos de rayo sutil */}
      <div className="absolute top-10 left-10 w-32 h-0.5 bg-gradient-to-r from-transparent via-gray-500 to-transparent opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-24 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
      
      {/* CSS para animación float */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 shadow-2xl border-b-4 border-gray-600 relative z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="bg-gray-600 p-3 rounded-full shadow-lg">
              <BookOpen className="w-8 h-8 text-gray-200" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-100">Quirón AI</h1>
              <p className="text-gray-300 mt-1">Tu guía experto en el mundo de los semidioses</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl relative z-10">
        {/* Quick Questions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-300 mb-3">Preguntas rápidas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setInputText(question)}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-4 py-2 rounded-lg text-left transition-all duration-200 hover:shadow-lg hover:scale-105 border border-gray-600"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-600 mb-4 h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg ${
                message.type === 'user'
                  ? 'bg-gray-600 text-gray-100 rounded-br-sm'
                  : 'bg-gray-700 text-gray-200 rounded-bl-sm border border-gray-600'
              }`}>
                {message.type === 'ai' && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Shield className="w-4 h-4 text-gray-400" />
                    <span className="text-xs text-gray-400 font-semibold">Quirón AI</span>
                  </div>
                )}
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p className="text-xs text-gray-400 mt-2">
                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg border border-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-400 font-semibold">Quirón AI</span>
                </div>
                <div className="flex space-x-1 mt-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-600 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Pregunta sobre Percy Jackson, los dioses, el campamento..."
                className="w-full bg-gray-700 text-gray-100 placeholder-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Waves className="w-4 h-4 text-gray-500" />
                <Zap className="w-4 h-4 text-gray-500" />
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-gray-600 hover:bg-gray-500 disabled:bg-gray-700 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
            <span>💡 Pregunta sobre libros, personajes, dioses, batallas o el final</span>
            <span className="flex items-center space-x-1">
              <BookOpen className="w-3 h-3" />
              <span>Experto en mitología griega</span>
            </span>
          </div>
        </div>
      </div>

      {/* Decorative elements mejorados */}
      <div className="fixed bottom-4 right-4 opacity-10 animate-pulse">
        <Shield className="w-16 h-16 text-gray-400" />
      </div>
      <div className="fixed top-20 left-4 opacity-10 animate-pulse" style={{animationDelay: '1s'}}>
        <Zap className="w-12 h-12 text-gray-400" />
      </div>
      <div className="fixed bottom-20 left-8 opacity-10 animate-pulse" style={{animationDelay: '2s'}}>
        <Sparkles className="w-10 h-10 text-gray-400" />
      </div>
      <div className="fixed top-40 right-12 opacity-10 animate-pulse" style={{animationDelay: '0.5s'}}>
        <Waves className="w-14 h-14 text-gray-400" />
      </div>
      <div className="fixed bottom-60 right-20 opacity-10 animate-pulse" style={{animationDelay: '1.5s'}}>
        <BookOpen className="w-8 h-8 text-gray-400" />
      </div>
    </div>
  );
};

export default PercyJacksonAI;