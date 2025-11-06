const ratingStore = {
  rating: '',
  setRating(newRating: string) {
    this.rating = newRating;
  },
  clearRating() {
    this.rating = '';
  }
};

export default ratingStore;


// i don't need to export the type right now, but later