import React, { useCallback } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import './Hero.css';

const Hero = ({ onRequestReview }) => {
  const [init, setInit] = React.useState(false);

  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particleOptions = {
    background: { color: { value: 'transparent' } },
    fpsLimit: 120,
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: '#a0a0b0' },
      shape: { type: 'circle' },
      opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 1, sync: false } },
      size: { value: { min: 1, max: 3 } },
      links: { enable: false },
      move: {
        enable: true,
        speed: 0.5,
        direction: 'none',
        random: true,
        straight: false,
        outModes: { default: 'out' },
      },
    },
    interactivity: { events: { onHover: { enable: false } } },
    detectRetina: true,
  };

  if (!init) {
    return <></>;
  }

  return (
    <section className="hero-section" id="hero">
      <Particles id="tsparticles" options={particleOptions} className="particles-background" />
      <div className="hero-content">
        <TypeAnimation
          sequence={[
            'Ethical Vulnerability Testing', 2000,
            'Modern Web App Security', 2000,
            'Secure Your Digital Assets', 2000,
          ]}
          wrapper="h1"
          speed={50}
          className="hero-title"
          repeat={Infinity}
          cursor={false}
        />
        <p className="hero-subtitle">
          We find vulnerabilities before malicious actors do, providing you with detailed, actionable reports.
        </p>
        <button className="hero-cta-button" onClick={onRequestReview}>
          Request a Security Review
        </button>
      </div>
    </section>
  );
};

export default Hero;