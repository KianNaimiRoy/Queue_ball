import "./TableListItem.scss";
import classNames from "classnames";

const TableListItem = function (props) {
  const listClass = classNames("table-list__item", {
    "table-list__unavailable": !props.status
  });

  return (
    <div className={listClass} onClick={props.onSelect}>
      <h1>Table {props.id}</h1>
      <p>{!props.status ? "Unavailable" : props.count}</p>
    </div>
  );
};

export default TableListItem;
