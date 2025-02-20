import React from 'react';
import Leftsidebar from '../../component/Leftsidebar/Leftsidebar';
import Taglist from './Taglist.jsx';
import './Tags.css';
import { tagsList } from './tagslist';

function Tags({slideIn}) {
  return (
    <div className="home-container-1">
        <Leftsidebar slideIn={slideIn}/>
        <div className="home-container-2">
            <h1 className="tags-h1">
                Tags
            </h1>
            <p className="tags-p">A tag is Keyword or label that categorizes your question with other similar questions</p>
            <p className="tags-p">Using the right tags makes it easier for others to find and answer your question</p>
            <div className="tags-list-container">
                {tagsList.map((tag,index)=>(
                    <Taglist tag={tag} key={index}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Tags