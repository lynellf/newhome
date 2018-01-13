import React, { Component } from 'react';
import codeReview from '../images/codereview.JPG';
import gameShow from '../images/gameshow.PNG';
import lightbox from '../images/lightbox.jpg';
import reactGallery from '../images/reactgallery.JPG';
import samplePortfolio from '../images/sample-portfolio.JPG';

import Navbar from './Navbar';

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
            ],
            currentIMG: reactGallery
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
        const images = imageArray.map(image =>
            <img src={ image.url } alt={ image.alt } key={ image.id } className={ image.className }/>
        );
        
        return(
            <div className="site">
                <Navbar />
                <div className="jumbotron">
                <div className="greeting">
                    <h1 className="greeting__name">Ezell Frazier</h1>
                    <h1 className="greeting__header">Full-Stack Web Developer</h1>
                </div>
                <div className="overlay"></div>
                    { images }
                </div>
                <div className="text">
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p>

<p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. </p>

<p>Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. </p>

<p>Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. </p>

<p>Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. </p>


                </div>
            </div>
        );
    }
}
