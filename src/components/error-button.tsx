import React from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

export class ErrorButton extends React.Component<object, ErrorButtonState> {
  state: ErrorButtonState = {
    hasError: false,
  };

  handleClick = (): void => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('Test application error');
    }

    return (
      <button className="error-button" type="button" onClick={this.handleClick}>
        Test error
      </button>
    );
  }
}
