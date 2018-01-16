import React, { Component } from 'react';

export default class ProjectArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const createMarkup = () => {
            const markup = this.props.post;
            return {__html: markup};
        };
        return(
            <div className="article__container">
                <div className="article__post" dangerouslySetInnerHTML={ createMarkup() }/>
                <img src={`https://ezellfrazier.com/${this.props.image}`} alt={this.props.title}
                className="article__image"/>
            </div>
        );
    }
}