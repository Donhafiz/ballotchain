"use client";

import { Component, ReactNode } from "react";
import { RefreshCw, AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="text-center max-w-[440px]">
            <div className="w-16 h-16 rounded-2xl bg-[rgba(239,68,68,0.06)] border border-[rgba(239,68,68,0.1)] flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-8 h-8 text-[#EF4444]" />
            </div>
            <h2 className="text-[20px] font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-[14px] text-[rgba(255,255,255,0.4)] mb-6">
              {this.state.error?.message || "An unexpected error occurred. Please try again."}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="px-5 py-[11px] rounded-xl bg-gradient-to-r from-[#4fffb0] to-[#00d4ff] text-[#0b0c0f] text-[13px] font-bold hover:opacity-90 transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
