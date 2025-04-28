import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, CardMedia, Button, useTheme, Chip, Stack } from "@mui/material";
import { TrainingSummary } from "@models/Training";
import { Link as RouterLink } from "react-router-dom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

interface TrainingsSectionProps {
    trainings: TrainingSummary[];
}

const TrainingsSection: React.FC<TrainingsSectionProps> = ({ trainings }) => {
    const theme = useTheme();

    if (!trainings.length) {
        return null;
    }

    return (
        <Box
            id="trainings"
            sx={{
                py: 10,
                background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, rgba(240, 242, 245, 1) 100%)`,
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography
                        variant="h2"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            mb: 2,
                            backgroundImage: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            fontSize: { xs: "2.5rem", md: "3rem" },
                        }}
                    >
                        Nos Formations
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 400,
                            maxWidth: "800px",
                            mx: "auto",
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Des formations exclusives pour maîtriser l'investissement immobilier
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {trainings.map((training) => (
                        <Grid item xs={12} sm={6} md={4} key={training.id}>
                            <Card
                                sx={{
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-8px)",
                                        boxShadow: 8,
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={training.image || "https://via.placeholder.com/400x200?text=Formation"}
                                    alt={training.title}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
                                    <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                                        {training.title}
                                    </Typography>

                                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                        {training.duration && (
                                            <Chip
                                                icon={<AccessTimeIcon />}
                                                label={training.duration}
                                                size="small"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        )}
                                        {training.price !== undefined && training.price > 0 && training.show_price && (
                                            <Chip label={`${training.price} €`} size="small" color="secondary" />
                                        )}
                                    </Stack>

                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
                                        {training.short_description}
                                    </Typography>

                                    <Box sx={{ mt: "auto" }}>
                                        <Button
                                            component={RouterLink}
                                            to={`/training/${training.slug}`}
                                            variant="contained"
                                            color="primary"
                                            fullWidth
                                            sx={{
                                                borderRadius: 1.5,
                                                textTransform: "none",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Découvrir cette formation
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default TrainingsSection;
