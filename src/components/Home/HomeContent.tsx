// src/components/Home/HomeContent.tsx
import React from 'react';
import '../../styles/components/home-content.css';

const HomeContent: React.FC = () => {
  return (
    <div className="home-content">
      
      <section className="intro-section">
        <div className="container">
          <div className="intro-quote">
            <blockquote>
              <p>"Literatura și tehnologia se îmbină într-un dialog al prezentului cu trecutul."</p>
            </blockquote>
          </div>
          
          <div className="intro-text">
            <p className="intro-paragraph">
              Liceul Teoretic de Informatică "Grigore Moisil" din Iași a inițiat în anul 2007 un concurs județean interdisciplinar, denumit "Literatura ieșeană în dimensiune virtuală". Timp de doi ani, această competiție, organizată în parteneriat cu instituții redutabile din plan local (Inspectoratul Școlar Județean Iași, Muzeul Literaturii Române, Primăria Municipiului Iași), a devenit un punct de maxim interes în peisajul competițional al învățământului ieșean.
            </p>

            <p className="intro-paragraph">
              Prestigiul său s-a datorat modalității de lucru propuse, total inovatoare, evaluării conform unor standarde de performanță clare și pertinente și, nu în ultimul rând, calității deosebite a produselor finale prezentate de către elevii participanți. Devenit din 2010 concurs national, "Literatura română în dimensiune virtuală" își propune să valorifice performanțele elevilor de gimnaziu și liceu (clasele V-XII), din școala românească și, de anul acesta și din Republica Moldova, în utilizarea computerului și a potențialului creativ și imaginativ, într-un demers personalizat de abordare a specificului cultural și literar național.
            </p>

            <p className="intro-paragraph">
              Concursul deține etapă națională, intervalul organizării și derulării acesteia fiind comunicate prin intermediul Inspectoratului Școlar Județean Iași. Perioada desfășurării etapei naționale este precizată, anual, în calendarele concursurilor naționale, aprobate de Ministerul Educației.
            </p>
          </div>
        </div>
      </section>
      
      {/* Section order changed to prioritize time-sensitive and user-relevant information */}
      <section id="inscriere" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Înscriere</h2>
            <div className="section-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>
          
          <div className="section-content">
            <div className="content-card">
              <p className="content-paragraph">
                Etapa de înscriere are loc în intervalul <strong>28‒29.05.2024</strong>.
              </p>
              <p className="content-paragraph">
                Se completează <strong>obligatoriu</strong> și formularul de înscriere <strong>(vezi butonul aflat în colțul din dreapta sus)</strong>!
              </p>
              
              <div className="cta-container">
                <a href="https://forms.gle/5GPEu4GWnpxjbghd9" className="cta-button" target="_blank" rel="noopener noreferrer">
                  Formular de înscriere
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="echipaje" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Echipaje</h2>
            <div className="section-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>
          
          <div className="section-content">
            <div className="content-card">
              <p className="content-paragraph">
                Echipajele care elaborează proiecte în vederea participării la concursul național "Literatura română în dimensiune virtuală" la secțiunile 1, 2, 3, 4 sunt alcătuite din minimum doi și maximum patru elevi de gimnaziu/ liceu, iar pentru secțiunea 5, echipajele vor avea între 6 și 12 membri (exclusiv elevi de nivel liceal), fără restricții în ceea ce privește filiera și profilul, sub îndrumarea unui profesor de limba română și unul de informatică din școala de proveniență.
              </p>
              
              <div className="teams-info">
                <div className="team-category">
                  <div className="category-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                  </div>
                  <div className="category-content">
                    <h4>Secțiunile 1-4</h4>
                    <p>2-4 elevi gimnaziu/liceu</p>
                  </div>
                </div>
                
                <div className="team-category">
                  <div className="category-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
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
      
      <section id="organizare" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Organizare</h2>
            <div className="section-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 3h6v11h2v2h-2.764l1.176 2.764-1.824.776L12 15.875l-1.588 3.665-1.824-.776L9.764 16H7v-2h2z"></path>
                  <path d="M10 22l-4-9 8-9 8 9-4 9-4-2z"></path>
                </svg>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>
          
          <div className="section-content">
            <div className="content-card">
              <h3 className="card-title">Comisia de organizare este compusă din:</h3>
              <ul className="organization-list">
                <li>
                  <span className="list-title">Președinte:</span>
                  <span className="list-content">directorul instituției organizatoare</span>
                </li>
                <li>
                  <span className="list-title">Președinte executiv:</span>
                  <span className="list-content">directorul adjunct al instituției organizatoare</span>
                </li>
                <li>
                  <span className="list-title">Membri:</span>
                  <span className="list-content">profesori de limba română și de informatică, inginer de sistem din instituția organizatoare</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section id="evaluare" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Evaluare</h2>
            <div className="section-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>
          
          <div className="section-content">
            <div className="content-card">
              <div className="evaluation-points">
                <div className="evaluation-item">
                  <p className="content-paragraph">
                    Pentru participarea la etapa de evaluare, se vor califica echipajele ale căror proiecte au îndeplinit standardele calitative specifice concursului.
                  </p>
                </div>
                
                <div className="evaluation-item">
                  <p className="content-paragraph">
                    Etapa de evaluare are loc în intervalul <strong>30-31.05.2024</strong>.
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
      
      <section id="rezultate" className="content-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Rezultate</h2>
            <div className="section-decoration">
              <span className="decoration-line"></span>
              <span className="decoration-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 20V10"></path>
                  <path d="M18 20V4"></path>
                  <path d="M6 20v-4"></path>
                </svg>
              </span>
              <span className="decoration-line"></span>
            </div>
          </div>
          
          <div className="section-content">
            <div className="content-card results-card">
              <p className="content-paragraph">
                Vor fi publicate după desfășurarea concursului.
              </p>
              
              <div className="results-placeholder">
                <div className="placeholder-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
                <p>Rezultatele vor fi disponibile în această secțiune după evaluarea proiectelor</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;