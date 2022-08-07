import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Layout from "./Componets/Layout/Layout";
import Counter from "./Containers/Counter/Counter";
import Doctor from "./Containers/Doctor/Doctor";
import Medicine from "./Containers/Medicine/Medicine";
import Patient from "./Containers/Patient/Patient";
import { configureStore } from "./Redux/Store";


function App() {
  const store = configureStore()
  return (
    <>
    <Provider store={store}>
      <Layout >
        <Switch>
          <Route path={"/medicines"} exact component={Medicine} />
          <Route path={"/Patient"} exact component={Patient} />
          <Route path={"/Doctor"} exact component={Doctor} />
          <Route path={"/Counter"} exact component={Counter} />
        </Switch>
      </Layout>
      </Provider>


    </>
  );
}

export default App;
