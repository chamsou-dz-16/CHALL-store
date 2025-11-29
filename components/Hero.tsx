import React, { useEffect, useState } from 'react';
import { generateMarketingSlogan } from '../services/geminiService';

const Hero: React.FC = () => {
  const [slogan, setSlogan] = useState("L'élégance du style algérien");

  useEffect(() => {
    const fetchSlogan = async () => {
      const generated = await generateMarketingSlogan();
      setSlogan(generated);
    };
    fetchSlogan();
  }, []);

  return (
    <div className="relative bg-chall-orange overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-chall-orange sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Chall</span>{' '}
                <span className="block text-orange-100">{slogan}</span>
              </h1>
              <p className="mt-3 text-base text-white/90 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Découvrez notre nouvelle collection de vêtements et cosmétiques. L'alliance parfaite entre tradition et modernité pour Elle et Lui.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a href="#products" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-chall-orange bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                    Découvrir la collection
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
          src="https://picsum.photos/1200/800?random=12"
          alt="Fashion and style"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chall-orange to-transparent lg:via-chall-orange/20"></div>
      </div>
    </div>
  );
};

export default Hero;