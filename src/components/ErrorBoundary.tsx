import React, { Component } from 'react';

interface Props {
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;
    if (hasError) {
      return fallback;
    }
    return children;
  }
}
