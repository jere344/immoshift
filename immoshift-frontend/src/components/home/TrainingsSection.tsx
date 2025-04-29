import React, { useRef, useEffect } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, useTheme, Chip, Stack, Paper, Avatar, Divider } from "@mui/material";
import { TrainingSummary } from "@models/Training";
import { Link as RouterLink } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion, useAnimation, useInView } from 'framer-motion';

// Motion components
const MotionBox = motion(Box);
const MotionTypography = motion(Typography);
const MotionGrid = motion(Grid);
const MotionPaper = motion(Paper);

interface TrainingsSectionProps {
    trainings: TrainingSummary[];
}

const TrainingsSection: React.FC<TrainingsSectionProps> = ({ trainings }) => {
    const theme = useTheme();
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    useEffect(() => {
        if (isInView) {
            controls.start('visible');
        }
    }, [isInView, controls]);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2, // Stagger the animation of children
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    if (!trainings.length) {
        return null;
    }

    return (
        <MotionBox
            id="trainings"
            ref={ref}
            initial="hidden"
            animate={controls}
            sx={{
                py: 12,
                background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(240, 242, 245, 1) 100%)`,
            }}
        >
            <Container maxWidth="lg">
                <MotionBox sx={{ textAlign: "center", mb: 8 }} variants={titleVariants}>
                    <MotionTypography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                        }}
                    >
                        Nos Formations
                    </MotionTypography>
                    <MotionTypography
                        variant="h5"
                        sx={{
                            fontWeight: 400,
                            maxWidth: "800px",
                            mx: "auto",
                            color: theme.palette.text.secondary,
                            fontSize: { xs: "1.2rem", md: "1.4rem" },
                        }}
                    >
                        Des formations exclusives pour maîtriser l'investissement immobilier
                    </MotionTypography>
                </MotionBox>

                <MotionGrid
                    container
                    spacing={5}
                    variants={containerVariants} // Apply container variants here
                >
                    {trainings.map((training) => (
                        <MotionGrid
                            item
                            xs={12}
                            md={6}
                            key={training.id}
                            variants={itemVariants} // Apply item variants to each grid item
                        >
                            <MotionPaper
                                elevation={0}
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                    transition: "all 0.4s ease-in-out",
                                    border: `1px solid ${theme.palette.divider}`,
                                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                    "&:hover": {
                                        // transform: "translateY(-12px)", // Motion handles this
                                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                                        borderColor: theme.palette.primary.light,
                                    },
                                }}
                                whileHover={{ y: -12 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                            >
                                {/* ... existing card content ... */}
                                <Box sx={{ position: "relative" }}>
                                    <CardMedia
                                        component="img"
                                        height="280"
                                        image={training.image || "https://via.placeholder.com/600x280?text=Formation+Premium"}
                                        alt={training.title}
                                        sx={{
                                            objectFit: "cover",
                                            filter: "brightness(0.95)",
                                        }}
                                    />
                                    {training.price !== undefined && training.price > 0 && training.show_price && (
                                        <Chip
                                            label={`${training.price} €`}
                                            size="medium"
                                            color="secondary"
                                            sx={{
                                                position: "absolute",
                                                top: 16,
                                                right: 16,
                                                fontWeight: "bold",
                                                fontSize: "1rem",
                                                py: 0.5,
                                                px: 1,
                                                boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                                            }}
                                        />
                                    )}
                                    <Avatar
                                        sx={{
                                            position: "absolute",
                                            bottom: "-24px",
                                            left: "24px",
                                            width: 48,
                                            height: 48,
                                            backgroundColor: theme.palette.primary.main,
                                            boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
                                        }}
                                    >
                                        <StarIcon />
                                    </Avatar>
                                </Box>
                                <CardContent sx={{
                                    flexGrow: 1,
                                    display: "flex",
                                    flexDirection: "column",
                                    p: 4,
                                    pt: 4
                                }}>
                                    <Typography
                                        variant="h4"
                                        component="h3"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 700,
                                            mb: 2,
                                            mt: 1,
                                            fontSize: { xs: "1.5rem", md: "1.8rem" },
                                            color: theme.palette.text.primary,
                                            lineHeight: 1.3,
                                        }}
                                    >
                                        {training.title}
                                    </Typography>

                                    {training.duration && (
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                            <AccessTimeIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                                            <Typography variant="subtitle1" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
                                                {training.duration}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Divider sx={{ my: 2 }} />

                                    <Box
                                        sx={{
                                            mb: 4,
                                            flexGrow: 1,
                                            overflow: 'auto',
                                            maxHeight: '300px', // Added max height for long descriptions
                                            scrollbarWidth: 'thin',
                                            '&::-webkit-scrollbar': {
                                                width: '6px',
                                            },
                                            '&::-webkit-scrollbar-track': {
                                                background: '#f1f1f1',
                                                borderRadius: '10px',
                                            },
                                            '&::-webkit-scrollbar-thumb': {
                                                background: theme.palette.primary.light,
                                                borderRadius: '10px',
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            component="div"
                                            sx={{
                                                lineHeight: 1.7,
                                                color: theme.palette.text.secondary,
                                                fontSize: "1rem",
                                            }}
                                        >
                                            {training.short_description.split('\n').map((text, index) => (
                                                <p key={index} style={{
                                                    marginBottom: '0.7em',
                                                    marginTop: index === 0 ? 0 : '0.7em'
                                                }}>
                                                    {text}
                                                </p>
                                            ))}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ mt: "auto" }}>
                                        <Button
                                            component={RouterLink}
                                            to={`/training/${training.slug}`}
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            endIcon={<ArrowForwardIcon />}
                                            size="large"
                                            sx={{
                                                borderRadius: 2,
                                                textTransform: "none",
                                                fontWeight: 600,
                                                py: 1.5,
                                                fontSize: "1rem",
                                                boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                                                "&:hover": {
                                                    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                                                }
                                            }}
                                        >
                                            Découvrir cette formation
                                        </Button>
                                    </Box>
                                </CardContent>
                            </MotionPaper>
                        </MotionGrid>
                    ))}
                </MotionGrid>
            </Container>
        </MotionBox>
    );
};

export default TrainingsSection;
