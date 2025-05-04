import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import logo from "@assets/logo.jpg";
import transparentLogo from "@assets/logo_transparent.png";

export const logoUrl = logo;
export const transparentLogoUrl = transparentLogo;

// Company information
export const companyInfo = {
  name: "ImmoShift",
  description: "Formation pour agents immobiliers. Structurez votre activité, maîtrisez vos méthodes et performez durablement.",
  email: "immoshift.business@gmail.com",
  address: "Palavas-les-Flots, 34250, France",
  city: "Palavas-les-Flots"
};

// Social media links
export const socialMedia = [
  // { icon: <FacebookIcon />, color: "#3b5998", url: "https://www.facebook.com/immoshift" },
  // { icon: <TwitterIcon />, color: "#1DA1F2", url: "https://twitter.com/immoshift" },
  // { icon: <InstagramIcon />, color: "#C13584", url: "https://instagram.com/immoshift" },
  { icon: <LinkedInIcon />, color: "#0e76a8", url: "https://www.linkedin.com/in/audrey-a-26baa3205" },
];

// Navigation links
export const navigationLinks = [
  { name: "Accueil", path: "/", home: true },
  { name: "Presentation", path: "/#presentation" },
  { name: "Formations", path: "/#trainings" },
  { name: "Articles", path: "/#articles" },
  { name: "Ebooks", path: "/#ebooks" },
  { name: "Témoignages", path: "/#testimonials" },
  { name: "Contact", path: "https://calendly.com/audreyantonini13/45-minutes-pour-faire-le-point", external: true },
  { name: "FAQ", path: "/#faq" },
];

// Add Calendly information
export const calendlyInfo = {
  url: "https://calendly.com/audreyantonini13/45-minutes-pour-faire-le-point",
  title: "Réserver un appel découverte de 45 minutes",
  description: `Cet appel 45 minutes est un rendez-vous professionnel de découverte et d'échange.
Il s'adresse aux agents immobiliers qui veulent prendre de la hauteur sur leur activité — que ce soit pour corriger ce qui coince, structurer ce qui grandit trop vite, ou optimiser ce qui fonctionne déjà.
On parle de ton fonctionnement, de tes priorités, de tes points de friction ou de progression.
Je t'écoute, je t'oriente.
Et si je peux t'apporter de la valeur, je t'explique comment je peux t'accompagner.
Ce n'est pas une séance de coaching offerte, mais un premier contact cadré, pour poser les bases d'un accompagnement sur mesure.`,
  description_short: `Réserver un rendez-vous de 45 minutes pour discuter de vos besoins en formation immobilière.`,
  buttonText: "Réserver Maintenant",
};

// Contact information with icons
export const contactInfo = [
  { icon: <EmailIcon />, text: companyInfo.email },
  // { icon: <PhoneIcon />, text: companyInfo.phone },
  { icon: <LocationOnIcon />, text: companyInfo.address },
];

