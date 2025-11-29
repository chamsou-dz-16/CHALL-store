import React, { useEffect, useState } from 'react';
import { generateMarketingSlogan } from '../services/geminiService';
import { useStore } from '../context/StoreContext';

const Hero: React.FC = () => {
  const { t, language } = useStore();
  const [slogan, setSlogan] = useState(t('hero.title_suffix'));

  useEffect(() => {
    // Only fetch slogan if not Arabic/Fixed or if we want dynamic slogans in all langs
    // For stability and language consistency, let's use the static translation by default
    // or request language specific slogans. For now, let's stick to the translation
    // to ensure it matches the selected language perfectly without API delay/error.
    setSlogan(t('hero.title_suffix'));
  }, [language, t]);

  return (
    <div className="relative bg-chall-orange overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-chall-orange sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left rtl:lg:text-right">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Chall</span>{' '}
                <span className="block text-orange-100">{slogan}</span>
              </h1>
              <p className="mt-3 text-base text-white/90 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {t('hero.subtitle')}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start rtl:lg:justify-end">
                <div className="rounded-md shadow">
                  <a href="#products" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-chall-orange bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                    {t('hero.cta')}
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 rtl:lg:left-0 rtl:lg:right-auto lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full opacity-90"
          src="https://picsum.photos/1200/800?random=12"
          alt="Fashion and style"
        />
        <div className="absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l from-chall-orange to-transparent lg:via-chall-orange/20"></div>
      </div>
    </div>
  );
};

export default Hero;