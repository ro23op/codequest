import React from 'react';
import './Rightsidebar.css';
import Widget from './Widget';
import Widgettag from './Widgettag';

function Rightsidebar() {
  return (
    <aside className="right-sidebar">
      <Widget/>
      <Widgettag/>
    </aside>
  )
}

export default Rightsidebar