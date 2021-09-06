import React, { useEffect } from 'react';

export default function usePortal(id: string) {
    const rootElemRef = React.useRef(document.createElement('div'));
  
    useEffect(function setupElement() {
        const parentElem = document.querySelector(`#${id}`);
        parentElem?.appendChild(rootElemRef.current);

        return function removeElement() {
            rootElemRef.current.remove();
        };
    }, [id]);
  
    return rootElemRef.current;
};
