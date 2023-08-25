import BashawayDark from "./dark";
import BashawayLight from "./light";

const Bashaway = ({ dark, ...props }) => {
  if (!dark) {
    return <BashawayLight {...props} />;
  }
  return <BashawayDark {...props} />;
};

export default Bashaway;
