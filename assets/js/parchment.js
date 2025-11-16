// 中世紀手寫書羊皮紙效果增強腳本

(function() {
  'use strict';

  // 頁面加載動畫
  document.addEventListener('DOMContentLoaded', function() {
    // 淡入效果
    const content = document.querySelector('.site-content');
    if (content) {
      content.style.opacity = '0';
      content.style.transform = 'translateY(20px)';
      setTimeout(() => {
        content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        content.style.opacity = '1';
        content.style.transform = 'translateY(0)';
      }, 100);
    }

    // 為表格行添加交互動畫
    const tableRows = document.querySelectorAll('tbody tr');
    tableRows.forEach((row, index) => {
      row.style.opacity = '0';
      row.style.transform = 'translateX(-10px)';
      setTimeout(() => {
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        row.style.opacity = '1';
        row.style.transform = 'translateX(0)';
      }, 200 + index * 50);
    });

    // 為卡片添加淡入效果
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
      }, 300 + index * 100);
    });
  });

  // 滾動視差效果
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const siteContent = document.querySelector('.site-content');
    
    if (siteContent) {
      // 微妙的視差效果
      const parallax = scrollTop * 0.1;
      siteContent.style.transform = `perspective(2000px) rotateX(${0.5 - parallax * 0.001}deg) translateY(${parallax * 0.05}px)`;
    }

    lastScrollTop = scrollTop;
  }, { passive: true });

  // 為連結添加手寫效果
  const links = document.querySelectorAll('a:not(.btn):not(.site-nav a)');
  links.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.textDecorationThickness = '3px';
    });
    
    link.addEventListener('mouseleave', function() {
      this.style.textDecorationThickness = '2px';
    });
  });

  // 為標題添加手寫動畫效果
  const headings = document.querySelectorAll('h1, h2, h3');
  headings.forEach(heading => {
    heading.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s ease';
      this.style.transform = 'scale(1.02)';
      this.style.textShadow = '4px 4px 8px rgba(139, 111, 71, 0.5), 2px 2px 4px rgba(0, 0, 0, 0.3)';
    });
    
    heading.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.textShadow = '';
    });
  });

  // 添加紙張翻頁效果（可選）
  const addPageTurnEffect = function() {
    const content = document.querySelector('.site-content');
    if (!content) return;

    let isHovering = false;
    
    content.addEventListener('mouseenter', function() {
      if (!isHovering) {
        isHovering = true;
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        this.style.transform = 'perspective(2000px) rotateX(0.8deg) translateZ(10px)';
        this.style.boxShadow = '0 0 40px rgba(44, 24, 16, 0.5), inset 0 0 50px rgba(139, 111, 71, 0.15)';
      }
    });
    
    content.addEventListener('mouseleave', function() {
      if (isHovering) {
        isHovering = false;
        this.style.transform = 'perspective(2000px) rotateX(0.5deg)';
        this.style.boxShadow = '';
      }
    });
  };

  // 初始化頁面翻轉效果
  addPageTurnEffect();

  // 為數學公式添加淡入效果
  const mathElements = document.querySelectorAll('.MathJax');
  if (mathElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '0';
          entry.target.style.transition = 'opacity 0.8s ease';
          setTimeout(() => {
            entry.target.style.opacity = '1';
          }, 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    mathElements.forEach(el => observer.observe(el));
  }

  // 添加鍵盤快捷鍵支持
  document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + K 聚焦搜索（如果有的話）
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      // 可以添加搜索功能
    }
  });

  // 優化滾動性能
  let ticking = false;
  const optimizeScroll = function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        // 滾動相關的優化操作
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', optimizeScroll, { passive: true });

  // 添加觸摸設備支持
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 為觸摸設備優化交互
    const touchElements = document.querySelectorAll('.card, .btn, .site-nav a');
    touchElements.forEach(el => {
      el.addEventListener('touchstart', function() {
        this.style.transition = 'transform 0.2s ease';
        this.style.transform = 'scale(0.98)';
      });
      
      el.addEventListener('touchend', function() {
        this.style.transform = 'scale(1)';
      });
    });
  }

  // 添加打印優化
  window.addEventListener('beforeprint', function() {
    document.body.style.filter = 'none';
    const content = document.querySelector('.site-content');
    if (content) {
      content.style.transform = 'none';
      content.style.boxShadow = 'none';
    }
  });

  // 性能監控（開發環境）
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addEventListener('load', function() {
      if (window.performance && window.performance.timing) {
        const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        console.log('頁面加載時間:', loadTime + 'ms');
      }
    });
  }

})();

