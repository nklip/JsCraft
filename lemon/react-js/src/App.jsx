import './assets/css/App.css';
import { Fragment } from 'react';
import { BrowserRouter} from "react-router-dom";

import Alert from './components/Alert';
import Footer from './components/Footer';
import Header from './components/Header';
import Main from './components/Main';
import Nav from './components/Nav';

import { ChakraProvider } from "@chakra-ui/react";
import { AlertProvider } from "./hooks/alertContext";
import { system } from "./lib/theme";

function App() {
  return (
    <Fragment>
      <ChakraProvider value={system}>
        <Header/>
        <Nav/>
          <AlertProvider>
            <BrowserRouter>
              <Main/>
            </BrowserRouter>
            <Alert/>
          </AlertProvider>
        <Footer/>
      </ChakraProvider>
    </Fragment>
  );
}

export default App;
