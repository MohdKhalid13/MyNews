import React, { Component } from 'react'
import NewsItems from './NewsItems';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
// import InfiniteScroll from 'react-infinite-scroll-component';

class Intro extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }

    PropTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capital = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Hello I am a constructor from new component");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            // totalResults: 0
        }

        document.title = `News - ${this.capital(this.props.category)}`;
    }

    async UpdateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url);
        this.props.setProgress(50);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({ loading: true })
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.UpdateNews()
    }

    handlePrevClick = async () => {
        console.log("Previous");
        this.setState({ page: this.state.page - 1 });
        this.UpdateNews()
    }

    handleNextClick = async () => {
        console.log("Next");
        this.setState({ page: this.state.page + 1 });
        this.UpdateNews()
    }

    // fetchMoreData = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ac41b70545bb4e89869943599a60cab9&page=${this.state.page}&pageSize=${this.props.pageSize}`
    //     this.setState({loading : true})
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         articles: this.state.articles.concat(parsedData.articles),
    //         totalResults: parsedData.totalResults,
    //         loading: false
    //     })

    // };

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2 className='text-center' style={{ margin: '40px 0px' }}>{`My News - ${this.capital(this.props.category)}`}</h2>
                    {this.state.loading && <Spinner />}

                    {/* <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    > */}
                        {/* <div className="container"> */}
                            <div className="row">
                                {!this.state.loading && this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        {/* </div> */}


                    {/* </InfiniteScroll> */}

                    <div className="container d-flex justify-content-between">

                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>

                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>

                    </div>
                </div>



            </>
        )
    }
}


export default Intro;