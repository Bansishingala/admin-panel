import { Route, Switch } from "react-router-dom";
import Layout from "./Componets/Layout/Layout";
import Medicine from "./Containers/Medicine/Medicine";
import Patient from "./Containers/Patient/Patient";


function App() {
  return (
    <>
      <Layout >
        <Switch>
          <Route path={"/medicines"} exact component={Medicine} />
          <Route path={"/Patient"} exact component={Patient} />
        </Switch>
      </Layout>


    </>
  );
}

export default App;
