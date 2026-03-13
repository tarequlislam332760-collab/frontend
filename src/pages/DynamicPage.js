import React from 'react';
import { useParams } from 'react-router-dom';

const DynamicPage = ({ lang }) => {
  const { slug } = useParams();

  return (
    <div className="pt-32 text-center min-h-screen">
      <h1 className="text-3xl font-bold capitalize">{slug.replace('-', ' ')}</h1>
      <p className="mt-4 text-slate-500">
        {lang === 'bn' ? 'এই পেজটির কন্টেন্ট শীঘ্রই আসছে...' : 'Content for this page is coming soon...'}
      </p>
    </div>
  );
};

export default DynamicPage;