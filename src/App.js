import React, { useState } from 'react';
import './App.css'
import Navbars from './components/Navbars';
import News from './components/News';
import NewsItems from './components/NewsItems';
import { Routes, Route } from "react-router-dom";
import Intro from './components/Intro';
import Data from './components/Data';
import LoadingBar from 'react-top-loading-bar';
import Hooks from './components/Hooks';


const App = () => {

  const [mode, setmode] = useState("dark")

  const toggle = () => {
    if (mode === "dark") {
      setmode("light")
    } else {
      setmode("dark")
    }
  }
  const pageSize = 5;
  
  const [progress, setProgress] = useState(0)

  const apikey = 'ac41b70545bb4e89869943599a60cab9';
  
  return (
    <div>
      <Navbars mode={mode} toggle={toggle} />
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}

      />
      <Routes>
        <Route path="/" element={<Data setProgress={setProgress} apikey={apikey}  key="general" category={'general'} country={"in"} pageSize={pageSize} />}></Route>
        <Route path="/business" element={<Data setProgress={setProgress} apikey={apikey}  key="business" category={'business'} country={"in"} pageSize={pageSize} />}></Route>
        <Route path="/entertainment" element={<Data setProgress={setProgress} apikey={apikey}  key="entertainment" category={'entertainment'} country={"in"} pageSize={pageSize} />}></Route>
        <Route path="/health" element={<Data setProgress={setProgress} apikey={apikey}  key="health" category={'health'} country={"in"} pageSize={pageSize} />}></Route>
        <Route path="/sports" element={<Data setProgress={setProgress} apikey={apikey}  key="sports" category={'sports'} country={"in"} pageSize={pageSize} />}></Route>
        <Route path="/science" element={<Data setProgress={setProgress} apikey={apikey}  key="science" category={'science'} country={"in"} pageSize={pageSize} />}></Route>
        <Route path="/technology" element={<Data setProgress={setProgress} apikey={apikey}  key="technology" category={'technology'} country={"in"} pageSize={pageSize} />}></Route>

        <Route path="/News" element={<News />}></Route>
        <Route path="/NewsItems" element={<NewsItems />}></Route>
        <Route path="/Data" element={<Data />}></Route>
      </Routes>
    </div>
  )

}

export default App;



