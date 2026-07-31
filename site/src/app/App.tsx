import Announcement from "../features/announcement/Announcement";
import Cta from "../features/cta/Cta";
import Footer from "../features/footer/Footer";
import Hero from "../features/hero/Hero";
import Motion from "../features/motion/Motion";
import Profile from "../features/profile/Profile";
import Topics from "../features/topics/Topics";
import Visuals from "../features/visuals/Visuals";

export default function App() {
  return (
    <div id="top">
      <a className="skip-link" href="#content">本文へ移動</a>
      <main>
        <Hero />
        <Announcement />
        <Topics />
        <Profile />
        <Motion />
        <Visuals />
        <Cta />
        <Footer />
      </main>
    </div>
  );
}
