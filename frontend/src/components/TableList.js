import "./TableList.scss";
import TableListItem from "./TableListItem";

const TableList = function (props) {
  return (
    <div className="table-list">
      <TableListItem />
      <TableListItem />
      <TableListItem />
      <TableListItem />
    </div>
  );
};

export default TableList;
