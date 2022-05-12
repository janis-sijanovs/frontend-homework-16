import './App.scss';
import {
  BrowserRouter as Router, Routes, NavLink, Route, Navigate,
} from 'react-router-dom';
import HomePage from './Pages/Home/HomePage';
import Page404 from './Pages/Page404/Page404';
import CharactersPage from './Pages/Characters/CharactersPage';
import CharacterPage from './Pages/Character/CharacterPage';
import EpisodesPage from './Pages/Episodes/EpisodesPage';
import EpisodePage from './Pages/Episode/EpisodePage';
import LocationsPage from './Pages/Loactions/LocationsPage';
import LocationPage from './Pages/Location/LocationPage';

const App = () => (
  <Router>
    <header>
      <nav className="navigation">
        <NavLink className="link" to="/">Home</NavLink>
        <NavLink className="link" to="/characters">Characters</NavLink>
        <NavLink className="link" to="/episodes">Episodes</NavLink>
        <NavLink className="link" to="/locations">Loactions</NavLink>
      </nav>
    </header>

    <div className="content">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:search" element={<CharactersPage />} />
        <Route path="/character/:id" element={<CharacterPage />} />
        <Route path="/episodes" element={<EpisodesPage />} />
        <Route path="/episodes/:search" element={<EpisodesPage />} />
        <Route path="/episode/:id" element={<EpisodePage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/location/:id" element={<LocationPage />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  </Router>
);

export default App;
