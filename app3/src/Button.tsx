import { FC } from "react";

type Props = {
  onCustomClick: () => void;
};

const Button: FC<Props> = ({ onCustomClick }) => (
  <button onClick={onCustomClick} style={{ backgroundColor: "red" }}>
    App 3 Button
  </button>
);

export default Button;
