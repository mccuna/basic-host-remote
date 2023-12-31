import { FC } from "react";

type Props = {
  onCustomClick: () => void;
};

const Button: FC<Props> = ({ onCustomClick }) => (
  <button onClick={onCustomClick} style={{ backgroundColor: "yellow" }}>
    App 2 Button
  </button>
);

export default Button;
