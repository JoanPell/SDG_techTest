import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navigator extends Component {
    render() {
        return (
            <nav className="navigator">
                <Link to="/">Veure Tots</Link>
                <Link to="/homes">Homes</Link>
                <Link to="/dones">Dones</Link>
                <Link to="/total">Total</Link>
            </nav>
        );
    }
}

export default Navigator;
