function getRandomColor() {
    var characters = "0123456789ABCDEF";
    var color = "#";

    for (var i = 0; i < 6; i++) {
      color += characters[getRandomNumber(0, 15)];
    }

    return color;
  }

  function getRandomNumber(low, high) {
    var r = Math.floor(Math.random() * (high - low + 1)) + low;
    return r;
  }
  export default getRandomColor