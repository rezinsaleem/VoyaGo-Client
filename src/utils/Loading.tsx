import './Loading.css';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="loader-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading<span className="dot">.</span><span className="dot">.</span><span className="dot">.</span></p>
      </div>
    </div>
  );
};

export default Loading;
