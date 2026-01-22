import React, { useRef, useEffect } from "react";
import { Box, Container, Typography, Grid, useTheme, Divider, Paper, Stack } from "@mui/material";
import professional from "@assets/professional.jpg";
import working from "@assets/girl-2583442_1280.jpg";
import { motion, useAnimation, useInView } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionDivider = motion(Divider);
const MotionStack = motion(Stack); // Added for list items if needed

// Animation Variants
const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } // Ease-out cubic
    }
};

const textVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.2 }
    }
};

const textVariantsRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: "easeOut", delay: 0.2 }
    }
};

const dividerVariants = {
    hidden: { scaleX: 0 },
    visible: {
        scaleX: 1,
        transition: { duration: 0.8, ease: "easeOut", delay: 0.4 }
    }
};

const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
};

const listContainerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.4 } }
};

// New variant for titles
const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};


const PresentationSection = () => {
    const theme = useTheme();

    // Helper component for triggering animations on scroll
    const AnimatedSection = ({ children, variants = sectionVariants, threshold = 0.1 }: { children: React.ReactNode, variants?: any, threshold?: number }) => {
        const controls = useAnimation();
        const ref = useRef(null);
        const isInView = useInView(ref, { once: true, amount: threshold });

        useEffect(() => {
            if (isInView) {
                controls.start('visible');
            }
        }, [isInView, controls]);

        return (
            <MotionBox ref={ref} initial="hidden" animate={controls} variants={variants}>
                {children}
            </MotionBox>
        );
    };

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <MotionTypography
            variant="h3"
            sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.5rem" },
                mb: 3,
                color: theme.palette.primary.main,
                position: "relative",
                wordBreak: 'break-word', // Add this line
                "&:after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: 60,
                    height: 3,
                    backgroundColor: theme.palette.primary.main,
                },
            }}
            variants={titleVariants}
        >
            {children}
        </MotionTypography>
    );

    const ContentBox = ({ children, variants }: { children: React.ReactNode, variants?: any }) => (
        <AnimatedSection variants={variants || textVariants} threshold={0.2}>
            <MotionPaper
                elevation={0}
                sx={{
                    p: { xs: 2, sm: 4 },
                    height: "100%",
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                        boxShadow: 3,
                    },
                }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
            >
                {children}
            </MotionPaper>
        </AnimatedSection>
    );

    const ImageDisplay = ({ src, alt }: { src: string; alt: string }) => (
        <AnimatedSection variants={imageVariants} threshold={0.3}>
            <MotionBox
                component="img"
                src={src}
                alt={alt}
                sx={{
                    width: "100%",
                    height: "auto",
                    // maxHeight: { xs: "300px", sm: "400px", md: "unset" },
                    // objectFit: { xs: "cover", md: "contain" },
                    borderRadius: 2,
                    boxShadow: 3,
                    transition: "transform 0.3s ease-in-out", // Keep CSS transitions for hover
                    "&:hover": {
                        // transform: "scale(1.02)", // Motion handles this
                    },
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            />
        </AnimatedSection>
    );

    return (
        <Box
            sx={{
                py: 10,
                background: `linear-gradient(to bottom, ${theme.palette.background.default}, ${theme.palette.background.paper})`,
            }}
        >
            <Container maxWidth="lg">
                <Stack spacing={8}>
                    {/* Personal Introduction Section */}
                    <MotionBox component="section" variants={sectionVariants}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <ContentBox variants={textVariants}>
                                    <SectionTitle>Qui je suis</SectionTitle>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Je suis sur le terrain.
                                        Depuis 2006, l'immobilier est devenu pour moi un métier d'exigence, de rigueur, d'endurance et de résultats.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        J'ai tout traversé :
                                    </MotionTypography>
                                    <motion.div variants={listContainerVariants}>
                                        <MotionStack spacing={1} sx={{ mb: 3 }} variants={listContainerVariants}> {/* Use MotionStack */}
                                            {["La prospection.",
                                              "La pige.",
                                              "La signature.",
                                              "La négociation.",
                                              "Et surtout : la performance terrain, validée par des podiums de chiffre d'affaires sur plusieurs années."
                                            ].map((item, index) => (
                                                <motion.div key={index} variants={listItemVariants}>
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            color: theme.palette.text.secondary,
                                                            lineHeight: 1.7,
                                                        }}
                                                    >
                                                        {item}
                                                    </Typography>
                                                </motion.div>
                                            ))}
                                        </MotionStack>
                                    </motion.div>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Pendant une grande partie de ma carrière, j'ai occupé le rôle de directrice d'agence, où j'ai dirigé, formé, inspiré des équipes, tout en restant en lien avec la réalité du terrain.
                                        J'ai non seulement piloté des équipes mais aussi performé à titre individuel en générant des résultats solides.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Je connais intimement la réalité de ce métier :
                                        l'adrénaline des signatures, la pression des objectifs, le doute après plusieurs rendez-vous infructueux, l'exigence mentale d'enchaîner les jours sans relâche.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Année après année, transaction après transaction, j'ai bâti une carrière rentable et structurée — non pas par hasard, mais par méthode, par rigueur et par discipline.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        À force de produire et de performer, mes confrères sont venus naturellement me chercher.
                                        "Comment tu fais ?" "Comment tu t'organises ?"
                                        Et de fil en aiguille, la transmission est devenue une mission : transmettre ce que j'aurais rêvé qu'on m'apprenne dès mes débuts.
                                    </MotionTypography>
                                </ContentBox>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 2 }}>
                                    <ImageDisplay src={professional} alt="ImmoShift approach" />
                                </Box>
                            </Grid>
                        </Grid>
                    </MotionBox>

                    <AnimatedSection variants={dividerVariants} threshold={0.5}>
                        <MotionDivider sx={{ width: "40%", mx: "auto", borderColor: theme.palette.primary.light }} />
                    </AnimatedSection>

                    {/* Current Work Section */}
                    <MotionBox component="section" variants={sectionVariants}>
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                                <Box sx={{ p: 2 }}>
                                    <ImageDisplay src={working} alt="ImmoShift approach" />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                                <ContentBox variants={textVariantsRight}>
                                    <SectionTitle>Ce que je fais aujourd'hui</SectionTitle>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Je ne suis pas une formatrice de vitrines.
                                        Je suis une stratège de terrain.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        ImmoShift est né d'une conviction forte :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Quand on structure ses méthodes, ses rituels et son pilotage business, on ne subit plus ce métier. On le maîtrise.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Je n'enseigne rien que je n'ai pas appliqué, éprouvé, et optimisé par l'expérience terrain.
                                        Pas de recettes miracles.
                                        Pas de discours théoriques.
                                        Pas de promesses creuses.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Ce que je propose, c'est un accompagnement à haute valeur humaine :
                                    </MotionTypography>
                                    <motion.div variants={listContainerVariants}>
                                        <MotionStack spacing={1} sx={{ mb: 3 }} variants={listContainerVariants}> {/* Use MotionStack */}
                                            {[
                                                "Des sessions stratégiques exigeantes",
                                                "Des outils concrets et personnalisés",
                                                "Des échanges réguliers pour ancrer la transformation",
                                                "Et surtout, une vraie présence humaine : je reste en contact direct avec les agents que j'accompagne."
                                            ].map((item, index) => (
                                                <motion.div key={index} variants={listItemVariants}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                            mt: 0.7,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                minWidth: 15,
                                                            }}
                                                        >
                                                            •
                                                        </Box>
                                                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                                                            {item}
                                                        </Typography>
                                                    </Box>
                                                </motion.div>
                                            ))}
                                        </MotionStack>
                                    </motion.div>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Chaque agent que je forme ressort avec bien plus qu'une formation :
                                        il repart avec une méthode, une posture, une discipline, une véritable trajectoire professionnelle.
                                    </MotionTypography>
                                </ContentBox>
                            </Grid>
                        </Grid>
                    </MotionBox>

                    <AnimatedSection variants={dividerVariants} threshold={0.5}>
                        <MotionDivider sx={{ width: "40%", mx: "auto", borderColor: theme.palette.primary.light }} />
                    </AnimatedSection>

                    {/* Coaching Style Section */}
                    <MotionBox component="section" variants={sectionVariants}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <ContentBox variants={textVariants}>
                                    <SectionTitle>Mon style d'accompagnement</SectionTitle>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Je travaille comme j'aurais aimé qu'on travaille avec moi il y a 15 ans :
                                    </MotionTypography>
                                    <motion.div variants={listContainerVariants}>
                                        <MotionStack spacing={2} sx={{ mb: 3 }} variants={listContainerVariants}> {/* Use MotionStack */}
                                            {[
                                                "Avec exigence, parce que l'excellence se construit.",
                                                "Avec sur-mesure, parce que chaque agent a une histoire différente.",
                                                "Avec impact, parce qu'un changement sans exécution n'est qu'une idée.",
                                            ].map((item, index) => (
                                                <motion.div key={index} variants={listItemVariants}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            backgroundColor: theme.palette.background.default,
                                                            p: 2,
                                                            borderRadius: 1,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: "10px",
                                                                height: "10px",
                                                                flexShrink: 0,    // Prevent flexbox from shrinking this element
                                                                borderRadius: "50%",
                                                                bgcolor: theme.palette.primary.main,
                                                                mr: 2,
                                                                mt: 1,
                                                            }}
                                                        />
                                                        <Typography variant="body1" sx={{ color: theme.palette.text.secondary }}>
                                                            {item}
                                                        </Typography>
                                                    </Box>
                                                </motion.div>
                                            ))}
                                        </MotionStack>
                                    </motion.div>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Mon accompagnement s'adresse à tous les agents, débutants comme confirmés.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Car l'expérience ne garantit pas toujours la bonne méthode :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Même les meilleurs peuvent tomber dans des routines inefficaces, perdre du focus ou décaler leur posture sans même s'en rendre compte.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Je t'aide à réaligner ton activité, quelle que soit ta phase de carrière.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Et si tu ne trouves pas de programme qui correspond exactement à ton besoin sur mon site,
                                        je construis aussi des accompagnements sur-mesure, pour que tu bénéficies d'une trajectoire totalement adaptée à ton ambition.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Je t'apprends à devenir stratège de ton propre business, pas à suivre une check-list.
                                        Je t'aide à ancrer des méthodes, bâtir des routines, tenir ton cap même quand les vents sont contraires.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Pas d'effets de mode.
                                        Pas de one shot.
                                        Un changement profond et durable.
                                    </MotionTypography>
                                </ContentBox>
                            </Grid>
                        </Grid>
                    </MotionBox>

                    <AnimatedSection variants={dividerVariants} threshold={0.5}>
                        <MotionDivider sx={{ width: "40%", mx: "auto", borderColor: theme.palette.primary.light }} />
                    </AnimatedSection>

                    {/* Differentiating Asset Section */}
                    <MotionBox component="section" variants={sectionVariants}>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <ContentBox variants={textVariants}>
                                    <SectionTitle>Mon atout différenciant</SectionTitle>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Le métier d'agent immobilier est souvent mal compris.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Même par les agents.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Il est souvent vécu comme un métier d'exécution :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 1,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontStyle: 'italic',
                                        }}
                                        variants={textVariants}
                                    >
                                        répondre, organiser, visiter, publier, relancer, négocier.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Bref : faire tourner.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Mais la réalité est plus exigeante et beaucoup plus rare : ce métier n’est pas un métier “d’actions”, mais de décisions. Les décisions des clients.
                                    </MotionTypography>
                                    <Box sx={{ mb: 4, pl: 3, borderLeft: `4px solid ${theme.palette.primary.main}` }}>
                                        <MotionTypography
                                            variant="body1"
                                            sx={{
                                                mb: 2,
                                                color: theme.palette.text.secondary,
                                                lineHeight: 1.7,
                                            }}
                                            variants={textVariants}
                                        >
                                            La décision d'un vendeur de confier son bien, de suivre un plan de vente réaliste et d'assumer un prix cohérent.
                                        </MotionTypography>
                                        <MotionTypography
                                            variant="body1"
                                            sx={{
                                                color: theme.palette.text.secondary,
                                                lineHeight: 1.7,
                                            }}
                                            variants={textVariants}
                                        >
                                            La décision d'un acheteur de se positionner, d'avancer, s'engager, de faire une offre.
                                        </MotionTypography>
                                    </Box>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Et un dossier ne se perd pas seulement “à cause du marché”. Il se perd quand, à un moment précis, la décision du client n’a pas été construite ou protégée.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Le problème, c'est que cette perte ne fait pas de bruit sur l'instant. Elle ressemble souvent à quelque chose de banal :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontStyle: 'italic',
                                            pl: 2,
                                        }}
                                        variants={textVariants}
                                    >
                                        un "je vais réfléchir", un "je dois en parler", un "on se rappelle".
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Mais derrière ces phrases, le même mécanisme se répète: la vente se décentre, le cadre se fragilise, et l’agent est ramené à un rôle qu’il n’a pas choisi.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.primary.main,
                                            lineHeight: 1.7,
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                        }}
                                        variants={textVariants}
                                    >
                                        C’est exactement là que se situe mon atout différenciant.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        ImmoShift ne vient pas rendre un agent plus occupé.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        ImmoShift vient rendre et agent capable de conduire une vente, du début à la fin, sans négociation permanente de son rôle.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Car tant que le rôle ressemble à une prestation, le client se comporte comme avec une prestation :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontStyle: 'italic',
                                            pl: 2,
                                        }}
                                        variants={textVariants}
                                    >
                                        il compare, il teste, il met en concurrence, il découpe le discours, il repousse l'engagement.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Et l'agent, même sérieux, finit par glisser.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontStyle: 'italic',
                                            pl: 2,
                                        }}
                                        variants={textVariants}
                                    >
                                        Il s’adapte trop, rassure trop, explique trop et se justifie trop.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Et ce glissement a un prix.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 1,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Pas seulement en chiffre mais aussi énergie, en tempo, en stabilité, en autorité.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Et surtout, en respect du rôle.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        ImmoShift remet alors l’agent à sa place, au sens de son juste rang professionnel.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 1,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Le juste rang, c'est quand l'agent n'est plus perçu comme quelqu'un "qu'on consulte".
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        C’est quand il est perçu comme quelqu’un qu’on suit.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Parce que, dans les faits, un vendeur n'a pas besoin d'un intervenant de plus.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Il a besoin d’un professionnel qui tient une direction :
                                        quelqu’un qui sait ce qui doit être décidé, dans quel ordre, et à quel moment.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Et c’est exactement ce que fait un agent au bon niveau :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Il ne “prend pas une demande” mais prend la main sur un processus.
                                        Il ne “donne pas un avis sur le prix” mais rend le marché lisible.
                                        Il ne “se bat pas sur le prix”, mais construit une cohérence de vente.
                                        Il ne “répond pas aux objections” mais maintient l’adhésion du vendeur au plan de vente.
                                        Il ne “fait pas visiter” mais fait avancer une décision.
                                    </MotionTypography>
                                    <MotionDivider sx={{ my: 4, borderColor: theme.palette.primary.light }} />
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Ce repositionnement repose sur une tenue précise des scènes qui déterminent tout :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        L’ordre des sujets en rendez-vous vendeur, pour que le client comprenne la logique avant de juger le reste.
                                        La façon d’amener le prix sans déclencher un bras de fer, pour que le chiffre reste recevable.
                                        Le traitement des objections sans se sur-expliquer, pour que la posture professionnelle reste stable.
                                        La visite tenue comme une progression, pour que l’intérêt devienne une intention.
                                        Et le suivi pensé comme une continuité, pour que la décision ne se délite pas après coup.
                                    </MotionTypography>
                                    <MotionDivider sx={{ my: 4, borderColor: theme.palette.primary.light }} />
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Ce que cela change, sur le terrain, est immédiat.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        L'agent récupère une chose rare : sa maîtrise.
                                    </MotionTypography>
                                    <Box sx={{ mb: 3, pl: 2 }}>
                                        <MotionTypography variant="body1" sx={{ mb: 0.5, color: theme.palette.text.secondary, lineHeight: 1.7 }} variants={textVariants}>
                                            • Moins de dossiers qui s'étirent.
                                        </MotionTypography>
                                        <MotionTypography variant="body1" sx={{ mb: 0.5, color: theme.palette.text.secondary, lineHeight: 1.7 }} variants={textVariants}>
                                            • Moins d'énergie gaspillée à "rattraper".
                                        </MotionTypography>
                                        <MotionTypography variant="body1" sx={{ mb: 0.5, color: theme.palette.text.secondary, lineHeight: 1.7 }} variants={textVariants}>
                                            • Moins de négociations inutiles sur le prix, le mandat, les honoraires, le tempo.
                                        </MotionTypography>
                                    </Box>
                                    <Box sx={{ mb: 4, pl: 2 }}>
                                        <MotionTypography variant="body1" sx={{ mb: 0.5, color: theme.palette.text.secondary, lineHeight: 1.7, fontWeight: 600 }} variants={textVariants}>
                                            • Plus de décisions franches.
                                        </MotionTypography>
                                        <MotionTypography variant="body1" sx={{ mb: 0.5, color: theme.palette.text.secondary, lineHeight: 1.7, fontWeight: 600 }} variants={textVariants}>
                                            • Plus d'adhésion du vendeur au plan de vente.
                                        </MotionTypography>
                                        <MotionTypography variant="body1" sx={{ mb: 0.5, color: theme.palette.text.secondary, lineHeight: 1.7, fontWeight: 600 }} variants={textVariants}>
                                            • Plus de cohérence dans les échanges.
                                        </MotionTypography>
                                        <MotionTypography variant="body1" sx={{ mb: 0.5, color: theme.palette.text.secondary, lineHeight: 1.7, fontWeight: 600 }} variants={textVariants}>
                                            • Plus de stabilité dans l'activité.
                                        </MotionTypography>
                                    </Box>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariants}
                                    >
                                        Et surtout, une posture professionnelle qui se tient, parce qu'elle est portée par une méthode visible.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariants}
                                    >
                                        Une posture qui n’a plus besoin d’être défendue, parce qu’elle est devenue évidente.
                                    </MotionTypography>
                                    <MotionDivider sx={{ my: 4, borderColor: theme.palette.primary.light }} />
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.primary.main,
                                            lineHeight: 1.7,
                                            fontWeight: 700,
                                            fontSize: '1.1rem',
                                        }}
                                        variants={textVariants}
                                    >
                                        Voilà mon atout différenciant :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                            fontSize: '1.05rem',
                                        }}
                                        variants={textVariants}
                                    >
                                        sortir définitivement l’agent du rôle prestataire, pour remettre son métier à son niveau réel : un métier incontestable.
                                    </MotionTypography>
                                </ContentBox>
                            </Grid>
                        </Grid>
                    </MotionBox>
                </Stack>
            </Container>
        </Box>
    );
};

export default PresentationSection;
