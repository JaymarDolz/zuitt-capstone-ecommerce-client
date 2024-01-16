import React from 'react';
import '../styles/Error.css';

export default function ErrorComponent() {
  return (
    <div className="error-wrapper tab-size">
      <h1 className="main-heading">Whoops!</h1>
      <p className="secondary-heading">404 Page Not Found</p>
      <img style={{ display: 'block', margin: '0 auto' }} src="https://media1.tenor.com/m/PhMxH_veS_UAAAAC/beach-day-party.gif" alt="Confused Cat" />
      <p className="tertiary-heading">Looks like this page went on vacation.</p>
      <p className="body">
        Try our
        <a className="link" href="/">
          Home
        </a>
        or
        <a className="link" href="/shop">
          Shop
        </a>
        instead.
      </p>
    </div>
  );
};