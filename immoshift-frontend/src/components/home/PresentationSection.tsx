import React, { useRef, useEffect } from "react";
import { Box, Container, Typography, Grid, useTheme, Divider, Paper, Stack } from "@mui/material";
import professional from "@assets/professional.jpg";
import working from "@assets/girl-2583442_1280.jpg";
import { motion, useAnimation, useInView } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionPaper = motion(Paper);
const MotionGrid = motion(Grid);
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
                mb: 3,
                color: theme.palette.primary.main,
                position: "relative",
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
            variants={titleVariants} // Apply animation variants
        >
            {children}
        </MotionTypography>
    );

    const ContentBox = ({ children, variants }: { children: React.ReactNode, variants?: any }) => (
        <AnimatedSection variants={variants || textVariants} threshold={0.2}>
            <MotionPaper
                elevation={0}
                sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 2,
                    backgroundColor: theme.palette.background.paper,
                    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out", // Keep CSS transitions for hover
                    "&:hover": {
                        boxShadow: 3,
                        // transform: "translateY(-5px)", // Motion handles this
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
                    maxHeight: { xs: "300px", sm: "400px", md: "unset" },
                    objectFit: { xs: "cover", md: "contain" },
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                minWidth: 15,
                                                                mt: 0.7,
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
                                    <MotionTypography // Animate this block
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
                            <Grid item xs={12} md={6}>
                                <ContentBox variants={textVariants}>
                                    <MotionTypography // Already animated, ensure it uses SectionTitle component if desired
                                        variant="h3"
                                        sx={{ mb: 3 }}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        Mon style d'accompagnement
                                    </MotionTypography>
                                    <MotionTypography // Animate this block
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
                                                            alignItems: "center",
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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
                                    <MotionTypography // Animate this block
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

                            <Grid item xs={12} md={6}>
                                <ContentBox variants={textVariantsRight}>
                                    <SectionTitle>Mon atout différenciant</SectionTitle>
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Je ne me contente pas d'enseigner des techniques.
                                        Je construis des agents stratégiques, mentalement solides et humainement impactants.
                                    </MotionTypography>
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Diplômée en PNL (Programmation Neuro-Linguistique) et en hypnose ericksonienne,
                                        j'intègre à mes accompagnements des outils avancés de communication et de renforcement mental.
                                    </MotionTypography>
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Important :
                                    </MotionTypography>
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        L'hypnose ericksonienne n'est pas une technique de manipulation.
                                        C'est un outil d'accompagnement respectueux, destiné à activer tes propres ressources,
                                        à renforcer ta confiance, ta stabilité émotionnelle et ton impact relationnel.
                                    </MotionTypography>
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Pourquoi est-ce fondamental en immobilier ?
                                    </MotionTypography>
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Parce que :
                                    </MotionTypography>
                                    <motion.div variants={listContainerVariants}>
                                        <MotionStack spacing={1} sx={{ mb: 3 }} variants={listContainerVariants}> {/* Use MotionStack */}
                                            { [
                                                "Convaincre un propriétaire, c'est avant tout générer de la confiance et de l'adhésion émotionnelle.",
                                                "Gérer un rendez-vous vendeur, c'est maîtriser son langage, sa posture, son pouvoir d'influence éthique.",
                                                "Tenir dans la durée, performer semaine après semaine, exige un mental structuré, préparé, orienté réussite."
                                            ].map((item, index) => (
                                                <motion.div key={index} variants={listItemVariants}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                minWidth: 15,
                                                                mt: 0.7,
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
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Avec mes compétences de PNL et d'hypnose ericksonienne intégrées intelligemment à ma méthode,
                                        je t'aide à :
                                    </MotionTypography>
                                    <motion.div variants={listContainerVariants}>
                                        <MotionStack spacing={1} sx={{ mb: 3 }} variants={listContainerVariants}> {/* Use MotionStack */}
                                            { [
                                                "Reprogrammer ta discipline",
                                                "Ancrer ton pilotage business",
                                                "Maîtriser ta communication d'influence",
                                                "Performer sans t'épuiser"
                                            ].map((item, index) => (
                                                <motion.div key={index} variants={listItemVariants}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems: "flex-start",
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                width: "10px",
                                                                height: "10px",
                                                                minWidth: "10px", // Prevent horizontal squishing
                                                                flexShrink: 0,    // Prevent flexbox from shrinking this element
                                                                borderRadius: "50%",
                                                                bgcolor: theme.palette.primary.main,
                                                                mr: 2,
                                                                display: "block", // Ensure it's rendered as a block element
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
                                    <MotionTypography // Animate this block
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        L'immobilier est un métier de stratégie ET d'émotion.
                                        Je t'enseigne à maîtriser les deux.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            color: theme.palette.primary.main,
                                            fontStyle: "italic",
                                        }}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
                                    >
                                        ImmoShift
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: theme.palette.primary.main,
                                            fontStyle: "italic",
                                        }}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}
                                    >
                                        Change ton approche.
                                        Change ta trajectoire.
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
