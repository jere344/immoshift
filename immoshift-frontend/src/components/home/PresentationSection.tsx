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
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            
                                        }}
                                        variants={textVariants}
                                    >
                                        J'ai été agent immobilier pendant 20 ans.
                                        Et dans ce métier, il n'y a rien que je n'aie vécu, transpiré, encaissé, subi, appris, corrigé, traversé et transformé en maîtrise.
                                        Le rythme, la pression, les retournements, les victoires, les dossiers qui tombent, les journées qui débordent, la charge invisible,  celle que seuls les agents comprennent.
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
                                        Je l'ai porté, dans le beau comme dans le dur.
                                        Et c'est précisément ce qui forge une vraie légitimité : traverser le réel, sans filtre, jusqu'à en comprendre la logique.
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
                                        En vingt ans, j'ai connu plusieurs marchés.
                                        Des conjonctures favorables, d'autres plus exigeantes, des périodes fluides, des périodes tendues.
                                        Ce parcours m'a appris une chose simple : le marché immobilier a toujours été en mouvement.
                                        Un agent ne devient pas solide parce que le contexte l'aide.
                                        Il devient solide parce que son niveau tient, même quand le contexte change.
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
                                        Pendant une grande partie de ces années, j'ai dirigé plusieurs agences.
                                        Et cette place-là m'a donné une lecture claire : il existe mille profils d'agents, mille styles, mille trajectoires… mais une seule frontière sépare ceux qui subissent le métier de ceux qui le tiennent vraiment : la tenue professionnelle, la cohérence, la capacité à rester leader dans la relation client.
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
                                        Au fil du temps, je me suis nourrie des meilleurs.
                                        Dans l'immobilier, évidemment.
                                        Et aussi ailleurs : auprès d'univers où l'exigence est un standard, où l'on apprend à penser plus haut, à structurer plus juste, à performer sans se trahir.
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
                                        C'est ce chemin-là qui a façonné ce que je transmets aujourd'hui.
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
                                        Ces dernières années, j'ai choisi de former et d'accompagner des agents immobiliers de tous niveaux, à distance et en présentiel.
                                        Avec une intention très précise : élever le métier, et replacer l'agent dans son juste rang , à savoir  celui d'un professionnel qu'on écoute, qu'on respecte, et qu'on suit comme une évidence.
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
                                        ImmoShift n'existe pas pour ajouter une couche de plus.
                                        ImmoShift existe pour installer un niveau : une vision, une tenue, une méthode de travail qui se voit… et qui change tout sur le terrain.
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
                            <Grid item xs={12} md={6} sx={{ order: { xs: 2 } }}>
                                <Box sx={{ p: 2 }}>
                                    <ImageDisplay src={working} alt="ImmoShift approach" />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sx={{ order: { xs: 1 } }}>
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
                                        ImmoShift intervient là où le métier se joue vraiment :
                                        dans les moments où un agent ne "fait" plus simplement de l'immobilier… mais doit tenir une vente, tenir un client, tenir une direction, et tenir son rang, malgré la pression, la concurrence, l'émotion et l'incertitude.
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
                                        L'objectif est d'installer une méthode lisible et exigeante, capable de transformer une activité parfois brillante mais instable en trajectoire professionnelle maîtrisée.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 1,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Car dans ce métier, tout finit par se payer :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        l'improvisation se paie en rendez-vous fragiles,
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        la dispersion se paie en dossiers interminables,
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        le flou se paie en négociations permanentes,
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
                                        et la posture "prestataire" se paie en mise en concurrence automatique.
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
                                        ImmoShift travaille donc sur l'essentiel :
                                        rendre l'agent incontournable dans la mécanique de décision du client.
                                        Non par domination, non par mise en scène.
                                        Par justesse, par structure, par tenue, par séquençage, et par maîtrise des scènes qui font basculer un dossier d'un "peut-être" vers un "oui".
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            mt: 4,
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Une formation pensée pour le terrain réel
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
                                        Chaque action de formation démarre par une étape fondatrice : comprendre la réalité professionnelle de l'agent avant de transmettre quoi que ce soit.
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
                                        Cela passe par une lecture précise de son fonctionnement :
                                        son organisation, ses habitudes métier, ses angles morts, ses points de friction, ses réflexes sous pression, ses priorités, et la manière dont il tient ou perd la main dans une vente.
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
                                        Un échange téléphonique de cadrage et un questionnaire de positionnement permettent d'identifier ce qui doit être renforcé, simplifié, consolidé ou reconstruit, afin que la formation réponde à une réalité concrète, et non à une version théorique du métier.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            mt: 4,
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Des formats adaptés, sans dilution
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
                                        Les actions de formation sont proposées :
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 0.5,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        en individuel ou en groupe,
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
                                        à distance ou en présentiel.
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
                                        La formation à distance signifie une transmission structurée en visio, avec le même niveau d'exigence que sur le terrain : une pédagogie vivante, une précision de lecture, un tempo, et un travail appliqué à des situations professionnelles réelles.
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
                                        Quel que soit le format, l'intention reste identique :
                                        installer une méthode qui tient dans la durée, et une posture qui se voit dans les résultats.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            mt: 4,
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        Ce que cela transforme chez un agent
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
                                        Lorsque la méthode est posée au bon niveau, les effets deviennent concrets :
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
                                        les rendez-vous gagnent en tenue, les échanges gagnent en poids, les objections cessent d'être des pièges,
                                        le prix cesse d'être une guerre,
                                        le mandat cesse d'être "à obtenir", et l'agent cesse de se justifier pour exister.
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
                                        L'activité devient plus lisible, 
                                        cohérente, constante. 
                                        Et surtout : moins dépendante du hasard, du contexte conjoncturel, ou de l'énergie du moment.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="h6"
                                        sx={{
                                            mb: 2,
                                            mt: 4,
                                            color: theme.palette.primary.main,
                                            fontWeight: 600,
                                        }}
                                        variants={textVariantsRight}
                                    >
                                        ImmoShift
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
                                        ImmoShift forme des professionnels capables de conduire une vente du début à la fin, avec une légitimité qui ne se négocie plus à chaque étape.
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
                                    <SectionTitle>MON STYLE D'ACCOMPAGNEMENT</SectionTitle>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            
                                        }}
                                        variants={textVariants}
                                    >
                                        Je forme avec une exigence élevée et une attention fine au réel. Parce qu'un agent immobilier ne peut pas exercer ce métier comme un prestataire exécutant,  même armé des meilleurs outils, des meilleures plateformes, ou de l'IA la plus performante.
                                        Ce métier ne se gagne pas à coups de fonctionnalités. Il se gagne à coups de tenue.
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
                                        L'immobilier demande une maîtrise globale : savoir capter l'attention, poser une direction de vente, rendre un marché compréhensible, gérer le tempo, absorber les tensions, traverser les hésitations, sécuriser une décision.
                                        Et pendant que le client vit son projet avec l'émotion, l'argent, l'urgence ou la peur de se tromper, l'agent, lui, doit rester stable : précis, crédible, et irréprochable dans sa manière de conduire.
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
                                        Le marché n'est jamais figé. Il évolue, se retourne, accélère, se contracte.
                                        Et au milieu de ces mouvements, il existe une variable plus imprévisible que toutes les autres : la part humaine. Des arbitrages qui changent, des silences qui apparaissent, des résistances qui montent, des projets qui avancent puis se tendent. C'est là que se joue la vraie différence entre un agent actif… et un agent qui tient une vente.
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
                                        C'est pour cela que mon travail commence toujours par une compréhension précise de votre réalité terrain.
                                        Un échange préalable et un questionnaire me permettent de situer votre contexte, vos priorités, votre niveau de maîtrise, et les zones exactes où votre activité se fragilise, se disperse, ou plafonne,  parfois sans signal évident.
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
                                        Ensuite, la formation suit une progression claire.
                                        Qu'il s'agisse d'un format déjà conçu (présenté dans la rubrique « mes formations en vedette ») ou d'un format construit sur mesure, tout repose sur une logique pédagogique : objectifs définis, étapes structurées, travail sur vos situations réelles, consolidation de ce qui doit tenir dans la durée.
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
                                        Ce que la formation installe, c'est une tenue professionnelle incontestable : une parole plus nette, une méthode plus cohérente, une conduite plus précise, et une capacité à faire avancer un dossier sans se laisser déplacer.
                                        C'est cette tenue qui change la façon dont le client se comporte : moins de tests, moins de négociation permanente, plus d'adhésion, plus de décisions franches.
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
                                        Lorsque la formation se fait à distance, elle reste profondément humaine et impliquée. Ce sont de vrais échanges, en direct, avec un travail précis sur vos situations réelles, et une présence qui suit le fil : comprendre, ajuster, renforcer, faire progresser.
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
                                        Mon travail s'adresse aussi bien aux agents débutants qu'aux confirmés.
                                        Parce qu'on peut être très investi et manquer d'ordre.
                                        On peut être expérimenté et s'être installé dans des automatismes qui coûtent cher.
                                        Et on peut aussi être déjà performant, tout en visant plus haut : franchir un palier, gagner en impact, tenir des dossiers plus ambitieux, et cesser de plafonner à un niveau "correct".
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
                                        Si votre besoin ne correspond pas exactement aux formats présentés, je construis également une formation sur mesure, pensée pour vous.
                                        Je garde une règle simple : on ne forme pas un agent sur une idée, on le forme sur une réalité.
                                        L'objectif est d'élever votre niveau de maîtrise et de vous rendre capable de tenir votre métier avec plus d'ascendant, plus de solidité, et plus de résultats.
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
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                        }}
                                        variants={textVariants}
                                    >
                                        Le métier d'agent immobilier est souvent mal compris. Même par les agents.
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                        }}
                                        variants={textVariants}
                                    >
                                        Il est souvent vécu comme un métier d'exécution : répondre, organiser, visiter, publier, relancer, négocier. Bref : faire tourner.
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
