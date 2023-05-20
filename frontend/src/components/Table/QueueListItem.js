import "./QueueListItem.scss";

const QueueListItem = function (props) {
  console.log("PROPS:::", props)
  return (
    <div className={`queue-list-item ${props.className}`}>
      <h1>{props.name}</h1>
    </div>
  );
};

export default QueueListItem;
