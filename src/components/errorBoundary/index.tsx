import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: JSX.Element;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
  };

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true });
    console.log(`Error - ${error}, Info - ${info}`);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
