'use client';

import React from 'react';
import { useLanguage } from '../hooks/useLanguage';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryClass extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

function ErrorFallback({ error }: { error?: Error }) {
  const { texts } = useLanguage();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 shadow-2xl p-8 text-center">
        {/* Error Icon */}
        <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">⚠️</span>
        </div>
        
        {/* Error Message */}
        <h1 className="text-2xl font-bold text-white mb-4">
          Oops! Something went wrong
        </h1>
        
        <p className="text-gray-300 mb-6">
          We encountered an unexpected error. Please try refreshing the page.
        </p>
        
        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && error && (
          <details className="text-left mb-6">
            <summary className="text-red-400 cursor-pointer font-semibold mb-2">
              Error Details
            </summary>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-300 font-mono">
              {error.message}
            </div>
          </details>
        )}
        
        {/* Reload Button */}
        <button
          onClick={() => window.location.reload()}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 p-0.5 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
        >
          <div className="relative flex items-center justify-center gap-3 px-6 py-3 bg-slate-900 rounded-2xl transition-all duration-300 group-hover:bg-slate-800">
            <span className="text-white font-semibold">🔄 Reload Page</span>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        </button>
      </div>
    </div>
  );
}

export default function ErrorBoundary({ children }: Props) {
  return (
    <ErrorBoundaryClass>
      {children}
    </ErrorBoundaryClass>
  );
}
