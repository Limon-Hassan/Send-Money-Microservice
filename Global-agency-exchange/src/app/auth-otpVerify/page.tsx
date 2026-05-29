import React, { Suspense } from 'react';
import ClientProvider from './ClientProvider';

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientProvider />;
    </Suspense>
  );
};

export default page;
