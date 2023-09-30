import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { addMovieApi } from "../../Api/service";
import { baseUrl } from "../../utils/Constant";

//

const NewMovie = () => {
  let Navigate = useNavigate();
  const [isValidate, setisValidate] = useState(true);
  const [test, settest] = useState(true);
  const [slide1, setSlide1] = useState();
  const [newSlider1, setNewSlider1] = useState([]);
  const [isDisable, setisDisable] = useState(false);
  const [user, setUser] = useState({
    movieName: "",
    castCrew: "",
    music: "",
    year: "",
    category: "",
    keywords: "",
  });
  let handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  let changeBanner1 = (e) => {
    setNewSlider1(e.target.files[0]);
    setSlide1(URL.createObjectURL(e.target.files[0]));
  };
  //
  const [val, setVal] = useState([{ name: "", link: "" }]);
  const handleAdd = (e) => {
    e.preventDefault();
    const abc = [...val, []];
    setVal(abc);
  };
  const handleChangeInput = (e, i) => {
    const inputdata = [...val];

    // let name = e.target.name;
    let value = e.target.value;
    inputdata[i] = { name: val[i].name, link: value };
    setVal(inputdata);
  };
  const handleChangeName = (e, i) => {
    const inputdata = [...val];

    // let name = e.target.name;
    let value = e.target.value;
    inputdata[i] = { name: value, link: val[i].link };

    //
    setVal(inputdata);
  };

  const handleDelete = (i) => {
    const deletVal = [...val];
    deletVal.splice(i, 1);
    setVal(deletVal);
  };

  //
  let getData = async () => {
    try {
      let res = await fetch(`${baseUrl}admin-categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      // let data = JSON.parse(res);
      let data = await res.json();
      if (!data) {
        Navigate("/");
      }
      if (res.status === 200) {
        settest(false);
      }
    } catch (error) {
      Navigate("/");
    } finally {
      settest(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  //
  const postDataForm = async (e) => {
    try {
      setisDisable(true);
      e.preventDefault();

      if (isValidate || newSlider1.length < 1) {
        alert("Please fill all the required fileds");
        return false;
      }
      let songs = val;
      const formData = new FormData();
      formData.append("poster", newSlider1);
      formData.append("movieName", user.movieName);

      formData.append("castCrew", user.castCrew);
      formData.append("music", user.music);
      formData.append("year", user.year);
      formData.append("category", user.category);
      formData.append("keywords", user.keywords);
      formData.append("songs", JSON.stringify(songs));

      const updateAbout = await addMovieApi(formData);
      if (updateAbout.success) {
        alert(updateAbout.msg);
        Navigate("/show-all");
      } else {
        alert(updateAbout.msg);
      }
    } catch (error) {
      alert(error?.data?.msg || error?.message || "Something went wrong");
    } finally {
      setisDisable(false);
    }
  };
  //

  useEffect(() => {
    for (let i = 0; i < val.length; i++) {
      setisValidate(false);
      const element = val[i];
      if (
        element.name === undefined ||
        element.name.length <= 0 ||
        element.link === undefined ||
        element.link.length <= 0
      ) {
        setisValidate(true);
      }
    }
  }, [handleChangeInput][handleChangeName]);
  //
  // if (test) {
  //   return <div></div>;
  // }
  return (
    <>
      <SideBar />
      <div className="main-content">
        <Header />

        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
        <div className="mt--7 container-fluid">
          <div className="row">
            <div className="mb-5 ">
              <div className="  shadow card">
                <div className="bg-transparent card-header">
                  <div className="align-items-center row">
                    <div className="col">
                      <h2 className="text-dark mb-0">Add new Movie Category</h2>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <form method="POST">
                    <div className="indiv-field upload-img">
                      <img className="logo-to-show" src={slide1} alt="" />
                      <label className="label" htmlFor="belowbanner1">
                        <i class="fa-solid fa-upload"></i> Upload Poster
                        <span>
                          <input
                            name="belowbanner1"
                            type="file"
                            accept="image/*"
                            id="belowbanner1"
                            required="true"
                            onChange={changeBanner1}
                          />
                        </span>
                      </label>
                    </div>
                    <div className="flex-items">
                      <div className="indiv-field">
                        <label htmlFor="username">Movie Name</label>
                        <input
                          name="movieName"
                          placeholder="Enter Movie Name"
                          type="text"
                          required="true"
                          onChange={handleInput}
                          value={user.movieName}
                        />
                      </div>
                      <div className="indiv-field">
                        <label htmlFor="username">Cast and Crew</label>
                        <input
                          name="castCrew"
                          placeholder="Enter Cast and Crew"
                          type="text"
                          required="true"
                          onChange={handleInput}
                          value={user.castCrew}
                        />
                      </div>
                      <div className="indiv-field">
                        <label htmlFor="username">Music</label>
                        <input
                          name="music"
                          placeholder="Enter Music by"
                          type="text"
                          required="true"
                          onChange={handleInput}
                          value={user.music}
                        />
                      </div>
                      <div className="indiv-field">
                        <label htmlFor="username">Movie Year</label>
                        <input
                          name="year"
                          placeholder="Enter Movie Year"
                          type="number"
                          required="true"
                          onChange={handleInput}
                          value={user.year}
                        />
                      </div>
                      <div className="indiv-field">
                        <label htmlFor="username">Category</label>
                        <input
                          name="category"
                          placeholder="Enter Movie Category"
                          type="text"
                          required="true"
                          onChange={handleInput}
                          value={user.category}
                        />
                      </div>
                      <div className="indiv-field">
                        <label htmlFor="username">Keywords</label>
                        <input
                          name="keywords"
                          placeholder="Enter keyword of movie"
                          type="text"
                          required="true"
                          onChange={handleInput}
                          value={user.keywords}
                        />
                      </div>
                    </div>
                    <h2 className="mt-4 mb-0">Add Songs for Movie </h2>

                    <ul className=" no-pad flex-sng">
                      {val.map((data, i) => {
                        return (
                          <>
                            <li key={i} className="nth-chl">
                              <p> Add detail of song No: {i + 1} </p>
                              <div className="song-fields">
                                <div className="field-dv">
                                  <input
                                    name="name"
                                    value={data.name}
                                    required="true"
                                    placeholder="Enter Song Name"
                                    onChange={(e) => handleChangeName(e, i)}
                                  />
                                </div>
                                <div className="field-dv flex-del">
                                  <input
                                    name="link"
                                    placeholder="Add Song Link"
                                    value={data.link}
                                    required="true"
                                    onChange={(e) => handleChangeInput(e, i)}
                                  />
                                  <button
                                    className="del-btn"
                                    type="button"
                                    onClick={() => handleDelete(i)}
                                  >
                                    x
                                  </button>
                                </div>
                              </div>
                            </li>
                          </>
                        );
                      })}
                    </ul>

                    <div className="flex justify-space">
                      <button
                        className="btn  btn-primary"
                        onClick={handleAdd}
                        type="button"
                        disabled={isDisable}
                      >
                        Add new song field
                      </button>
                      <button
                        disabled={isDisable}
                        className="btn fix-btn btn-success"
                        onClick={postDataForm}
                      >
                        {isDisable ? (
                          <div
                            className="spinner-border text-success"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewMovie;
