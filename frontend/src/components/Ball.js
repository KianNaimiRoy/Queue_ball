import "./Ball.scss";

const Ball = function () {
  const clickBall = function () {
    console.log("Ball Clickin'");
  };

  return (
    <div className="queue-ball" onClick={clickBall}>
      <h1>QueueBall</h1>
    </div>
  );
};

export default Ball;
