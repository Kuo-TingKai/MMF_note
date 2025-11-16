import React from 'react';
import { useParchmentEffects } from '../hooks/useParchmentEffects';
import { useInkTrail } from '../hooks/useInkTrail';
import IlluminatedBackground from './IlluminatedBackground';

/**
 * 羊皮紙效果容器組件
 * 整合所有視覺效果
 */
function ParchmentEffects({ 
  enableInkTrail = true,
  enableBackground = true 
}) {
  useParchmentEffects();
  
  if (enableInkTrail) {
    useInkTrail();
  }

  return (
    <>
      {enableBackground && <IlluminatedBackground />}
    </>
  );
}

export default ParchmentEffects;

