import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import { useParams } from "react-router-dom";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-responsive-modal";
import { baseUrl } from "../../utils/Constant";
//

const AddSongs = () => {
  const { id } = useParams();
  let Navigate = useNavigate();
  const [isValidate, setisValidate] = useState(true);
  const [UserId, setUserId] = useState("");
  const [SongName, setSongName] = useState();
  const [singleMovie, setsingleMovie] = useState(true);
  const [isLoading, setisLoading] = useState(true);
  const [movieData, setmovieData] = useState([]);
  const [isDisable, setisDisable] = useState(false);
  const [choiceModel, setchoiceModel] = useState(false);

  let onCloseChoice = () => {
    setchoiceModel(false);
    setUserId("");
  };
  let delModal = (item) => {
    setSongName(item.name);
    setchoiceModel(true);
    setUserId(item._id);
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
    let value = e.target.value;
    inputdata[i] = { name: val[i].name, link: value };
    setVal(inputdata);
  };
  const handleChangeName = (e, i) => {
    const inputdata = [...val];
    let value = e.target.value;
    inputdata[i] = { name: value, link: val[i].link };
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
      if (res.status === 401 || res.status === 403) {
        Navigate("/");
        return;
      }
      if (res.status === 200) {
        return;
      }
    } catch (error) {
      Navigate("/");
    } finally {
    }
  };
  let getSingle = async () => {
    try {
      let res = await fetch(`${baseUrl}allCategories/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      // let data = JSON.parse(res);
      let data = await res.json();

      if (res.status === 200) {
        setmovieData(data.category.songs);
        setsingleMovie(data.category);
        return;
      }
    } catch (error) {
      return;
    } finally {
      setisLoading(false);
    }
  };
  let deleteSong = async () => {
    setisDisable(true);
    try {
      let res = await fetch(`${baseUrl}deleteCategory/${id}/${UserId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res || res.status === 500) {
        alert("There is something went wrong please try again later");
        return;
      }
      if (res.status === 200) {
        // alert(`${user.movieName} deleted successfully`);
        getSingle();
        getData();
        return;
      }
      if (res.status === 404) {
        alert("Song not found");
        return;
      }
      if (res.status === 401) {
        Navigate("/admin-login");
        return;
      }
    } catch (error) {
      alert("There is something went wrong please try again later");
    } finally {
      setchoiceModel(false);
      setisDisable(false);
    }
  };
  let addNewSong = async (e) => {
    try {
      setisDisable(true);
      e.preventDefault();

      if (isValidate) {
        alert("Please fill all the fileds");
        return false;
      }
      let songs = val;
      let res = await fetch(`${baseUrl}addSongs/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          songs,
        }),
      });
      if (res.status === 400 || !res) {
        alert("Please fill all the fields");
        return;
      } else if (res.status === 500 || !res) {
        alert("There is something went wrong, please try again later");
        return;
      } else if (res.status === 200) {
        alert("Category added successfully");
        Navigate("/show-all");
      } else {
        alert("Action not allowed");
      }
    } catch (e) {
      alert("something went wrong, please try again later");
    } finally {
      setisDisable(false);
    }
  };
  useEffect(() => {
    getData();
    getSingle();
  }, []);
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
                      <h2
                        className="text-dark mb-0"
                        style={{ fontWeight: "normal" }}
                      >
                        Old Songs
                      </h2>
                    </div>
                  </div>

                  {isLoading ? (
                    <ol className="songs-list">Loading...</ol>
                  ) : (
                    <ol className="songs-list">
                      {movieData.map((item, key) => (
                        <li key={key}>
                          <h3>
                            <span className="less-b">{key + 1}.</span>{" "}
                            {item.name}
                          </h3>
                          <button
                            onClick={() => delModal(item)}
                            className="btn btn-danger low-pd"
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
                <div className="card-body">
                  <form method="POST">
                    <h2 className="mt-4 mb-0">
                      Add new Songs for {singleMovie.movieName}
                    </h2>

                    <ul className=" no-pad flex-sng">
                      {val.map((data, i) => {
                        return (
                          <div className="nth-chl" key={i}>
                            <li>
                              <p> Add detail of song No: {i + 1} </p>
                              <div className="song-fields ">
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
                          </div>
                        );
                      })}
                    </ul>

                    <div className="flex justify-space">
                      <button
                        className="btn  btn-primary"
                        onClick={handleAdd}
                        type="button"
                      >
                        Add new song field
                      </button>
                      <button
                        className="save-data  btn btn-success"
                        type="submit"
                        disabled={isDisable}
                        onClick={addNewSong}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={choiceModel}
        classNames="new-course "
        onClose={onCloseChoice}
      >
        <div className="subject-modal choiceModal">
          <p>
            Are you sure you want to delete <b>{SongName}</b> song?
          </p>
          <div className="flex-row btns-modal">
            <button className="btn fix-btn btn-primary" onClick={onCloseChoice}>
              Cancel
            </button>
            <button
              disabled={isDisable}
              className="btn fix-btn btn-danger"
              onClick={deleteSong}
            >
              {isDisable ? (
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddSongs;
