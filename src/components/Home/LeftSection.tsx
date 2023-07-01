import { Input } from "../UI/Input";
import SubscribedCommunities from "../Widgets/SubscribedCommunities";

const LeftSection = ({ forums }: { forums: string[] | null }) => (
  <section className="hidden py-4 md:flex md:flex-col md:gap-5">
    <Input />
    <SubscribedCommunities forums={forums} />
  </section>
);

export default LeftSection;
