function LoadingWrapper({ showLoading, children }) {
  return showLoading ? <div className="loading-spinner"></div> : children;
}

export default LoadingWrapper;
