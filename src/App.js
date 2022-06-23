import { Route } from "react-router-dom";
import Layout from "./Componets/Layout/Layout";
import Medicine from "./Containers/Medicine/Medicine";
import Patient from "./Containers/Patient/Patient";

function App() {
  return (
    <>
      <Layout >
        <Route path={"/medicines"} exact to={Medicine} />
        <Route path={"/Patient"} exact to={Patient} />
    
      </Layout>


    </>
  );
}

export default App;
