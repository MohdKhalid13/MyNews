import React, { Component } from 'react'
import NewsItems from './NewsItems';

class Data extends Component {
    constructor() {
        super();
        console.log("Hello I am a constructor from new component");
        this.state = {
            articles: [],
            loading: false,
            page: 1

        }
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
        this.UpdateNews();

    }

    handlePrevClick = async () => {
        console.log("Previous");
        this.UpdateNews();
        this.setState({ page: this.state.page - 1 });
    }

    handleNextClick = async () => {
        console.log("Next");
        this.UpdateNews();
        this.setState({ page: this.state.page + 1 });
    }





    render() {
        return (
            <>
                <div className="container my-3">
                    <h2>My News</h2>
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>

                    <div className="container d-flex justify-content-between">

                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} > &larr; Previous</button>

                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNextClick} >Next &rarr;</button>

                    </div>
                </div>

            </>
        )
    }
}


export default Data;