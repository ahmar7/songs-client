import React, { useEffect, useState } from "react";
import "./AllCategories.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { baseUrl } from "../../utils/Constant";
const AllSongs = () => {
  const [Data, setData] = useState([]);
  const [user, setUser] = useState(true);
  let getData = async () => {
    try {
      let res = await fetch(`${baseUrl}allCategories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      let data = await res.json();

      if (res.status === 200) {
        var filter = data.filter((item) => {
          return item.selected === true;
        });
        setData(filter);
      }
    } catch (error) {
    } finally {
      setUser(false);
    }
  };
  var firstSongs = Data.reverse().slice(0, 60);

  useEffect(() => {
    getData();
  }, []);
  if (user) {
    return <div></div>;
  }
  return (
    <div className="containered hfeed site clearfix">
      <Header />
      <div id="site-content" className="site-content">
        <div id="featured-content-2" className="clearfix">
          <ul>
            {Data
              ? firstSongs.map((item, key) => {
                  if (item.selected) {
                    return (
                      <li className="hentry post" key={key}>
                        <h3>{item.selected}</h3>
                        <article
                          className="hentry"
                          itemScope="itemscope"
                          itemType=" "
                        >
                          <Link to={`/a/${item.movieLink}`} rel="bookmark">
                            <img
                              width={250}
                              height={250}
                              src={item.poster}
                              className="entry-thumb wp-post-image"
                              alt="Satthulu Unnaru Saithotla songs download"
                              decoding="async"
                              itemProp="image"
                            />
                          </Link>
                          <h2 itemProp="name" className="entry-title">
                            <Link
                              to={`/a/${item.movieLink}`}
                              itemProp="url"
                              rel="bookmark"
                            >
                              {item.movieName}
                            </Link>
                          </h2>
                        </article>
                      </li>
                    );
                  }
                })
              : "No songs found"}
          </ul>
        </div>

        <span className="clearfix" />
      </div>
      <Footer />
    </div>
  );
};

export default AllSongs;
