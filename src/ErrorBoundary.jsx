import React, { Component } from 'react';

class CustomErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error here
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a custom error message here
      return (
        <div style={styles.errorContainer}>
          <div style={styles.imageContainer}>
            <img src="/404-image.png" alt="Error Illustration" style={styles.errorImage} />
          </div>
          <h1 style={styles.errorHeading}>Oops!</h1>
          <p style={styles.errorText}>Something went wrong. Please try again later.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  errorContainer: {
    textAlign: 'center',
    marginTop: '20vh',
    display: 'grid',
    alignContent: 'center',
  },
  imageContainer: {
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
  },
  errorImage: {
    width: '40vw',
    // height: "auto",
    marginBottom: '2em',
  },
  errorHeading: {
    fontSize: '2em',
    color: '#FF6347', // Tomato color
    marginBottom: '1em',
  },
  errorText: {
    fontSize: '1.2em',
    color: '#666',
  },
};

export default CustomErrorBoundary;
