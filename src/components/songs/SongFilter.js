import React from "react";
import PropTypes from "prop-types";

const renderName = (name, value) => {
  return (
    <div className="p-0">
      <p className="m-0">
        {name}: <b>{value}</b>
      </p>
    </div>
  );
};

const renderViewButton = (name, value, view, onChangeView) => {
  return (
    <button
      type="button"
      className={`btn btn-outline-primary btn-sm mr-1 ${
        view === value ? "disabled" : ""
      }`}
      {...(view === value ? { disabled: true } : {})}
      onClick={() => onChangeView(value)}
    >
      {name}
    </button>
  );
};

const renderViews = (view, onChangeView) => {
  return (
    <div>
      {renderViewButton("Random", "random", view, onChangeView)}
      {renderViewButton("New", "new", view, onChangeView)}
      {renderViewButton("Popular", "popular", view, onChangeView)}
      {renderViewButton("Like", "like", view, onChangeView)}
    </div>
  );
};

const SongFilter = ({ view, author, poet, artist, onChangeView }) => {
  if (author) return renderName("Author", author);

  if (poet) return renderName("Poet", poet);

  if (poet) return renderName("Artist", artist);

  return renderViews(view, onChangeView);
};

SongFilter.propTypes = {
  view: PropTypes.string,
  author: PropTypes.string,
  poet: PropTypes.string,
  artist: PropTypes.string,
  onChangeView: PropTypes.func.isRequired,
};

export default SongFilter;
