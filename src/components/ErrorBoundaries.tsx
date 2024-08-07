import React from 'react';
import { useRouteError } from 'react-router-dom';

export function RootErrorBoundary() {
  const error = useRouteError() as Error;
  return (
    <div>
      <h1>Uh oh, something went terribly wrong</h1>
      <pre>{error.message || JSON.stringify(error)}</pre>
      <button
        type="button"
        onClick={() => {
          window.location.href = '/';
        }}
      >
        Click here to reload the app
      </button>
    </div>
  );
}

export function PageErrorBoundary() {
  const error = useRouteError();
  return (
    <div>
      <h1>Error loading the page</h1>
      <pre>{JSON.stringify(error)}</pre>
    </div>
  );
}

export function Fallback() {
  return <p>Performing initial data load</p>;
}
