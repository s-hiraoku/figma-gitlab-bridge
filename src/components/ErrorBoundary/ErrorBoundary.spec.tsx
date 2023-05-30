import React from 'react';
import { render } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';

test('Enjoy Testing!', () => {
  render(<ErrorBoundary />);
});
