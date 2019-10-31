export function position(place) {
  switch (place) {
    case "1":
      return "yellow";
    case "2":
      return "grey";
    case "3":
      return "orange";
    case "4":
      return "light-green";
    case "5":
      return "light-blue";
    case "6":
      return "cyan";
    case '7':
        return 'teal'

    default:
      return "grey darken-1";
  }
}
