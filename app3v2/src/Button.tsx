import { FC } from "react";

type Props = {
  onCustomClick: () => void;
};

const Button: FC<Props> = ({ onCustomClick }) => (
  <button onClick={onCustomClick} style={{ backgroundColor: "blue" }}>
    App 3v2 Button
  </button>
);

export default Button;
