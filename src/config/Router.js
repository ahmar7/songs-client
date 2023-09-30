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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/allCategories/:id" element={<SingleMovie />} />
        <Route path="/singleSong/:movie/:id" element={<SingleSong />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/show-all" element={<ShowAllMovies />} />
        <Route path="/add-movie" element={<NewMovieCategory />} />
        <Route path="/add-songs/:id" element={<AddSongs />} />
        <Route path="/update-password" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}
