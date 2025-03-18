// src/components/Contest/ContestSections.tsx
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/components/contest-sections.css';

const ContestSections: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [showScrollHint, setShowScrollHint] = useState(true);
  
  useEffect(() => {
    const checkScrollable = () => {
      if (tabsRef.current) {
        const handleScroll = () => {
          setShowScrollHint(false);
        };

        tabsRef.current.addEventListener('scroll', handleScroll);
        
        return () => {
          if (tabsRef.current) {
            tabsRef.current.removeEventListener('scroll', handleScroll);
          }
        };
      }
    };

    checkScrollable();
    
    // Hide hint after 7 seconds anyway
    const timer = setTimeout(() => {
      setShowScrollHint(false);
    }, 7000);
    
    return () => clearTimeout(timer);
  }, []);

  // Scroll active tab into view whenever it changes
  useEffect(() => {
    if (tabsRef.current) {
      const activeButton = tabsRef.current.querySelector('.tab-button.active');
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeTab]);
  
  const sections = [
    {
      id: "reconstituiri",
      title: "Secțiunea I: Reconstituiri",
      content: "Case memoriale şi aşezăminte culturale, alte repere din geografia spirituală a României, urme ale unor scriitori români în Europa.",
      icon: "fas fa-landmark",
      color: "#8ecae6" // Light blue
    },
    {
      id: "impact-cultural",
      title: "Secțiunea II: Impact cultural",
      content: "Incursiuni biografice, contribuții la întemeierea/dezvoltarea patrimoniului cultural național, altele decât cele scriitoriceşti.",
      icon: "fas fa-book-open",
      color: "#a7c957" // Sage green
    },
    {
      id: "destin-literar",
      title: "Secțiunea III: Destin literar",
      content: "Abordări monografice, exegeze, receptare critică, interpretări ale unor opere literare etc.",
      icon: "fas fa-feather-alt",
      color: "#9f86c0" // Lavender
    },
    {
      id: "pecetile-traditiei",
      title: "Secțiunea IV: Pecețile tradiției",
      content: "Muzee ale satului, muzee etnografice; evocarea contribuției unor culegători de folclor; prezentarea unor tradiții, obiceiuri etc. din diferite regiuni ale spațiului românesc, elemente de interculturalitate.",
      icon: "fas fa-scroll",
      color: "#e07a5f" // Terra cotta
    },
    {
      id: "literatura-la-zi",
      title: "Secțiunea V: Literatura la zi",
      content: "Realizarea unui trailer de maximum 3 minute în care să se valorifice original şi creativ o operă a unui scriitor român actual.",
      icon: "fas fa-video",
      color: "#f2cc8f" // Mellow yellow
    }
  ];

  const handleTabsScroll = () => {
    setShowScrollHint(false);
  };

  return (
    <section className="contest-sections">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Secțiunile Concursului</h2>
          <div className="title-decoration">
            <div className="decoration-line"></div>
            <span className="decoration-icon">❦</span>
            <div className="decoration-line"></div>
          </div>
          <p className="section-description">
            Concursul este structurat în cinci secțiuni distincte, fiecare având o tematică specifică ce valorifică diferite aspecte ale patrimoniului literar și cultural românesc.
          </p>
        </div>

        {/* Mobile tabs with hint */}
        <div className="mobile-tabs-container">
          <div 
            className="mobile-tabs" 
            ref={tabsRef}
            onScroll={handleTabsScroll}
          >
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`tab-button ${activeTab === index ? "active" : ""}`}
                onClick={() => setActiveTab(index)}
              >
                <i className={section.icon}></i>
                {section.title.split(":")[0]}
              </button>
            ))}
          </div>
          {showScrollHint && <p className="scroll-hint">← Glisați pentru a vedea toate secțiunile →</p>}
        </div>

        {/* Desktop view: all sections at once */}
        <div className="desktop-sections">
          {sections.map((section) => (
            <div 
              key={section.id}
              className="section-card"
              style={{ borderLeftColor: section.color }}
            >
              <div className="section-content">
                <div 
                  className="section-icon"
                  style={{ backgroundColor: `${section.color}20`, color: section.color }}  
                >
                  <i className={section.icon}></i>
                </div>
                <div className="section-details">
                  <h3 className="section-heading">{section.title}</h3>
                  <p className="section-paragraph">{section.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile view: active section carousel */}
        <div className="mobile-carousel">
          <div 
            className="carousel-slide"
            style={{ borderLeftColor: sections[activeTab].color }}
          >
            <div className="section-content">
              <div 
                className="section-icon"
                style={{ 
                  backgroundColor: `${sections[activeTab].color}20`,
                  color: sections[activeTab].color
                }}  
              >
                <i className={sections[activeTab].icon}></i>
              </div>
              <div className="section-details">
                <h3 className="section-heading">{sections[activeTab].title}</h3>
                <p className="section-paragraph">{sections[activeTab].content}</p>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="carousel-controls">
            <button
              onClick={() => setActiveTab(prev => prev === 0 ? sections.length - 1 : prev - 1)}
              className="carousel-arrow prev-arrow"
              aria-label="Previous section"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="carousel-dots">
              {sections.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`carousel-dot ${activeTab === index ? "active" : ""}`}
                  aria-label={`Go to section ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={() => setActiveTab(prev => prev === sections.length - 1 ? 0 : prev + 1)}
              className="carousel-arrow next-arrow"
              aria-label="Next section"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContestSections;
