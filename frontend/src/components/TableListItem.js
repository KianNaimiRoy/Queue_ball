import "./TableListItem.scss";

const TableListItem = function (props) {
  return (
    <div className="table-list-item">
      <h1>{props.name}</h1>
      <p>{props.id}</p>
    </div>
  );
};

export default TableListItem;
