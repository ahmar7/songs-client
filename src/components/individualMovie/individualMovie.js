import React, { useState, useEffect } from "react";
import "./individualMovie.css";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { baseUrl } from "../../utils/Constant";
const SingleMovie = () => {
  const [Data, setData] = useState([]);
  const [AllSongs, setAllSongs] = useState([]);
  const [Songs, setSongs] = useState([]);
  const [user, setUser] = useState(false);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  let getData = async () => {
    setUser(true);
    try {
      let res = await fetch(`${baseUrl}allCategories/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      // let data = JSON.parse(res);
      let data = await res.json();

      if (res.status === 200) {
        setData(data.category);
        setSongs(data.category.songs);

        setUser(false);
      }
    } catch (error) {
      setUser(false);
    } finally {
      setLoading(false);
    }
  };
  let getAllCategory = async () => {
    setUser(true);
    try {
      let res = await fetch(`${baseUrl}allCategories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      // let data = JSON.parse(res);
      let data = await res.json();

      if (res.status === 200) {
        setAllSongs(data);
      }
    } catch (error) {
      setUser(false);
    }
  };
  useEffect(() => {
    getData();
    getAllCategory();
  }, []);
  if (loading) {
    return <div></div>;
  }
  if (!Data) {
    return <div>Song not found</div>;
  }
  return (
    <div className="containered hfeed site clearfix">
      <Header />
      <div id="site-content" className="site-content">
        <main id="main" className="site-main clearfix">
          <p id="breadcrumbs">
            <span>
              <span>
                <Link to="/">Home</Link> »
                <span className="breadcrumb_last" aria-current="page">
                  {Data.movieName}
                </span>
              </span>
            </span>
          </p>
          <div id="primary" className="content-area">
            <div id="content" className="single">
              <article
                className="post-64537 post type-post status-publish format-standard has-post-thumbnail hentry category-telugu-new-songs tag-8899 tag-guru tag-ishwarya tag-k tag-k-m-radhakrishnan tag-krishna-manjusha tag-telugu tag-telugu-songs tag-telugu-songs-download tag-top entry"
                itemScope="itemscope"
                itemProp="blogPost"
              >
                <span className="h-entry">
                  <div className="entry-content" itemProp="articleBody">
                    <div className="entry-title">
                      <h1 itemProp="headline">{Data.movieName} Songs </h1>
                    </div>
                    <div itemScope itemType="https://schema.org/MusicAlbum">
                      <div className="naa-songs-f-image">
                        <img
                          className="async Image entry-thumbnail"
                          alt="movie poster"
                          src={Data.poster.url}
                          itemProp="image"
                        />
                        <div className="description">
                          <h2>{Data.movieName} naa songs download </h2>
                        </div>
                      </div>
                    </div>
                    <p>
                      Movie Name :{" "}
                      <b>
                        {Data.movieName} - {Data.year}
                      </b>
                      <br />
                      Cast &amp; Crew : {Data.castCrew}
                      <br />
                      Music : {Data.music}
                      <br />
                      Category : <b>{Data.category}</b>
                    </p>
                    <p>
                      <strong>
                        <em> {Data.movieName} songs free download | </em>
                      </strong>
                      <em>
                        {Data.movieName} {Data.category} Movie songs free
                        download |{" "}
                      </em>
                      <em>
                        {Data.category} {Data.movieName} MP3 songs download
                      </em>
                      <strong>
                        <em>
                          <br />
                        </em>
                      </strong>
                    </p>
                    <ol>
                      {Songs.map((item, key) => (
                        <li key={key}>
                          <Link
                            target="_blank"
                            to={`/singleSong/${Data._id}/${item._id}`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ol>
                    <p>
                      <strong>Description: </strong>
                      {Data.movieName} – {Data.year} {Data.category}
                      Movie Songs Free Download |
                      <b>
                        <strong> {Data.movieName} Film mp3 </strong>Songs
                        Download |{" "}
                      </b>
                      <b> {Data.movieName} Ringtone Songs Free Download</b>
                    </p>
                    <blockquote>
                      <p>All Songs Download (.ZIP)</p>
                    </blockquote>
                    <h2>
                      <b> {Data.movieName} Songs Free download</b> Keywords:
                    </h2>
                    <ul>
                      <li>
                        {Data.movieName} {Data.year} Movie songs download
                      </li>
                      <li>{Data.year} Naa Songs latest movie 2023 songs</li>
                      <li>free mp3 songs download of {Data.movieName}</li>
                      <li>{Data.movieName} song download</li>
                      <li>{Data.movieName} mp3 sensongs high quality</li>
                      <li>
                        ringtones of movie {Data.movieName} whatsapp status
                      </li>
                      <li>{Data.year} songs Free download mp3 sensongs</li>
                    </ul>
                  </div>
                </span>
                <div className="related-posts">
                  <h3>Related Music Albums</h3>
                  <ul className="clearfix">
                    {AllSongs.map((item, key) => (
                      <div key={key} className="related-content">
                        <li>
                          <a href={"/allCategories/" + item._id}>
                            {item.movieName}
                          </a>
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </article>
              <div className="clearfix" />
            </div>
            <div className="div-comments-support">
              Konchem Hatke download FREE !!! <br />
              Need any help?
              <div className="clearfix" />
              <a
                className="support-button"
                href=" e"
                target="_blank"
                rel="noopener"
              >
                Contact
              </a>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default SingleMovie;
