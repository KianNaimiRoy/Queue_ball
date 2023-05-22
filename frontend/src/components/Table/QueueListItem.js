import "./QueueListItem.scss";

const QueueListItem = function (props) {
  return (
    <div className={`queue-list-item ${props.className}`}>
      <h4>{props.name}</h4>
    </div>
  );
};

export default QueueListItem;
