export const convertStringToDate = (date: string): string => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();

  let monthStr;

  switch (month) {
    case 0:
      monthStr = "Jan.";
      break;
    case 1:
      monthStr = "Feb.";
      break;
    case 2:
      monthStr = "Mar.";
      break;
    case 3:
      monthStr = "Apr";
      break;
    case 4:
      monthStr = "May";
      break;
    case 5:
      monthStr = "June";
      break;
    case 6:
      monthStr = "July";
      break;
    case 7:
      monthStr = "Aug.";
      break;
    case 8:
      monthStr = "Sept.";
      break;
    case 9:
      monthStr = "Oct";
      break;
    case 10:
      monthStr = "Nov.";
      break;
    case 11:
      monthStr = "Dec.";
      break;
    default:
      monthStr = "Undefined";
  }

  return `${monthStr} ${day}, ${year}`;
};
