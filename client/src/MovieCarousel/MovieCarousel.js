import React, { Component } from "react";
import { withCookies  } from 'react-cookie';
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import "./MovieCarousel.css";


//a movie ID that works for testing etc: 299537 (Captain Marvel)
class MovieCarousel extends Component {

    constructor(props) {
        super(props);

        this.state = {
            status: "LOADING",
            movies: [],
            children: [],
            activeItemIndex: 0
        }
    }

    componentDidMount() {
        for(let i = 0; i < this.props.list.movies.length; i++){
            let movie_id = this.props.list.movies[i].id;
            const baseUri = "https://image.tmdb.org/t/p/w500";
            let prevChildren = this.state.children;
            this.props.model.getMovie(movie_id)
                .then(fetchMovie => {
                    prevChildren.push(
                        <Link to={`/details/${fetchMovie.id}`} key={fetchMovie.id} className="movieLink">
                            <div className="imgDiv">
                            <img src={baseUri + fetchMovie.poster_path} alt={fetchMovie.title + " poster"}/>
                            <div className="caption">{fetchMovie.title}</div>
                            </div>
                        </Link>);
                    this.setState({
                        children: prevChildren
                    });
                })
                .then(
                    this.setState({
                        status: "LOADED"
                    })
                )
                .catch(err => {
                    console.log("ERROR! " + err.toString());
                    this.setState({
                        status: "ERROR"
                    });
                });
        }
    }

    changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });


    render() {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                paritialVisibilityGutter: 40
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                paritialVisibilityGutter: 30
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                paritialVisibilityGutter: 20
            }
        };
        let content = <div className="smallSpinner"></div>;
        //console.log(this.state.movies);
        if(this.state.children.length !== 0){
            //this.populateChildren();
            if(this.state.children.length === 2){
                responsive.desktop.items = 2;
            } else if(this.state.children.length === 1){
                responsive.desktop.items = 1;
                responsive.tablet.items = 1;
            }
        }
        if(this.state.status === "LOADED"){
            content = (<div><h3>{this.props.list.name}<br/></h3>
                <Carousel
            paritialVisibile={true}
            swipeable={true}
            draggable={true}
            showDots={this.state.children.length>2}
            responsive={responsive}
            arrows={this.state.children.length>2}
            ssr={true} // means to render carousel on server-side.
            slidesToSlide={1}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="transform 300ms ease-in-out"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            deviceType={this.props.deviceType}
            dotListClass="carousel-dot"
            itemClass="carouselItem"
            minimumTouchDrag={50}
                >
                {this.state.children.map(item => item)}
                </Carousel></div>)
        }
        return (
            <div className="carousel">
                {content}
            </div>
        );
    }
}

export default withCookies(MovieCarousel);