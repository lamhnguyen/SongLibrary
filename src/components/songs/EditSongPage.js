import React, { useEffect, useState, useContext } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Spinner from "../common/Spinner";
import { loadSong, saveSong } from "../../actions/songActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import confirm from "../confirm";

const newSong = {
  id: null,
  name: "",
  author1Id: null,
  author2Id: null,
  poetId: null,
  keyId: null,
  genreId: null,
  lyrics: "",
};

export function EditSongPage({
  isLoading,
  loadSong,
  saveSong,
  history,
  ...props
}) {
  let [song, setSong] = useState(null);

  // Page load
  useEffect(() => {
    const slug = props.match.params.slug;
    if (slug) {
      loadSong(slug)
        .then((s) => setSong(s))
        .catch(history.push("/"));
    } else setSong(newSong);
  }, []);

  async function handleSave(song) {
    saveSong(song).then(() => history.push("/"));
  }

  async function handleCancel() {
    const result = await confirm.show({
      message: `Are you sure to cancel?`,
    });
    if (result) {
      history.push("/");
    }
  }

  if (isLoading)
    return (
      <div className="container">
        <Spinner />
      </div>
    );

  return (
    song && (
      <div className="container">
        <form>
          <span className="h3">{song.id ? "Edit" : "Add"} Song</span>
        </form>
      </div>
    )
  );
}

EditSongPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadSong: PropTypes.func.isRequired,
  saveSong: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired,
    }),
  }),
};

function mapStateToProps(state) {
  return {
    isLoading: state.apiStatus.count > 0,
  };
}

const mapDispatchToProps = {
  loadSong,
  saveSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSongPage);
