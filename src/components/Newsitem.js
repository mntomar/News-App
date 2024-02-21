import React from 'react'

const Newsitem=(props)=>{
  
    let { title, description, imageUrl, newsUrl, author, date } = props;
    return (
      <div className="my-3">
        <div className="card" >
          <img src={!imageUrl ? "https://i.gadgets360cdn.com/large/RS-Q19YNZE-split-ac-bottom-perspective-view-DZ-07_1_1697108540939.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title"> {title}...</h5>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-muted">By {author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
    
}

export default Newsitem
