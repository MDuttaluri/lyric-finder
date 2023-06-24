import React from 'react';
import './Styles.scss';
import Search from './Components/Search/Search';
import { useState } from 'react';

function App() {
  const [agreement, setAgreement] = useState(false)
  return (
    <div style={{marginBottom:"10px"}}>
      <div className="centerDiv__outer--grid" hidden={agreement}>
        <h1>Alert!</h1>
        <p className="alert">This is a project done purely for <span className="highlights">educational purposes</span>  and does not intend to violate any copyrights of the actual data sources. This site is just an example of a web scrapper in React.js. It does not intend nor encourage any violation of the policies of the actual data owners. This site is not monetized and is ready to be shut down in case of a notice of breach of any copyrights.</p>

        <p className="highlights"> Please agree to use this site for non-commercial and educational purposes to proceed.</p>
        <button onClick={()=>{setAgreement(true)}}>Agree</button>
      </div>
      <div hidden={!agreement}>
      <Search />
      </div>
    </div>
  );
}

export default App;
