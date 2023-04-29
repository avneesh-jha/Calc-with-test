import { Calculator } from "./components/Calculator";
import s from "./App.module.css";
import { RandomUser } from "components/RandomUser/RandonUser";
export function App() {
  return (
    <div className={s.root}>
      <Calculator defaultA={0} defaultB={0} defaultOperator={"+"} />
      <RandomUser />
    </div>
  );
}
