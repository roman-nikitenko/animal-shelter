import './App.css';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  // useEffect(() => {
  //   fetch('https://happy-paws-pqwx.onrender.com/api/pets/statistic/')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data.list_of_last_adopted_pets)
  //     })
  // }, [])

  return (
    <>
      <Navigation />
        <Outlet />
      <Footer />
    </>
  );
}

export default App;
