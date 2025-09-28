import React, {useState, useEffect} from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Modal from './components/Modal';
import HowItWorks from './components/HowItWorks';
import WhyChooseUs from './components/WhyChooseUs';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 50,
    });
  }, []);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeModal]);

  const openModal = (modalName) => setActiveModal(modalName);
  const closeModal = () => setActiveModal(null);

  const getModalContent = () => {
    switch (activeModal) {
      case 'howItWorks':
        return <HowItWorks />;
      case 'whyUs':
        return <WhyChooseUs />;
      case 'contact':
        return <ContactForm />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Navbar openModal={openModal} />
      <main>
        <Hero onRequestReview={() => openModal('contact')} />
        <Services />
        {/* <WhyChooseUs /> REMOVED FROM HERE */}
      </main>
      <Footer />

      {activeModal && (
        <Modal onClose={closeModal}>
          {getModalContent()}
        </Modal>
      )}
    </div>
  );
}

export default App;