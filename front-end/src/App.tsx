import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { Layout } from "./Layout";
import authProvider from "./authProvider";
import myDataProvider from "./dataProvider";

export const App = () => (
  <Admin layout={Layout} authProvider={authProvider} dataProvider={ myDataProvider}>
    <Resource name="documents"/>
  </Admin>
);
