import React, { Component } from 'react';
import { Parallax } from 'react-parallax';

import codeReview from '../images/codereview.JPG';
import gameShow from '../images/gameshow.PNG';
import lightbox from '../images/lightbox.jpg';
import reactGallery from '../images/reactgallery.JPG';
import samplePortfolio from '../images/sample-portfolio.JPG';

export default class Jumbotron extends Component {
    constructor() {
        super();
        this.state = {
            imageURL: [
                {
                    url: codeReview,
                    className: 'jumbotron__img--inactive',
                    alt: 'Code Review',
                    id: 0
                },
                {
                    url: gameShow,
                    className: 'jumbotron__img--inactive',
                    alt: 'Game Show',
                    id: 1
                },
                {
                    url: lightbox,
                    className: 'jumbotron__img--inactive',
                    alt: 'Lightbox',
                    id: 2
                },
                {
                    url: reactGallery,
                    className: 'jumbotron__img--active',
                    alt: 'React Gallery',
                    id: 3
                },
                {
                    url: samplePortfolio,
                    className: 'jumbotron__img--inactive',
                    alt: 'Sample Portfolio',
                    id: 4
                }
            ]
        }
    }

    displayRandomImg = () => {
          const array = this.state.imageURL,
            max = Math.floor(array.length),
            min = 0;

          let randomNum = Math.floor(Math.random() * (max - min) + min);

          for (let i = 0; i < array.length; i++) {
            array[i].className = 'jumbotron__img--inactive';
          }

          array[randomNum].className = 'jumbotron__img--active';

          this.setState({ imageURL: array });
        };

    componentDidMount() {
        setInterval(() => {
            this.displayRandomImg();
        }, 5000);
    }
    render() {
        const imageArray = this.state.imageURL;
        const images = imageArray.map(image => (
          // <img src={ image.url } alt={ image.alt } key={ image.id } className={ image.className }/>
          <div key={image.id} className={image.className}>
            <Parallax bgImage={image.url} strength={300} blur={1}/>
          </div>
        ));
        
        return(
            <div className="jumbotron">
            <div className="greeting">
                <h1 className="greeting__name">Ezell Frazier</h1>
                <h1 className="greeting__sub">Full-Stack Web Developer</h1>
            </div>
            <div className="overlay"></div>
                { images }
            </div>
        );
    }
}
