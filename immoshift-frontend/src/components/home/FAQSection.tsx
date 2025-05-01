import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  useTheme,
  alpha
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const faqData = [
  {
    question: "À qui s'adressent les formations ?",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          Aux agents qui veulent structurer leur business — débutants ou expérimentés.
        </Typography>
        <Typography variant="body1" paragraph>
          Tu peux être en lancement ou en poste depuis 10 ans.
          Ce qui compte, ce n'est pas ton ancienneté.
          C'est ta lucidité : est-ce que tu as une méthode claire, des process solides, une activité pilotée ?
          Sinon, tu t'épuises à faire sans système. Et c'est exactement là que j'interviens.
        </Typography>
      </>
    )
  },
  {
    question: "Je veux signer plus, mais je ne sais pas par où commencer.",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          C'est normal. C'est même le point de départ de 80 % de mes clients.
        </Typography>
        <Typography variant="body1" paragraph>
          Tu veux performer ? Il faut structurer.
          Mais pour structurer, il faut d'abord faire le tri :
          ce qui marche, ce qui te freine, ce que tu répètes dans le vide.
          C'est ce qu'on fait ensemble dès le premier échange.
          Ensuite, je te montre comment transformer tout ça en leviers concrets.
        </Typography>
      </>
    )
  },
  {
    question: "En quoi tes formations sont différentes de ce qu'on trouve ailleurs ?",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          Parce qu'ici, il n'y a rien à consommer. Il y a à construire.
        </Typography>
        <Typography variant="body1" paragraph>
          Je ne propose ni concepts à la mode, ni modules génériques.
          Je travaille à partir du réel : ton terrain, ton rythme, ton activité.
          Chaque formation est conçue pour t'apporter un système de travail, pas une série de conseils.
        </Typography>
        <Typography variant="body1" paragraph>
          Tu ressors avec une méthode claire, des outils applicables, des routines qui s'ancrent dans ton quotidien d'agent.
          Tu ne repars pas avec "des idées".
          Tu repars avec une structure.
        </Typography>
      </>
    )
  },
  {
    question: "Est-ce que c'est utile même si j'ai déjà une activité qui tourne ?",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          Surtout dans ce cas.
        </Typography>
        <Typography variant="body1" paragraph>
          Avoir du volume, ce n'est pas avoir du pilotage.
          Et avoir du chiffre, ce n'est pas avoir de la marge mentale.
          Je travaille avec des agents qui tournent, mais qui veulent un business clair, duplicable, rentable — pas une machine à feu sans visibilité.
        </Typography>
      </>
    )
  },
  {
    question: "Est-ce qu'on est seul(e) entre les sessions ? Et après la formation ?",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          Non. Tu es accompagné(e) du début à la fin — et au-delà s'il le faut.
        </Typography>
        <Typography variant="body1" paragraph>
          Entre chaque session, je suis disponible pour répondre à tes questions, te recadrer si besoin, t'aider à avancer concrètement.
          Je ne me contente pas de transmettre un contenu : je t'accompagne à l'appliquer, à le structurer, à le faire tenir.
        </Typography>
        <Typography variant="body1" paragraph>
          Et même après la formation, le lien ne se coupe pas.
          Je reste accessible si tu rencontres un blocage, si tu as besoin d'un point de repère ou d'un éclairage.
          Parce qu'un bon accompagnement, c'est aussi de savoir qu'on peut revenir vers la bonne personne au bon moment.
          Simplement, sans pression, mais avec fiabilité.
        </Typography>
      </>
    )
  },
  {
    question: "Comment savoir quelle formation me correspond ?",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          Tu n'as pas à deviner. C'est mon job.
        </Typography>
        <Typography variant="body1" paragraph>
          Je te propose un format adapté après avoir compris où tu en es.
          Pas avant.
          Parce que je refuse de t'enfermer dans une case ou de te vendre une solution générique.
          On échange. Et je t'oriente vers ce qui va vraiment t'aider à avancer.
        </Typography>
      </>
    )
  },
  {
    question: "Pourquoi les tarifs ne sont pas affichés ?",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          Parce qu'un prix, sans contexte, ne veut rien dire.
        </Typography>
        <Typography variant="body1" paragraph>
          Chaque accompagnement est pensé pour t'apporter un levier clair.
          Le tarif existe. Il est cadré. Mais je le présente quand je sais pourquoi tu viens, et où tu veux aller.
          C'est aussi une question de respect : pour toi, pour moi, pour ton projet.
        </Typography>
      </>
    )
  },
  {
    question: "Est-ce que c'est adapté aux responsables d'agence ou aux équipes ?",
    answer: (
      <>
        <Typography variant="body1" paragraph>
          Oui. Parce que diriger, ce n'est pas produire plus. C'est structurer mieux.
        </Typography>
        <Typography variant="body1" paragraph>
          Je travaille avec des dirigeants qui veulent faire évoluer leur agence sans l'épuisement.
          Le vrai enjeu, ce n'est pas d'ajouter du volume. C'est de créer un cadre clair, une culture de travail, et une montée en puissance collective.
        </Typography>
        <Typography variant="body1" paragraph>
          Tu veux que ton équipe monte en compétence ?
          Tu veux que tes agents produisent sans dépendre de toi ?
          Tu veux remettre du cap dans ce que tu portes seul(e) depuis trop longtemps ?
        </Typography>
        <Typography variant="body1" paragraph>
          Alors oui. ImmoShift est ta ressource.
        </Typography>
      </>
    )
  }
];

const FAQSection: React.FC = () => {
  const theme = useTheme();
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <Box
      sx={{
        py: 10,
        backgroundColor: alpha(theme.palette.primary.light, 0.05),
        position: 'relative',
      }}
    >
      <Container maxWidth="lg">
        <MotionBox
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <MotionBox variants={itemVariants}>
            <Typography
              variant="h2"
              align="center"
              gutterBottom
              sx={{
                mb: 1,
                fontWeight: 700,
                position: 'relative',
                display: 'inline-block',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '60%',
                  height: '4px',
                  bottom: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '2px',
                }
              }}
            >
              F.A.Q.
            </Typography>
            <Typography 
              variant="h5" 
              align="center" 
              color="text.secondary" 
              sx={{ mb: 8, maxWidth: '800px', mx: 'auto', fontWeight: 500 }}
            >
              Ce que tu dois savoir avant de te lancer avec ImmoShift
            </Typography>
          </MotionBox>

          <Box sx={{ mt: 5 }}>
            {faqData.map((faq, index) => (
              <MotionBox 
                key={index} 
                variants={itemVariants} 
                sx={{ mb: 2 }}
              >
                <Accordion
                  sx={{
                    backgroundColor: 'background.paper',
                    borderRadius: '8px',
                    '&::before': { display: 'none' },
                    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                    mb: 2,
                    overflow: 'hidden'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      transition: 'all 0.2s ease-in-out',
                      '& .MuiAccordionSummary-content': {
                        my: 2
                      },
                      '&:hover': {
                        borderLeft: `4px solid ${theme.palette.primary.main}`,
                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                      }
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      fontWeight={600}
                      sx={{
                        transition: 'color 0.2s ease-in-out'
                      }}
                    >
                      {index + 1}. {faq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 4, pb: 3 }}>
                    {faq.answer}
                  </AccordionDetails>
                </Accordion>

                {index < faqData.length - 1 && (
                  <Box
                    sx={{
                      height: '1px',
                      width: '100%',
                      my: 4,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        width: '10%',
                        height: '1px',
                        backgroundColor: theme.palette.divider,
                      }}
                    />
                  </Box>
                )}
              </MotionBox>
            ))}
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default FAQSection;
