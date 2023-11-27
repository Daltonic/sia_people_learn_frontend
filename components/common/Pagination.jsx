import React from "react";

export default function Pagination() {
  return (
    <div className="pagination -buttons">
      <button className="pagination__button -prev">
        <i className="icon icon-chevron-left"></i>
      </button>

      <div className="pagination__count">
        <a href="#">1</a>
        <a className="-count-is-active" href="#">
          2
        </a>
        <a href="#">3</a>
        <span>...</span>
        <a href="#">67</a>
      </div>

      <button className="pagination__button -next">
        <i className="icon icon-chevron-right"></i>
      </button>
    </div>
  );
}
