import "./Ball.scss";

const Ball = function () {
  const clickBall = function () {
    console.log("Ball Clickin'");
  };

  return (
<<<<<<< HEAD
    <div id="queue-ball" onClick={clickBall}>
=======
    <div className="queue-ball border-within-logo" onClick={clickBall}>
>>>>>>> master
      <h1>
        <span className="neonText-queue">Queue</span>
        <span className="neonText-ball">Ball</span>
      </h1>
    </div>
  );
};

export default Ball;
