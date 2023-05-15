import Navigation from "./components/Navigation";
import UserPrompt from './Username_Prompt';
import TableList from "./components/TableList";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Navigation />
      <UserPrompt />
      <TableList />
    </div>
  );
}

export default App;
