import { Route, Switch } from "react-router-dom";
import Layout from "./Componets/Layout/Layout";
import Doctor from "./Containers/Doctor/Doctor";
import Medicine from "./Containers/Medicine/Medicine";
import Patient from "./Containers/Patient/Patient";


function App() {
  return (
    <>
      <Layout >
        <Switch>
          <Route path={"/medicines"} exact component={Medicine} />
          <Route path={"/Patient"} exact component={Patient} />
          <Route path={"/Doctor"} exact component={Doctor} />
        </Switch>
      </Layout>


    </>
  );
}

export default App;
