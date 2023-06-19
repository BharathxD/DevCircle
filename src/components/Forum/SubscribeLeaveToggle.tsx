import { FC } from "react";
import { Button } from "../UI/Button";

interface SubscribeLeaveToggleProps {
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({
  isSubscribed,
}) => {
  if (isSubscribed) {
    return <Button className="hover:bg-red-500 w-full">Leave community</Button>;
  }
  return <Button className="hover:bg-green-500 w-full">Join community</Button>;
};

export default SubscribeLeaveToggle;
