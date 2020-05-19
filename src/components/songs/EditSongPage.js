import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import {
  loadSong,
  createSong,
  saveSong,
  createSongAuthor,
  createSongPoet,
  createSongArtist,
} from "../../actions/songActions";
import { loadKeys } from "../../actions/keyActions";
import { loadGenres } from "../../actions/genreActions";
import { loadAuthors } from "../../actions/authorActions";
import { loadPoets } from "../../actions/poetActions";
import { loadArtists } from "../../actions/artistActions";
import confirm from "../confirm";
import TextInput from "../common/TextInput";
import TextAreaInput from "../common/TextAreaInput";
import SelectInput from "../common/SelectInput";
import MultiSelectInput from "../common/MultiSelectInput";
import { getErrorMessage } from "../../api/apiHelper";

export function EditSongPage({
  keys,
  genres,
  authors,
  poets,
  artists,
  isLoading,
  loadSong,
  loadKeys,
  loadGenres,
  loadAuthors,
  loadPoets,
  loadArtists,
  createSongAuthor,
  createSongPoet,
  createSongArtist,
  createSong,
  saveSong,
  history,
  ...props
}) {
  const [song, setSong] = useState(null);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  // Page load
  useEffect(() => {
    if (!keys) loadKeys();
    if (!genres) loadGenres();

    if (!authors) loadAuthors();
    if (!poets) loadPoets();
    if (!artists) loadArtists();

    const slug = props.match.params.slug;
    if (slug) {
      if (!song || song.slug !== slug) loadSong(slug);
    } else createSong();
  }, []);

  // Song loaded
  useEffect(() => {
    if (props.song) setSong(props.song);
  }, [props.song]);

  async function handleSave(event) {
    event.preventDefault();

    if (!formIsValid()) return;

    setSaving(true);

    saveSong(song, true)
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ server: getErrorMessage(error) });
      });
  }

  async function handleCancel(event) {
    event.preventDefault();

    const result = await confirm.show({
      message: `Are you sure to cancel?`,
    });
    if (result) {
      history.push("/");
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setSong((prevSong) => ({
      ...prevSong,
      [name]: ["keyId", "genreId"].includes(name) ? parseInt(value, 10) : value,
    }));
  }

  function handleCreateOption(newValue, name) {
    if (name === "authorIds")
      createSongAuthor({ name: newValue }, true).catch((error) =>
        setErrors({ server: getErrorMessage(error) })
      );
    else if (name === "poetIds")
      createSongPoet({ name: newValue }, true).catch((error) =>
        setErrors({ server: getErrorMessage(error) })
      );
    else if (name === "artistIds")
      createSongArtist({ name: newValue }, true).catch((error) =>
        setErrors({ server: getErrorMessage(error) })
      );
    else throw new Error(`Unknown option: ${name}`);
  }

  function handleMultiChange(selectedOptions, name) {
    setSong((prevSong) => ({
      ...prevSong,
      [name]: selectedOptions,
    }));
  }

  function formIsValid() {
    const { name, keyId, genreId, authorIds, lyrics } = song;
    const errors = {};

    if (!name) errors.name = "Name is required.";
    if (!keyId) errors.keyId = "Key is required";
    if (!genreId) errors.genreId = "Genre is required";
    if (authorIds.length === 0) errors.authorIds = "Author is required";
    if (lyrics === "") errors.lyrics = "Lyrics is required";

    setErrors(errors);

    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  if (isLoading || !song)
    return (
      <div>
        <Spinner />
      </div>
    );

  return (
    <div>
      <form onSubmit={handleSave}>
        <span className="h3">{song.id ? "Edit" : "Add"} Song</span>
        {errors.server && (
          <div className="alert alert-danger my-2" role="alert">
            {errors.server}
          </div>
        )}
        <div className="form-row" style={{ marginBottom: "-1rem" }}>
          <div className="form-group col-md-6">
            <TextInput
              name="name"
              label="Name"
              value={song.name}
              onChange={handleChange}
              error={errors.name}
            />
          </div>
          <div className="form-group col-md-6">
            <TextInput
              name="slug"
              label="Slug"
              value={song.slug}
              readOnly={true}
              onChange={handleChange}
              error={errors.slug}
            />
          </div>
        </div>
        <div className="form-row" style={{ marginBottom: "-1rem" }}>
          <div className="form-group col-md-6">
            <SelectInput
              name="keyId"
              label="Key"
              value={song.keyId || ""}
              defaultOption="Select Key"
              options={keys.map((key) => ({
                value: key.id,
                text: key.name,
              }))}
              onChange={handleChange}
              error={errors.keyId}
            />
          </div>
          <div className="form-group col-md-6">
            <SelectInput
              name="genreId"
              label="Genre"
              value={song.genreId || ""}
              defaultOption="Select Genre"
              options={genres.map((genre) => ({
                value: genre.id,
                text: genre.name,
              }))}
              onChange={handleChange}
              error={errors.genreId}
            />
          </div>
        </div>
        <MultiSelectInput
          name="authorIds"
          label="Authors"
          creatable={true}
          value={song.authorIds}
          placeholder="Select Authors"
          options={authors.map((author) => ({
            value: author.id,
            label: author.name,
          }))}
          onChange={handleMultiChange}
          onCreate={handleCreateOption}
          error={errors.authorIds}
        />
        <MultiSelectInput
          name="poetIds"
          label="Poets"
          creatable={true}
          value={song.poetIds}
          placeholder="Select Poets"
          options={poets.map((poet) => ({
            value: poet.id,
            label: poet.name,
          }))}
          onChange={handleMultiChange}
          onCreate={handleCreateOption}
          error={errors.poetIds}
        />
        <MultiSelectInput
          name="artistIds"
          label="Artists"
          creatable={true}
          value={song.artistIds}
          placeholder="Select Artists"
          options={artists.map((artist) => ({
            value: artist.id,
            label: artist.name,
          }))}
          onChange={handleMultiChange}
          onCreate={handleCreateOption}
          error={errors.artistIds}
        />
        <TextAreaInput
          name="lyrics"
          label="Lyrics"
          rows={20}
          cols={20}
          value={song.lyrics}
          onChange={handleChange}
          error={errors.lyrics}
        />
        <button type="submit" disabled={saving} className="btn btn-primary">
          {saving ? "Saving..." : "Save"}
        </button>
        <button disabled={saving} className="btn" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}

EditSongPage.propTypes = {
  song: PropTypes.object,
  keys: PropTypes.array,
  genres: PropTypes.array,
  authors: PropTypes.array,
  poets: PropTypes.array,
  artists: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  loadSong: PropTypes.func.isRequired,
  loadKeys: PropTypes.func.isRequired,
  loadGenres: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadPoets: PropTypes.func.isRequired,
  loadArtists: PropTypes.func.isRequired,
  createSongAuthor: PropTypes.func.isRequired,
  createSongPoet: PropTypes.func.isRequired,
  createSongArtist: PropTypes.func.isRequired,
  createSong: PropTypes.func.isRequired,
  saveSong: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string,
    }),
  }),
};

function mapStateToProps(state) {
  const isLoading =
    !state.keys ||
    !state.genres ||
    !state.authors ||
    !state.poets ||
    !state.artists ||
    !state.song;

  return {
    song: state.song,
    keys: state.keys,
    genres: state.genres,
    authors: state.authors,
    poets: state.poets,
    artists: state.artists,
    isLoading,
  };
}

const mapDispatchToProps = {
  loadSong,
  loadKeys,
  loadGenres,
  loadAuthors,
  loadPoets,
  loadArtists,
  createSongAuthor,
  createSongPoet,
  createSongArtist,
  createSong,
  saveSong,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSongPage);
