import { useEffect } from 'react';

/**
 * 羊皮紙效果增強 Hook
 * 包含頁面加載動畫、滾動視差效果等
 */
export function useParchmentEffects() {
  useEffect(() => {
    // 頁面加載動畫
    const handlePageLoad = () => {
      const content = document.querySelector('.site-content');
      if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        content.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
          });
        });
      }
    };

    // 滾動視差效果
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const content = document.querySelector('.site-content');
      
      if (content) {
        const parallax = scrolled * 0.1;
        content.style.transform = `translateY(${parallax}px)`;
      }
    };

    // 響應式處理
    const handleResize = () => {
      const content = document.querySelector('.site-content');
      if (content) {
        content.style.transform = 'none';
      }
    };

    // 移動設備優化
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      const content = document.querySelector('.site-content');
      if (content) {
        content.style.transform = 'none';
        content.style.filter = 'none';
      }
    }

    // 初始化
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', handlePageLoad);
    } else {
      handlePageLoad();
    }

    // 添加滾動監聽（僅桌面）
    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
}

