import React, { Suspense } from 'react';
import Link from 'next/link';

function NotFoundContent() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>
      <h2 className="mb-4">Page Not Found</h2>
      <p className="lead mb-4">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      <Link href="/" className="btn btn-primary btn-lg">
        Go Back Home
      </Link>
    </div>
  );
}

export default function NotFound() {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading...</div>}>
      <NotFoundContent />
    </Suspense>
  );
} 