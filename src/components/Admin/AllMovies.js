import React, { useState, useEffect } from "react";
import "./DashBoard.css";
import Header from "../../Layout/Header";
import SideBar from "../../Layout/Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import imgForm from "../../assets/banner-example.jpg";
import "./NewMovie.css";
import { baseUrl } from "../../utils/Constant";
import { isSelectedApi } from "../../Api/service";
import { toast } from "react-toastify";
//

const AllMovies = () => {
  let Navigate = useNavigate();
  const [Data, setData] = useState([]);
  const [selected, setSelected] = useState();
  const [allPosts, setAllPosts] = useState();
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState("");
  const [isDisable, setisDisable] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [choiceModel, setchoiceModel] = useState(false);

  let onCloseChoice = () => {
    setchoiceModel(false);
    setUserId("");
  };
  let delModal = (item) => {
    setUser(item);
    setchoiceModel(true);
    setUserId(item._id);
  };
  let getData = async () => {
    setisLoading(true);
    try {
      let res = await fetch(`${baseUrl}admin-categories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      let data = await res.json();

      if (!data) {
        setData("No post found");
        return;
      } else if (res.status === 401 || res.status === 403) {
        Navigate("/admin-login");
      }

      if (res.status === 200) {
        var filter = data.filter((item) => {
          return item.selected === true;
        });
        setSelected(filter.length);
        setAllPosts(data.length);
        data.reverse();
        setData(data);
        return;
      }
    } catch (error) {
      alert("Something went wrong, please refresh the page");
      window.location.reload();
    } finally {
      setisLoading(false);
    }
  };
  let deleteCategory = async () => {
    setisDisable(true);
    try {
      let res = await fetch(`${baseUrl}deleteCategory/${userId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res || res.status === 500) {
        toast.error("There is something went wrong please try again later");
        return;
      }
      if (res.status === 200) {
        toast.info(`${user.movieName}  deleted successfully`);
        getData();
        return;
      }
      if (res.status === 404) {
        toast.error("Movie not found");
        return;
      }
      if (res.status === 401) {
        Navigate("/admin-login");
        return;
      }
    } catch (error) {
      // setUser(false);
      toast.error("There is something went wrong please try again later");
    } finally {
      setchoiceModel(false);
      setisDisable(false);
    }
  };
  let valueChange = async (e, item) => {
    e.preventDefault();
    e.target.disabled = true;
    if (e.target.checked) {
      try {
        let body = { isSelected: true };
        const updateHeader = await isSelectedApi(body, item._id);

        if (updateHeader.success) {
          var filter = updateHeader.newCategory.filter((item) => {
            return item.selected === true;
          });
          setSelected(filter.length);
          e.target.checked = true;
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setisDisable(false);
        e.target.disabled = false;
      }
    } else {
      try {
        let body = { isSelected: false };
        const updateHeader = await isSelectedApi(body, item._id);
        if (updateHeader.success) {
          e.target.checked = false;
          var filter = updateHeader.newCategory.filter((item) => {
            return item.selected === true;
          });
          setSelected(filter.length);
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setisDisable(false);
        e.target.disabled = false;
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <SideBar />
      <div className="main-content">
        <Header />

        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8"></div>
        <div className="mt--7 container-fluid">
          <div className="row">
            <div className="mb-5 ">
              {isLoading ? (
                <div className="  shadow card">
                  <div className="bg-transparent card-header">
                    <div className="align-items-center row">
                      <div className="col">
                        <h2 className="text-dark mb-0">All Posts</h2>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="text-dark mb-0">Loading...</p>
                  </div>
                </div>
              ) : (
                <div className="  shadow card">
                  <div className="bg-transparent card-header">
                    <div className="align-items-center row">
                      <div className="col">
                        <div className="post-info">
                          <h5>All Posts: {allPosts}</h5>
                          <h5>Selected Posts: {selected}</h5>
                          <p>
                            <i class="fa-solid fa-circle-info"></i> Only first
                            60 selected posts will be shown to clients
                          </p>
                        </div>
                        {/* <h2 className="text-dark mb-0">All Movies</h2> */}
                      </div>
                    </div>
                  </div>

                  <div className="card-body">
                    <>
                      {/* <div className="post-info">
                        <h5>All Posts: {allPosts}</h5>
                        <h5>Selected Posts: {selected}</h5>
                        <p>
                          <i class="fa-solid fa-circle-info"></i> Only first 60
                          selected posts will be shown to clients
                        </p>
                      </div> */}
                      <br />
                      <div className="chart-d">
                        {Data.map((item, key) => (
                          <div key={key} className="movies-data">
                            <img src={item.poster} alt="" />
                            <div className="flex-title">
                              <p> {item.movieName}</p>
                              <div className="flexmr">
                                <button
                                  className="btn btn-danger low-pd"
                                  onClick={() => delModal(item)}
                                >
                                  Delete
                                </button>
                                <Link
                                  to={`/add-songs/${item._id}`}
                                  className="btn btn-info low-pd"
                                >
                                  Update Songs
                                </Link>
                                <label class="switchBtn">
                                  <input
                                    defaultChecked={item.selected}
                                    type="checkbox"
                                    onClick={(e) => valueChange(e, item)}
                                  />
                                  <span className="slider round"></span>
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  </div>
                </div>
              )}
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
            Are you sure you want to delete <b>{user.movieName}</b> movie?
          </p>
          <div className="flex-row btns-modal">
            <button className="btn fix-btn btn-primary" onClick={onCloseChoice}>
              Cancel
            </button>
            <button
              disabled={isDisable}
              className="btn fix-btn btn-danger"
              onClick={deleteCategory}
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

export default AllMovies;
