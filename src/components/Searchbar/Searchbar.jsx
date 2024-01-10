import { Component } from "react";

import { Notify } from 'notiflix/build/notiflix-notify-aio.js';

Notify.init({
    width: '300px',
    position: 'left-top',
    fontSize: '16px',    
});

export default class Searchbar extends Component {
     state = {  
         query: ''
    }

    shouldComponentUpdate(_, nextState) {         
        return this.state.query !== nextState.query
    }

    handelChange = evt => {
        const { name, value } = evt.currentTarget        
        this.setState({[name]: value})
    }

    handelFormSubmit = evt => {
        const { query } = this.state
        evt.preventDefault()
        if (query.trim() === '') {
            Notify.warning("Error! You must specify a keyword to search for.");
            this.reset()
            return
        }    
        this.props.onSubmit(query)
        this.reset()
    }

    reset = () => {
        this.setState({query: ''})
    }
    
    render() {
        const { query } = this.state
       
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handelFormSubmit}>
                    <button type="submit" className="SearchForm-button">
                    <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                    className="SearchForm-input"
                    type="text"
                    name="query"
                    value={query}
                    onChange={this.handelChange}    
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    />
                </form>
            </header>)
    }
}