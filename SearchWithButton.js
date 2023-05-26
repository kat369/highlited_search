import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function SearchWithButton() {
  const [query, setquery] = useState("");
  const [data, setdata] = useState([]);
  const [valid, setvalid] = useState("");

  useEffect(() => {
    loadData();
  }, [query]);

  let loadData = async () => {
    try {
      let searchdata = await axios.get(
        `http://localhost:5000/search?key=${query}`
      );
      setdata(searchdata.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  let handlesubmit = async (e) => {
    e.preventDefault();
    try {
      let searchdata = await axios.get(
        `http://localhost:5000/search?key=${query}`
      );
      setdata(searchdata.data.data);
      setvalid(searchdata.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  function getHighlightedText(text, higlight) {
    var parts = text.split(new RegExp(`(${higlight})`, "gi"));
    return parts.map((part, index) => (
      <span key={index}>
        {part.toLowerCase() === higlight.toLowerCase() ? (
          <b style={{ backgroundColor: "#e8bb49" }}>{part}</b>
        ) : (
          part
        )}
      </span>
    ));
  }

  return (
    <div className="App">
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          placeholder="Live search..."
          className="searchwithbut"
          onChange={(e) => {
            setquery(e.target.value);
          }}
        />
        <button type="submit" className="but">
          Search
        </button>

        {valid !== "" ? <div>{valid}</div> : null}
      </form>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Article</th>

            <th scope="col">Keyword</th>
            <th scope="col">Abstract</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((article, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{article.article}</td>

                    <td>{getHighlightedText(`${article.keywords}`, query)}</td>
                    <td>{getHighlightedText(`${article.abstract}`, query)}</td>
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}

export default SearchWithButton;
