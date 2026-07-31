
import HeroSection from "@/components/hero1";
import Navbar from "@/components/navbar";
import Features from "@/components/features";
import Pricing from "@/components/pricing";
import Footer from "@/components/footer";

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <HeroSection />
        <Features />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
};

export default App;