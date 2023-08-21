import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";
import React from "react";

const TimeAge = ({ time }) => {
  let timeAgo = "";

  if (time) {
    const date = parseISO(time);
    const timeperiod = formatDistanceToNow(date);

    timeAgo = `${timeperiod} Ago`;
  }
  return (
    <span>
      &nbsp; <i> {timeAgo}</i>
    </span>
  );
};

export default TimeAge;
