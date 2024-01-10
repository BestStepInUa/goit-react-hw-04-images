import { Component } from "react";

export default class Modal extends Component {
    handleEscClick = evt => {
        if (evt.code === 'Escape') {
            this.props.hideModal()
        }
    }

    componentDidMount() {
		document.addEventListener('keydown', this.handleEscClick)
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleEscClick)
    }
    
    render() {    
        const {largeImageURL, tags} = this.props.selectedHit;
                
        return (
            <div className="Overlay">
                <div className="Modal">
                    <img src={largeImageURL} alt={tags} />
                </div>
            </div>
        )
    }

}