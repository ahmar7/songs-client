import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import SingleMovie from "../pages/singleMovie";
import SingleSong from "../pages/singleSong";
import Login from "../pages/Login";
import ShowAllMovies from "../pages/ShowAllMovies";
import NewMovieCategory from "../pages/newMovieCategory";
import AddSongs from "../components/Admin/addSongs";
import UpdatePassword from "../components/Admin/updatePassword";
import Protected from "../components/Protected";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/allCategories/:id" element={<SingleMovie />} />
        <Route path="/singleSong/:movie/:id" element={<SingleSong />} />
        <Route path="/admin-login" element={<Login />} />
        <Route
          path="/show-all"
          element={<Protected Component={ShowAllMovies} />}
        />
        <Route
          path="/add-movie"
          element={<Protected Component={NewMovieCategory} />}
        />
        <Route
          path="/add-songs/:id"
          element={<Protected Component={AddSongs} />}
        />
        <Route
          path="/update-password"
          element={<Protected Component={UpdatePassword} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
