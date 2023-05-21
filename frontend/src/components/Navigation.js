import "./Navigation.scss";
import Ball from "./Ball";

const Navigation = function () {
  const player = JSON.parse(localStorage.getItem("player-data"));

  return (
    <>
      <div className="navbar">{player && <Ball />}</div>
    </>
  );
};

export default Navigation;
