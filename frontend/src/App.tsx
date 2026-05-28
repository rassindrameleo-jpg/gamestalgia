import { useEffect } from "react";
import { api } from "./api/api";

function App() {
  useEffect(() => {
    api.get("/health").then(res => {
      console.log(res.data);
    });
  }, []);

  return (
    <div>
      <h1>GameStalgia</h1>
    </div>
  );
}

export default App;