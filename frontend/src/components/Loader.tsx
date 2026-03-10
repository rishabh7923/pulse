import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="cup">
          <div className="cup-handle" />
          <div className="smoke one" />
          <div className="smoke two" />
          <div className="smoke three" />
        </div>
        <div className="load">..........................</div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
    width: 100px;
    height: 80px;
    position: relative;
    display: flex;
    justify-items: center;
    align-items: center;
  }
  .loader .cup {
    position: absolute;
    width: 25px;
    height: 18px;
    background-color: #fff;
    border: 1px solid #2e2e2e;
    z-index: 1;
    border-radius: 2px 2px 10px 10px;
    animation: expansion 6s infinite ease-in-out;
    transform-origin: center;
  }

  .cup::after {
    content: "";
    position: absolute;
    top: -2px;
    width: calc(100% - 2px);
    height: 2px;
    background: #fed59fca;
    border: 1px solid #2e2e2ebe;
    border-radius: 50%;
  }
  .cup::before {
    content: "";
    position: absolute;
    top: 15px;
    width: calc(100% - 2px);
    height: 4px;
    background: #ffffff00;
    border: 1px solid #2e2e2e;
    border-top: none;
    border-radius: 50%;
    z-index: -1;
  }

  .loader .cup .cup-handle {
    position: absolute;
    width: 5px;
    height: 10px;
    background-color: #fff;
    border: 1px solid #2e2e2e;
    right: -5px;
    top: 2px;
    border-radius: 2px 10px 20px 2px;
  }

  .loader .cup .smoke {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 15px;
    height: 25px;
    background: rgba(107, 102, 102, 0.433);
    border-radius: 50%;
    transform: translateX(-50%);
    animation: rise 6s infinite ease-in-out;
    filter: blur(8px);
  }

  .loader .cup .smoke.one {
    animation-delay: 0s;
  }
  .loader .cup .smoke.two {
    animation-delay: 1s;
  }
  .loader .cup .smoke.three {
    animation-delay: 2s;
  }

  .loader .load {
    position: absolute;
    font-size: 10px;
    opacity: 0.7;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
  }

  @keyframes expansion {
    0% {
      width: 25px;
      transform: translateX(0);
    }
    40% {
      width: 100%;
      transform: translateX(0);
    }
    80% {
      width: 25px;
      transform: translateX(64px);
    }
    90% {
      width: 100%;
      transform: translateX(0);
    }
    100% {
      width: 25px;
      transform: translateX(0);
    }
  }

  @keyframes rise {
    0% {
      transform: translate(-50%, 0) scale(0.4);
      opacity: 0;
    }
    30% {
      opacity: 0.7;
    }
    60% {
      opacity: 0.4;
    }
    100% {
      transform: translate(-50%, -120px) scale(1);
      opacity: 0;
    }
  }`;

export default Loader;
