import "./TableListItem.scss";

const TableListItem = function (props) {
  return (
    <div className="table-list-item">
      <h1>Table {props.id}</h1>
      <p>{props.count}</p>
    </div>
  );
};

export default TableListItem;
