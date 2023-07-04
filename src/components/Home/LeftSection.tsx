import { Input } from "../UI/Input";
import Footer from "../Widgets/Footer";
import SubscribedCommunities from "../Widgets/SubscribedCommunities";

const LeftSection = ({ forums }: { forums: string[] | null }) => (
  <section className="relative hidden py-4 md:flex md:flex-col md:gap-5">
    <Input />
    <SubscribedCommunities forums={forums} />
    <Footer />
  </section>
);

export default LeftSection;
