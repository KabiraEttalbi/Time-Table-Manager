'use client'; 

// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

// const Homepage = () => {
//   const router = useRouter();

//   useEffect(() => {
//     router.push('/sign-in');
//   }, [router]);
// };

// export default Homepage;

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch data from the NestJS backend
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hello`)
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Next.js Frontend</h1>
      <p>Message from NestJS backend: {message}</p>
    </div>
  );
}