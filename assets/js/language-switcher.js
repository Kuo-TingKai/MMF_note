// Language switcher functionality

(function() {
  'use strict';

  // Get baseurl from meta tag or default
  function getBaseUrl() {
    const baseTag = document.querySelector('base');
    if (baseTag && baseTag.href) {
      const url = new URL(baseTag.href);
      return url.pathname.replace(/\/$/, '');
    }
    // Try to detect from current pathname
    const pathname = window.location.pathname;
    // If pathname starts with /MMF_note, use it as baseurl
    if (pathname.startsWith('/MMF_note')) {
      return '/MMF_note';
    }
    return '';
  }

  // Language mapping - will be populated with baseurl
  function getLanguageMap() {
    const baseurl = getBaseUrl();
    return {
      'zh': {
        'index': baseurl + '/index.html',
        'mmf_sheet': baseurl + '/mmf_sheet.html',
        'supplement_sheet': baseurl + '/supplement_sheet.html'
      },
      'en': {
        'index': baseurl + '/index_en.html',
        'mmf_sheet': baseurl + '/mmf_sheet_en.html',
        'supplement_sheet': baseurl + '/supplement_sheet_en.html'
      }
    };
  }

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
    // Remove baseurl if present
    let cleanPath = pathname;
    const baseurl = getBaseUrl();
    if (baseurl && pathname.startsWith(baseurl)) {
      cleanPath = pathname.substring(baseurl.length);
    }
    
    // Normalize: remove leading/trailing slashes
    cleanPath = cleanPath.replace(/^\/|\/$/g, '');
    
    if (cleanPath.includes('mmf_sheet') || cleanPath === 'mmf_sheet.html') {
      return 'mmf_sheet';
    }
    if (cleanPath.includes('supplement_sheet') || cleanPath === 'supplement_sheet.html') {
      return 'supplement_sheet';
    }
    // Default to index for root, index.html, or empty path
    return 'index';
  }

  // Switch language
  function switchLanguage(targetLang) {
    const currentLang = getCurrentLanguage();
    if (currentLang === targetLang) {
      return; // Already in target language
    }

    const pageType = getPageType();
    const languageMap = getLanguageMap();
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
  // DISABLED: Auto-redirect can cause 404 errors if the target page doesn't exist yet
  // Users can manually switch language using the button
  // const savedLang = localStorage.getItem('preferredLanguage');
  // if (savedLang && savedLang !== getCurrentLanguage()) {
  //   // Only redirect if we're on the index page
  //   const pageType = getPageType();
  //   if (pageType === 'index') {
  //     const languageMap = getLanguageMap();
  //     const targetUrl = languageMap[savedLang][pageType];
  //     if (targetUrl && !window.location.pathname.includes('_en')) {
  //       // Small delay to avoid flicker
  //       setTimeout(() => {
  //         window.location.href = targetUrl;
  //       }, 100);
  //     }
  //   }
  // }

})();

