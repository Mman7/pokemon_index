import { useLocation } from "react-router";
import { Wrapper } from "../../components/wrapper";

export default function ItemDetails() {
  const location = useLocation();
  const state = location.state;

  return (
    <Wrapper>
      <div className="p-6">ItemDetails</div>
    </Wrapper>
  );
}
