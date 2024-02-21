import React,{useEffect,useState} from 'react'
import Newsitem from './Newsitem'
import Spinners from './Spinners';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
const News =(props)=>{
 const [articles, setArticles]=useState([])
 const [loading, setLoadings]=useState(true)
 const [page, setPage]=useState([1])
 const [totalResults, setTotalResults]=useState(0)
//  document.title=`${this.capitalizeFirstLetter(props.category)} - Daily News`;
  const capitalizeFirstLetter =(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
  
  const updateNews = async ()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=57ea69b1dcd94a3fb2ddc125b5c12898&page=${page}&pageSize=${props.pageSize}`;
    setLoadings(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json()
    props.setProgress(70);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoadings(false)
    // console.log(parsedData);
    // this.setState({ articles: parsedData.articles, totalArticles: parsedData.totalResults, loading: false })
    props.setProgress(100);
  }
  useEffect(()=>{
updateNews();
  },[])
  
 const handlePrevClick = async () => {
    console.log("Prev");

    setPage(page-1)
    updateNews();
  }

 const handleNextClick = async () => {
    console.log("Next");
    setPage(page+1)
    updateNews();

  }
  const fetchMoreData = async() => {
    setPage(page+1)
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=57ea69b1dcd94a3fb2ddc125b5c12898&page=${page}&pageSize=${props.pageSize}`;
    // this.setState({ loading: false });
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles(articles.concat (parsedData.articles))
    setTotalResults(parsedData.totalResults)
    };
  
    return (
      <>
        <h1 className="text-center" style={{ margin: '35px 0px' }}>Daily News - Top  {capitalizeFirstLetter(props.category)} Headlines </h1>
        {loading && <Spinners />}

        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles!==totalResults}
          loader={<Spinners/>}
        >
          <div className="container">
          <div className="row">
          { articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} />
            </div>
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* < div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleNextClick}>&#8249; Prev</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &#8250;</button>
        </div> */}
      </>
    )
  
  News.defaultProps = {
    country: 'in',
    pageSize: 8
  }
  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
}
export default News

