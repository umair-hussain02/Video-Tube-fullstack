import { formatDistanceToNow } from "date-fns";

const agoTime = (isoDate) => {
  const timeAgo = formatDistanceToNow(new Date(isoDate), { addSuffix: true });
  return timeAgo;
};

export default agoTime;
