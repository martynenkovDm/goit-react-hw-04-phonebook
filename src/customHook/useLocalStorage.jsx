import { useState, useEffect } from 'react';

export default function useLocaStorage(key, defaultValue) {
  const [storage, setStorage] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storage));
  }, [key, storage]);

  return [storage, setStorage];
}
