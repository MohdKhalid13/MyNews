import React,{useState, useEffect} from 'react'
import NewsItems from './NewsItems';
import Spinner from './Spinner';
// import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';

const Hooks = (props) =>  {

    const [articles,setArticles] = useState([])
    const [loading,setLoading] = useState(true)
    const [page,setPage] = useState(1)
    const [totalResults,setTotalResults] = useState(0)

    const capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const UpdateNews= async () => {
        props.setProgress(10); 
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apikey}&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        props.setProgress(50);
        let parsedData = await data.json();
        console.log(parsedData);
        setLoading({ loading: true })
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false)
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `News - ${capital(props.category)}`;
        UpdateNews();
    }, [])

    const handlePrevClick = async () => {
        console.log("Previous");
        setPage(page - 1);
        UpdateNews()
    }

    const handleNextClick = async () => {
        console.log("Next");
        setPage(page + 1);
        UpdateNews()
    }

    // fetchMoreData = async () => {
    //     setPage({ page: this.state.page + 1 })
    //     // this.setState({ page: this.state.page + 1 })
    //     let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=ac41b70545bb4e89869943599a60cab9&page=${this.state.page}&pageSize=${props.pageSize}`
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: this.state.articles.concat(parsedData.articles),
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     })
    // setArticles(articles.concat(parsedData.articles))
    // setTotalResults


    // };

        return(
            <>
                <div className="container my-3">
                    <h2 className='text-center' style={{ margin: '40px 0px' }}>{`My News - ${capital(props.category)}`}</h2>
                    {loading && <Spinner />}

                    {/* <InfiniteScroll
                        dataLength={articles.length} //This is important field to render the next data
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner />}
                    > */}
                        <div className="container">
                            <div className="row">
                                {!loading && articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>


                    {/* </InfiniteScroll> */}

                    <div className="container d-flex justify-content-between">

                        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={handlePrevClick} > &larr; Previous</button>

                        <button disabled={page + 1 > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick} >Next &rarr;</button>

                    </div>
                </div>



            </>
            )

                            
    
                            }

//  Hooks.defaultProps = {
//     country: 'in',
//     pageSize: 8,
//     category: 'general'
// }

// PropTypes = {
//     country: PropTypes.string,
//     pageSize: PropTypes.number,
//     category: PropTypes.string
// }



export default Hooks;