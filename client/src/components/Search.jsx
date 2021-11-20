import { useContext, useState } from "react";
import { searchPizzaAction } from "../context/actions/PizzaActions";
import { GlobalContext } from "../context/Provider";

const Search = () => {
  const { dispatch } = useContext(GlobalContext);
  const [opetion, setOpetion] = useState(true);
  const [category, setCategory] = useState("All");
  const [searchKey, setSearchKey] = useState("");

  return (
    <div className="s003">
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="inner-form">
          <div className="input-field first-wrap">
            <div className="input-select">
              <div
                className={`choices ${
                  !opetion ? "is-focused is-open is-flipped" : ""
                }`}
                aria-haspopup={opetion}
                aria-expanded={!opetion}
              >
                <div className="choices__inner">
                  <select style={{ display: "none" }} value={category}>
                    <option value={category} selected="">
                      All
                    </option>
                  </select>
                  <div className="choices__list choices__list--single">
                    <div
                      className="choices__item choices__item--selectable choices__placeholder"
                      onClick={(e) => {
                        opetion ? setOpetion(false) : setOpetion(true);
                      }}
                    >
                      {category}
                    </div>
                  </div>
                </div>
                <div
                  className={`choices__list choices__list--dropdown ${
                    opetion ? "" : "is-active"
                  }`}
                  aria-expanded={!opetion}
                >
                  <div className="choices__list" dir="ltr" role="listbox">
                    <div
                      className={`choices__item choices__item--choice choices__item--selectable  is-highlighted ${
                        category === "All" ? "choices__placeholder" : ""
                      }`}
                      onClick={(e) => {
                        setCategory(e.target.innerText);
                        setOpetion(true);
                      }}
                    >
                      All
                    </div>
                    <div
                      className={`choices__item choices__item--choice choices__item--selectable  is-highlighted ${
                        category === "Veg" ? "choices__placeholder" : ""
                      }`}
                      onClick={(e) => {
                        setCategory(e.target.innerText);
                        setOpetion(true);
                      }}
                    >
                      Veg
                    </div>
                    <div
                      className={`choices__item choices__item--choice choices__item--selectable  is-highlighted ${
                        category === "Nonveg" ? "choices__placeholder" : ""
                      }`}
                      onClick={(e) => {
                        setCategory(e.target.innerText);
                        setOpetion(true);
                      }}
                    >
                      NonVeg
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="input-field second-wrap">
            <input
              id="search"
              type="text"
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
              }}
              placeholder="Enter Keywords?"
            />
          </div>
          <div className="input-field third-wrap">
            <button
              className="btn-search"
              type="button"
              onClick={() => {
                searchPizzaAction(searchKey, category)(dispatch);
              }}
            >
              <svg
                className="svg-inline--fa fa-search fa-w-16"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Search;
