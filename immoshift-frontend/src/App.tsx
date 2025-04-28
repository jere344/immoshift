import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useEffect } from "react";
import "./App.css";
import HomePage from "./components/home/HomePage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { getLightTheme } from "@theme/lightTheme";

// New component imports for ImmoShift
import ArticleDetail from "./components/article/ArticleDetail";
import TrainingDetail from "./components/training/TrainingDetail";
import EbookDetailPage from "./components/ebooks/EbookDetail";
import ThankYouPage from "./components/ebooks/ThankYouPage";

function ScrollToTop() {
    const { pathname, search } = useLocation();

    useEffect(() => {
        // Only scroll to top if there's no hash in the URL
        if (!window.location.hash) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "instant",
            });
        }
    }, [pathname, search]);

    return null;
}

// Layout component
const Layout = () => {
    return (
        <>
            <CssBaseline />
            <Header />
            <Routes>
                <Route path="/" element={<Navigate to="/home/" replace />} />
                <Route path="/home/" element={<HomePage />} />
                
                <Route path="/articles/:slug" element={<ArticleDetail />} />
                <Route path="/training/:slug" element={<TrainingDetail />} />
                <Route path="/ebooks/:slug" element={<EbookDetailPage />} />
                <Route path="/thank-you" element={<ThankYouPage />} />
                
                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
        </>
    );
};

function App() {
    return (
        <ThemeProvider theme={getLightTheme()}>
            <ScrollToTop />
            <Layout />
        </ThemeProvider>
    );
}

export default App;
