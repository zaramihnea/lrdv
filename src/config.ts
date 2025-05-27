// src/config.ts
import { timeService } from "./services/TimeService";

export interface Config {
  registrationFormLink: string;
  email: string;
  registrationPeriod: {
    startDate: Date;
    endDate: Date;
  };
  resultsLink: string | null;
  hiddenSections: string[];
}

//=========================================================
//              Configurare centralizata
//  Editati aici pentru a schimba configuratia site-ului
//=========================================================
const configData: Config = {
  // Link catre google form pentru inscriere, editati cu link-ul corect pentru a schimba peste tot in site
  registrationFormLink: "https://forms.gle/oKjrwTtYSyZ2mjpW8",

  email: "lrdv@liis.ro",

  registrationPeriod: {
    startDate: new Date("2025-05-28T00:00:00"), // Data când se deschide înscrierea
    endDate: new Date("2025-05-30T23:59:00"), // Data când se închide înscrierea
  },

  // Link catre google drive pentru rezultate, lasati null daca nu exista inca. Se poate utiliza si orice alt service de stocare a fisierelor.
  resultsLink: null, // Example: "https://drive.google.com/file/d/..." / null

  // Array cu id-urile sectiunilor care trebuie ascunse. Acestea vor fi ascunse din meniu si din pagina principala.
  // Exemplu: ['rezultate', 'inscriere', etc.]
  // In HomeContent.tsx in return() se cauta tag-urile <section id="..."> si se ia id-ul acestora
  // se poate pune in orice className hidden pentru a ascunde orice de pe site.
  hiddenSections: [],
};

const validateConfig = (config: Config): Config => {
  if (config.registrationPeriod.startDate > config.registrationPeriod.endDate) {
    console.error("Eroare de configurare: startDate este după endDate!");
    const temp = config.registrationPeriod.startDate;
    config.registrationPeriod.startDate = config.registrationPeriod.endDate;
    config.registrationPeriod.endDate = temp;
  }
  if (
    !config.registrationFormLink ||
    !config.registrationFormLink.startsWith("http")
  ) {
    console.warn(
      "Avertisment: Formatul link-ului de înregistrare pare invalid!"
    );
  }
  return config;
};

const config = validateConfig(configData);

// Verifică dacă înscrierea este deschisă folosind timpul serverului
// (TimeService folosește un server Netlify pentru ora exactă, neafectat de ora calculatorului)
export function isRegistrationOpen(): boolean {
  try {
    return timeService.isRegistrationOpen(
      config.registrationPeriod.startDate,
      config.registrationPeriod.endDate
    );
  } catch (error) {
    console.error("Error checking registration status:", error);
    return false; // If there's an error, default to closed for security
  }
}

export function getRegistrationStatus() {
  try {
    const now = timeService.getNow();

    // Verificare pentru date invalide
    if (
      !(config.registrationPeriod.startDate instanceof Date) ||
      isNaN(config.registrationPeriod.startDate.getTime()) ||
      !(config.registrationPeriod.endDate instanceof Date) ||
      isNaN(config.registrationPeriod.endDate.getTime())
    ) {
      console.error("Date invalide în configurație!");
      return {
        phase: "error",
        targetDate: undefined,
        message: "Eroare de configurare. Contactați administratorul.",
      };
    }

    if (now < config.registrationPeriod.startDate) {
      return {
        phase: "before",
        targetDate: config.registrationPeriod.startDate,
        message: "Înscrierea se deschide în:",
      };
    } else if (now < config.registrationPeriod.endDate) {
      return {
        phase: "during",
        targetDate: config.registrationPeriod.endDate,
        message: "Înscrierea se închide în:",
      };
    } else {
      return {
        phase: "after",
        targetDate: undefined,
        message: "Înscrierea s-a încheiat.",
      };
    }
  } catch (error) {
    console.error("Eroare în getRegistrationStatus:", error);
    return {
      phase: "error",
      targetDate: undefined,
      message: "A apărut o eroare. Încercați să reîmprospătați pagina.",
    };
  }
}

export default config;
