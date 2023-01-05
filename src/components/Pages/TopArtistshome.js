import React, { useRef } from 'react';
import './TopArtistshome.css';

function HorizontalScroller({ children }) {
    const scrollerRef = useRef(null);
  
    const handleMouseDown = (event) => {
    
      if (event.target === scrollerRef.current) {
        const startX = event.clientX;
        let currentScrollLeft = scrollerRef.current.scrollLeft;
  
        const handleMouseMove = (event) => {
          const distance = event.clientX - startX;
          scrollerRef.current.scrollLeft = currentScrollLeft - distance;
        };
        function HorizontalScroller({ children }) {
            const scrollerRef = useRef(null);
          
            const handleMouseDown = (event) => {
             
              if (event.target === scrollerRef.current) {
                const startX = event.clientX;
                let currentScrollLeft = scrollerRef.current.scrollLeft;
          
                const handleMouseMove = (event) => {
                  const distance = event.clientX - startX;
                  scrollerRef.current.scrollLeft = currentScrollLeft - distance;
                };
          
                const handleMouseUp = () => {
                  document.removeEventListener('mousemove', handleMouseMove);
                  document.removeEventListener('mouseup', handleMouseUp);
                };
          
                document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp);
              }
            };
          
            return (
              <div className="scroller" ref={scrollerRef} onMouseDown={handleMouseDown}>
                {children}
              </div>
            );
          }
    return (
      <div className="scroller" ref={scrollerRef} onMouseDown={handleMouseDown}>
        {children}
      </div>
    );
  }
}}
  export default HorizontalScroller;


