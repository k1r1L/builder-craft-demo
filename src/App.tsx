import "./app/i18n";
import FieldBuilder from "./components/FieldBuilder/FieldBuilder";

export default function App() {
  console.log("ENV:", import.meta.env.VITE_POST_ENDPOINT);
  return <FieldBuilder />;
}
