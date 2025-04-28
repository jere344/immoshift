import React from "react";
import { Box, Container, Typography, Grid, useTheme, Divider, Paper, Stack } from "@mui/material";

const PresentationSection = () => {
    const theme = useTheme();

    const SectionTitle = ({ children }: { children: React.ReactNode }) => (
        <Typography
            variant="h3"
            component="h2"
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
        >
            {children}
        </Typography>
    );

    const ContentBox = ({ children }: { children: React.ReactNode }) => (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                height: "100%",
                borderRadius: 2,
                backgroundColor: theme.palette.background.paper,
                transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                "&:hover": {
                    boxShadow: 3,
                    transform: "translateY(-5px)",
                },
            }}
        >
            {children}
        </Paper>
    );

    const ImageDisplay = ({ src, alt }: { src: string; alt: string }) => (
        <Box
            component="img"
            src={src}
            alt={alt}
            sx={{
                width: "100%",
                height: "auto",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                    transform: "scale(1.02)",
                },
            }}
        />
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
                    <Box component="section">
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={6}>
                                <ContentBox>
                                    <SectionTitle>Qui je suis</SectionTitle>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je suis née sur le terrain.
                                        Depuis 2006, l'immobilier est devenu pour moi un métier d'exigence, de rigueur, d'endurance et de résultats.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        J'ai tout traversé :
                                    </Typography>
                                    <Stack spacing={1} sx={{ mb: 3 }}>
                                        {["La prospection.", 
                                          "La pige.",
                                          "La signature.",
                                          "La négociation.",
                                          "Et surtout : la performance terrain, validée par des podiums de chiffre d'affaires sur plusieurs années."
                                        ].map((item, index) => (
                                            <Typography
                                                key={index}
                                                variant="body1"
                                                sx={{
                                                    color: theme.palette.text.secondary,
                                                    lineHeight: 1.7,
                                                }}
                                            >
                                                {item}
                                            </Typography>
                                        ))}
                                    </Stack>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Pendant une grande partie de ma carrière, j'ai occupé le rôle de directrice d'agence, où j'ai dirigé, formé, inspiré des équipes, tout en restant en lien avec la réalité du terrain.
                                        J'ai non seulement piloté des équipes mais aussi performé à titre individuel en générant des résultats solides.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je connais intimement la réalité de ce métier :
                                        l'adrénaline des signatures, la pression des objectifs, le doute après plusieurs rendez-vous infructueux, l'exigence mentale d'enchaîner les jours sans relâche.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Année après année, transaction après transaction, j'ai bâti une carrière rentable et structurée — non pas par hasard, mais par méthode, par rigueur et par discipline.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        À force de produire et de performer, mes confrères sont venus naturellement me chercher.
                                        "Comment tu fais ?" "Comment tu t'organises ?"
                                        Et de fil en aiguille, la transmission est devenue une mission : transmettre ce que j'aurais rêvé qu'on m'apprenne dès mes débuts.
                                    </Typography>
                                </ContentBox>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <Box sx={{ p: 2 }}>
                                    <ImageDisplay src="/presentation.jpg" alt="Professional presentation" />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ width: "40%", mx: "auto", borderColor: theme.palette.primary.light }} />

                    {/* Current Work Section */}
                    <Box component="section">
                        <Grid container spacing={6} alignItems="center">
                            <Grid item xs={12} md={6} sx={{ order: { xs: 2, md: 1 } }}>
                                <Box sx={{ p: 2 }}>
                                    <ImageDisplay src="/history.jpg" alt="ImmoShift approach" />
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 2 } }}>
                                <ContentBox>
                                    <SectionTitle>Ce que je fais aujourd'hui</SectionTitle>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je ne suis pas une formatrice de vitrines.
                                        Je suis une stratège de terrain.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                    >
                                        ImmoShift est né d'une conviction forte :
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Quand on structure ses méthodes, ses rituels et son pilotage business, on ne subit plus ce métier. On le maîtrise.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je n'enseigne rien que je n'ai pas appliqué, éprouvé, et optimisé par l'expérience terrain.
                                        Pas de recettes miracles.
                                        Pas de discours théoriques.
                                        Pas de promesses creuses.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Ce que je propose, c'est un accompagnement à haute valeur humaine :
                                    </Typography>
                                    <Stack spacing={1} sx={{ mb: 3 }}>
                                        {[
                                            "Des sessions stratégiques exigeantes",
                                            "Des outils concrets et personnalisés",
                                            "Des échanges réguliers pour ancrer la transformation",
                                            "Et surtout, une vraie présence humaine : je reste en contact direct avec les agents que j'accompagne."
                                        ].map((item, index) => (
                                            <Box
                                                key={index}
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
                                        ))}
                                    </Stack>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Chaque agent que je forme ressort avec bien plus qu'une formation :
                                        il repart avec une méthode, une posture, une discipline, une véritable trajectoire professionnelle.
                                    </Typography>
                                </ContentBox>
                            </Grid>
                        </Grid>
                    </Box>

                    <Divider sx={{ width: "40%", mx: "auto", borderColor: theme.palette.primary.light }} />

                    {/* Coaching Style Section */}
                    <Box component="section">
                        <Grid container spacing={6}>
                            <Grid item xs={12} md={6}>
                                <ContentBox>
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            mb: 3,
                                        }}
                                    >
                                        Mon style d'accompagnement
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je travaille comme j'aurais aimé qu'on travaille avec moi il y a 15 ans :
                                    </Typography>
                                    <Stack spacing={2} sx={{ mb: 3 }}>
                                        {[
                                            "Avec exigence, parce que l'excellence se construit.",
                                            "Avec sur-mesure, parce que chaque agent a une histoire différente.",
                                            "Avec impact, parce qu'un changement sans exécution n'est qu'une idée.",
                                        ].map((item, index) => (
                                            <Box
                                                key={index}
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
                                        ))}
                                    </Stack>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Mon accompagnement s'adresse à tous les agents, débutants comme confirmés.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Car l'expérience ne garantit pas toujours la bonne méthode :
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Même les meilleurs peuvent tomber dans des routines inefficaces, perdre du focus ou décaler leur posture sans même s'en rendre compte.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je t'aide à réaligner ton activité, quelle que soit ta phase de carrière.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Et si tu ne trouves pas de programme qui correspond exactement à ton besoin sur mon site,
                                        je construis aussi des accompagnements sur-mesure, pour que tu bénéficies d'une trajectoire totalement adaptée à ton ambition.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je t'apprends à devenir stratège de ton propre business, pas à suivre une check-list.
                                        Je t'aide à ancrer des méthodes, bâtir des routines, tenir ton cap même quand les vents sont contraires.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Pas d'effets de mode.
                                        Pas de one shot.
                                        Un changement profond et durable.
                                    </Typography>
                                </ContentBox>
                            </Grid>

                            <Grid item xs={12} md={6}>
                                <ContentBox>
                                    <SectionTitle>Mon atout différenciant</SectionTitle>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Je ne me contente pas d'enseigner des techniques.
                                        Je construis des agents stratégiques, mentalement solides et humainement impactants.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Diplômée en PNL (Programmation Neuro-Linguistique) et en hypnose ericksonienne,
                                        j'intègre à mes accompagnements des outils avancés de communication et de renforcement mental.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Important :
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 3,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        L'hypnose ericksonienne n'est pas une technique de manipulation.
                                        C'est un outil d'accompagnement respectueux, destiné à activer tes propres ressources,
                                        à renforcer ta confiance, ta stabilité émotionnelle et ton impact relationnel.
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                            fontWeight: 600,
                                        }}
                                    >
                                        Pourquoi est-ce fondamental en immobilier ?
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Parce que :
                                    </Typography>
                                    <Stack spacing={1} sx={{ mb: 3 }}>
                                        {[
                                            "Convaincre un propriétaire, c'est avant tout générer de la confiance et de l'adhésion émotionnelle.",
                                            "Gérer un rendez-vous vendeur, c'est maîtriser son langage, sa posture, son pouvoir d'influence éthique.",
                                            "Tenir dans la durée, performer semaine après semaine, exige un mental structuré, préparé, orienté réussite."
                                        ].map((item, index) => (
                                            <Box
                                                key={index}
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
                                        ))}
                                    </Stack>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 2,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        Avec mes compétences de PNL et d'hypnose ericksonienne intégrées intelligemment à ma méthode,
                                        je t'aide à :
                                    </Typography>
                                    <Stack spacing={1} sx={{ mb: 3 }}>
                                        {[
                                            "Reprogrammer ta discipline",
                                            "Ancrer ton pilotage business",
                                            "Maîtriser ta communication d'influence",
                                            "Performer sans t'épuiser"
                                        ].map((item, index) => (
                                            <Box
                                                key={index}
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
                                        ))}
                                    </Stack>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mb: 4,
                                            color: theme.palette.text.secondary,
                                            lineHeight: 1.7,
                                        }}
                                    >
                                        L'immobilier est un métier de stratégie ET d'émotion.
                                        Je t'enseigne à maîtriser les deux.
                                    </Typography>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            fontWeight: 600,
                                            color: theme.palette.primary.main,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        ImmoShift
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: theme.palette.primary.main,
                                            fontStyle: "italic",
                                        }}
                                    >
                                        Change ton approche.
                                        Change ta trajectoire.
                                    </Typography>
                                </ContentBox>
                            </Grid>
                        </Grid>
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
};

export default PresentationSection;
