const UniqueMovie = (data) => {
  const uniqueMovies = Object.values(
    data.reduce((acc, current) => {
      acc[current.movieName] = current;
      return acc;
    }, {})
  );

  return uniqueMovies;
};

export default UniqueMovie;
