import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import SolutionSection from '../components/SolutionSection';
import FeaturesSection from '../components/FeaturesSection'; // <-- 1. Importer le composant manquant
import BenefitsSection from '../components/BenefitsSection';
import RoiSection from '../components/RoiSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <AboutSection />
        <SolutionSection />
        <FeaturesSection /> {/* <-- 2. Ajouter le composant ici, à sa place */}
        <BenefitsSection />
        <RoiSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;