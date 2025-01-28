'use client'; 

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/sign-in');
  }, [router]);
};

export default Homepage;
