// Language switcher functionality

(function() {
  'use strict';

  // Language mapping
  const languageMap = {
    'zh': {
      'index': '/index.html',
      'mmf_sheet': '/mmf_sheet.html',
      'supplement_sheet': '/supplement_sheet.html'
    },
    'en': {
      'index': '/index_en.html',
      'mmf_sheet': '/mmf_sheet_en.html',
      'supplement_sheet': '/supplement_sheet_en.html'
    }
  };

  // Get current language from page
  function getCurrentLanguage() {
    const htmlLang = document.documentElement.lang;
    const pageLang = document.querySelector('[lang]')?.getAttribute('lang');
    const pathname = window.location.pathname;
    
    if (pathname.includes('_en.html') || pathname.includes('/en/')) {
      return 'en';
    }
    if (htmlLang && htmlLang.startsWith('en')) {
      return 'en';
    }
    if (pageLang && pageLang === 'en') {
      return 'en';
    }
    return 'zh';
  }

  // Get page type from URL
  function getPageType() {
    const pathname = window.location.pathname;
    if (pathname.includes('mmf_sheet')) {
      return 'mmf_sheet';
    }
    if (pathname.includes('supplement_sheet')) {
      return 'supplement_sheet';
    }
    return 'index';
  }

  // Switch language
  function switchLanguage(targetLang) {
    const currentLang = getCurrentLanguage();
    if (currentLang === targetLang) {
      return; // Already in target language
    }

    const pageType = getPageType();
    const targetUrl = languageMap[targetLang][pageType];
    
    if (targetUrl) {
      // Save language preference
      localStorage.setItem('preferredLanguage', targetLang);
      
      // Navigate to target URL
      window.location.href = targetUrl;
    }
  }

  // Create language switcher button
  function createLanguageSwitcher() {
    const currentLang = getCurrentLanguage();
    const targetLang = currentLang === 'zh' ? 'en' : 'zh';
    const buttonText = currentLang === 'zh' ? 'English' : '中文';
    
    const switcher = document.createElement('button');
    switcher.className = 'language-switcher';
    switcher.textContent = buttonText;
    switcher.setAttribute('aria-label', `Switch to ${targetLang === 'zh' ? 'Chinese' : 'English'}`);
    
    switcher.addEventListener('click', () => {
      switchLanguage(targetLang);
    });
    
    return switcher;
  }

  // Initialize language switcher
  function initLanguageSwitcher() {
    const siteNav = document.querySelector('.site-nav');
    if (siteNav) {
      const switcher = createLanguageSwitcher();
      siteNav.appendChild(switcher);
    }
  }

  // Apply language-specific styles
  function applyLanguageStyles() {
    const currentLang = getCurrentLanguage();
    const html = document.documentElement;
    
    if (currentLang === 'en') {
      html.classList.add('lang-en');
      html.setAttribute('lang', 'en');
    } else {
      html.classList.add('lang-zh');
      html.setAttribute('lang', 'zh-TW');
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initLanguageSwitcher();
      applyLanguageStyles();
    });
  } else {
    initLanguageSwitcher();
    applyLanguageStyles();
  }

  // Check for saved language preference on first visit
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && savedLang !== getCurrentLanguage()) {
    // Only redirect if we're on the index page
    const pageType = getPageType();
    if (pageType === 'index') {
      const targetUrl = languageMap[savedLang][pageType];
      if (targetUrl && !window.location.pathname.includes('_en')) {
        // Small delay to avoid flicker
        setTimeout(() => {
          window.location.href = targetUrl;
        }, 100);
      }
    }
  }

})();

