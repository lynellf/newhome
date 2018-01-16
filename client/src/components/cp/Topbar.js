import React, { Component } from 'react';

export default class Topbar extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return(
            <div className="cpanel__top">
              <h2 className="cpanel__top__title">Ezell Frazier</h2>
              <ul className="cpanel__top__options">
              <li className="cpanel__top__item"><a href="#logout" className="cpanel__top__link">New Post</a></li>
                <li className="cpanel__top__item"><a href="#logout" className="cpanel__top__link">Logout</a></li>
                <li className="cpanel__top__item"><a href="#account" className="cpanel__top__link">Account</a></li>
              </ul>
            </div>
        );
    }
}