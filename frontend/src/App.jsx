import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Books from './components/ShowBooks'
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [x, setX] = useState([]);

  useEffect(() => {
    axios
      .get("api/read")
      .then((res) => {
        setX(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Books books={x} />
    </>
  );
}

export default App;
