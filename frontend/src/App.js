import Navigation from "./components/Navigation";
import UsernamePrompt from "./components/UsernamePrompt";
import TableList from "./components/TableList";
import useAppData from "./components/hooks/useAppData";
import "./App.scss";

const App = function () {
  const { state } = useAppData();

  return (
    <main className="App">
      <div>
        <UsernamePrompt />
      </div>
      <Navigation />
      <TableList />
    </main>
  );
};

export default App;
