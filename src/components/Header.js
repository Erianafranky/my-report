import React, { Component } from 'react';
import SearchIcon from '@material-ui/icons/Search'
import Button from '@material-ui/core/Button'
import Input from'@material-ui/core/Input'
import './CSS/header.css'
import './CSS/global.css' 

class Header extends Component {
    constructor() {
        super();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        alert("submit");
    }

    render() {
        return (
            <div className="col-sm-12">
            <header className="header">
                <span className="header__logo">Reports</span>
                <form className="header__search-form" onSubmit={this.onSubmit}>
                    <Input fullWidth className="header__search-field" />
                    <Button type="submit" variant="contained" color="primary">
                        <SearchIcon />
                    </Button>
                </form>
                

            </header>
            </div>
        );
    
    }
}

export default Header;