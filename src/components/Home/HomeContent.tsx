// src/components/Home/HomeContent.tsx
import React, { useEffect, useState } from 'react';
import CountdownTimer from '../UI/CountdownTimer';
import ContestSections from './ContestSections';
import config, { getRegistrationStatus } from '../../config';
import '../../styles/components/home-content.css';

const HomeContent: React.FC = () => {
  const registrationStatus = getRegistrationStatus();
  const [isIntroExpanded, setIsIntroExpanded] = useState(false);

  const toggleIntro = () => {
    setIsIntroExpanded(!isIntroExpanded);
  };

  // Function to add scroll reveal animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all elements with the animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(element => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Conținutul programei
  const programaContent = `Programa concursului respectă curriculum extins pentru clasele V - XII la limba și literatura română, iar la informatică implică abilitățile de operare în diverse programe specifice. Lucrările pot fi realizate în următoarele formate:

• Prezentări realizate în PowerPoint (exclusiv pentru gimnaziu)

• Film documentar, cu o durată de maximum 15 minute, realizat în: FLASH, Ulead Video Studio, Windows Movie Maker sau alte programe la alegerea participanților

• Website realizat cu: Macromedia Dreamweaver, PHP și MySQL, Flash sau alte tehnologii web`;

  return (
    <div className="home-content">

      <section className="intro-section">
        <div className="container">
          <CountdownTimer 
            targetDate={registrationStatus.targetDate} 
            eventLabel={registrationStatus.message} 
          />

          <div className="intro-quote animate-on-scroll">
            <blockquote>
              <p>"Literatura și tehnologia se îmbină într-un dialog al prezentului cu trecutul."</p>
            </blockquote>
          </div>

          <div className="intro-text">
            <p className="intro-paragraph animate-on-scroll">
              <span className="paragraph-initial">L</span>iceul Teoretic de Informatică "Grigore Moisil" din Iași a inițiat în anul 2007 un concurs județean interdisciplinar, denumit "Literatura ieșeană în dimensiune virtuală". Timp de doi ani, această competiție, organizată în parteneriat cu instituții redutabile din plan local (Inspectoratul Școlar Județean Iași, Muzeul Literaturii Române, Primăria Municipiului Iași), a devenit un punct de maxim interes în peisajul competițional al învățământului ieșean.
            </p>
            
            <div className={`collapsible-content ${isIntroExpanded ? 'expanded' : 'collapsed'}`}>
              <p className="intro-paragraph animate-on-scroll">
                Prestigiul său s-a datorat modalității de lucru propuse, total inovatoare, evaluării conform unor standarde de performanță clare și pertinente și, nu în ultimul rând, calității deosebite a produselor finale prezentate de către elevii participanți. Devenit din 2010 concurs national, "Literatura română în dimensiune virtuală" își propune să valorifice performanțele elevilor de gimnaziu și liceu (clasele V-XII), din școala românească și, de anul acesta și din Republica Moldova, în utilizarea computerului și a potențialului creativ și imaginativ, într-un demers personalizat de abordare a specificului cultural și literar național.
              </p>

              <p className="intro-paragraph animate-on-scroll">
                Concursul deține etapă națională, intervalul organizării și derulării acesteia fiind comunicate prin intermediul Inspectoratului Școlar Județean Iași. Perioada desfășurării etapei naționale este precizată, anual, în calendarele concursurilor naționale, aprobate de Ministerul Educației.
              </p>
            </div>
            
            <div className="read-more-container">
              <button 
                className="read-more-button" 
                onClick={toggleIntro}
                aria-expanded={isIntroExpanded}
              >
                {isIntroExpanded ? 'Citește mai puțin' : 'Citește mai mult'}
                <i className={`fas fa-chevron-${isIntroExpanded ? 'up' : 'down'}`}></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="sectiuni">
        <ContestSections programContent={programaContent} />
      </section>

      <section id="inscriere" className={`content-section ${config.hiddenSections.includes('inscriere') ? 'hidden' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animate-on-scroll" style={{ '--section-color': 'var(--color-inscriere)' } as React.CSSProperties}>Înscriere</h2>
            <div className="section-decoration animate-on-scroll">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <i className="fas fa-pen-to-square"></i>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>

          <div className="section-content">
            <div className="content-card animate-on-scroll">
              <p className="content-paragraph">
                Etapa de înscriere are loc în intervalul <strong>28‒30.05.2025</strong>.
              </p>
              <p className="content-paragraph">
                Se completează <strong>obligatoriu</strong> formularul de înscriere din colțul din dreapta sus al paginii.
              </p>
              <p className="content-paragraph">
                Proiectul va fi trimis pe adresa de email <strong><a href={`mailto:${config.email}`}>{config.email}</a></strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="echipaje" className={`content-section ${config.hiddenSections.includes('echipaje') ? 'hidden' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animate-on-scroll" style={{ '--section-color': 'var(--color-echipaje)' } as React.CSSProperties}>Echipaje</h2>
            <div className="section-decoration animate-on-scroll">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <i className="fas fa-users"></i>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>

          <div className="section-content">
            <div className="content-card animate-on-scroll">
              <p className="content-paragraph">
                Echipajele care elaborează proiecte în vederea participării la concursul național "Literatura română în dimensiune virtuală" la secțiunile 1, 2, 3, 4 sunt alcătuite din minimum doi și maximum patru elevi de gimnaziu/ liceu, iar pentru secțiunea 5, echipajele vor avea între 6 și 12 membri (exclusiv elevi de nivel liceal), fără restricții în ceea ce privește filiera și profilul, sub îndrumarea unui profesor de limba română și unul de informatică din școala de proveniență.
              </p>

              <div className="teams-info">
                <div className="team-category">
                  <div className="category-icon">
                    <i className="fas fa-book"></i>
                  </div>
                  <div className="category-content">
                    <h4>Secțiunile 1-4</h4>
                    <p>2-4 elevi gimnaziu/liceu</p>
                  </div>
                </div>

                <div className="team-category">
                  <div className="category-icon">
                    <i className="fas fa-user-group"></i>
                  </div>
                  <div className="category-content">
                    <h4>Secțiunea 5</h4>
                    <p>6-12 elevi exclusiv nivel liceal</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="organizare" className={`content-section ${config.hiddenSections.includes('organizare') ? 'hidden' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animate-on-scroll" style={{ '--section-color': 'var(--color-organizare)' } as React.CSSProperties}>Organizare</h2>
            <div className="section-decoration animate-on-scroll">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <i className="fas fa-university"></i>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>

          <div className="section-content">
            <div className="content-card animate-on-scroll">
              <h3 className="card-title">Comisia de organizare este compusă din:</h3>
              <ul className="organization-list">
                <li>
                  <span className="list-title">Președinte:</span>
                  <span className="list-content">Directorul instituției organizatoare</span>
                </li>
                <li>
                  <span className="list-title">Președinte executiv:</span>
                  <span className="list-content">Directorul adjunct al instituției organizatoare</span>
                </li>
                <li>
                  <span className="list-title">Membri:</span>
                  <span className="list-content">Profesori de limba română și de informatică, inginer de sistem din instituția organizatoare</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="evaluare" className={`content-section ${config.hiddenSections.includes('evaluare') ? 'hidden' : ''}`}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animate-on-scroll" style={{ '--section-color': 'var(--color-evaluare)' } as React.CSSProperties}>Evaluare</h2>
            <div className="section-decoration animate-on-scroll">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <i className="fas fa-check-circle"></i>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>

          <div className="section-content">
            <div className="content-card animate-on-scroll">
              <div className="evaluation-points">
                <div className="evaluation-item">
                  <p className="content-paragraph">
                    Pentru participarea la etapa de evaluare, se vor califica echipajele ale căror proiecte au îndeplinit standardele calitative specifice concursului.
                  </p>
                </div>

                <div className="evaluation-item">
                  <p className="content-paragraph">
                    Etapa de evaluare are loc în intervalul <strong>3-4.06.2025</strong>.
                  </p>
                </div>

                <div className="evaluation-item highlight">
                  <p className="content-paragraph">
                    Evaluarea se va realiza în funcție de paradigme cuprinzând criterii obiective, prin acordarea unui punctaj distribuit astfel:
                  </p>
                  <div className="scoring-distribution">
                    <div className="score-item">
                      <div className="score-value">50</div>
                      <div className="score-label">puncte</div>
                      <div className="score-description">literatura</div>
                    </div>
                    <div className="score-item">
                      <div className="score-value">40</div>
                      <div className="score-label">puncte</div>
                      <div className="score-description">informatica</div>
                    </div>
                    <div className="score-item">
                      <div className="score-value">10</div>
                      <div className="score-label">puncte</div>
                      <div className="score-description">din oficiu</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="evaluation-rules">
                <h3 className="rules-title">Reguli importante</h3>
                <ul className="rules-list">
                  <li>Premiile și mențiunile se acordă în conformitate cu prevederile din <strong>Ordinul privind modificarea Anexei nr. 1 a Ordinului ministrului educației, cercetării, tineretului și sportului nr. 3035/2012</strong>.</li>
                  <li>Nu se admit contestații.</li>
                  <li>Profesorii evaluatori nu pot avea elevi înscriși în concurs.</li>
                  <li>În cazul în care la o secțiune proiectele nu s-au încadrat în parametrii de calitate vizați, iar punctajele sunt sub nivelul punctajelor acordate la secțiunile celelalte, membrii comisiei pot decide redistribuirea premiilor.</li>
                  <li>Toate proiectele vor fi redactate respectându-se normele ortografice în vigoare și normele de tehnoredactare în limba română.</li>
                  <li>Nu sunt admise produse/proiecte care au fost deja prezentate și/sau premiate în alte concursuri județene/naționale.</li>
                </ul>

                <div className="commission-info">
                  <h4 className="commission-title">Comisia de evaluare:</h4>
                  <p>Va fi anunțată înaintea desfășurării concursului.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="rezultate"
        className={`content-section ${config.hiddenSections.includes('rezultate') ? 'hidden' : ''}`}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title animate-on-scroll" style={{ '--section-color': 'var(--color-rezultate)' } as React.CSSProperties}>Rezultate</h2>
            <div className="section-decoration animate-on-scroll">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <i className="fas fa-chart-bar"></i>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>

          <div className="section-content">
            <div className="content-card results-card animate-on-scroll">
              <p className="content-paragraph">
                {config.resultsLink ? 'Rezultatele concursului sunt disponibile.' : 'Vor fi publicate după desfășurarea concursului.'}
              </p>

              {config.resultsLink ? (
                <div className="cta-container">
                  <a href={config.resultsLink} className="cta-button" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'var(--color-rezultate)', borderColor: 'var(--color-rezultate)' }}>
                    Vizualizare rezultate
                    <i className="fas fa-download"></i>
                  </a>
                </div>
              ) : (
                <div className="results-placeholder">
                  <div className="placeholder-icon">
                    <i className="fas fa-external-link-alt"></i>
                  </div>
                  <p>Rezultatele vor fi disponibile în această secțiune după evaluarea proiectelor</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;