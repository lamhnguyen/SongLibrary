export const expandSong = (song, state) => {
  const expandedSong = {
    ...song,
    key: state.keys.find((k) => k.id === song.keyId),
    genre: state.genres.find((g) => g.id === song.genreId),
    authors: state.authors.filter((author) =>
      song.authorIds.includes(author.id)
    ),
    poets: state.poets.filter((poet) => song.poetIds.includes(poet.id)),
    artists: state.artists.filter((artist) =>
      song.artistIds.includes(artist.id)
    ),
  };

  console.log(expandedSong);

  return expandedSong;
};
