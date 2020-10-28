import React, { Component } from 'react';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.message = 'Insert the puzzle size:';
        this.messageClassDefault = 'Message';
        this.messageClassError = 'Error';
        this.state = {
            width: 3,
            height: 3,
            message: this.message,
            messageClass: this.messageClassDefault,
        };
    }
    onClickSizeHandler = event => {
        const width = parseInt(this.state.width);
        const height = parseInt(this.state.height);

        console.log(typeof width, typeof height);

        let message = this.message;
        let messageClass = this.messageClassDefault;

        if (width > 2 && height > 2 && typeof width === 'number' && typeof height === 'number') {
            this.props.initPuzzle(width, height);
        }
        else if (width <= 2 || height <= 2) {
            message = 'The number should be at least 3!';
            messageClass = this.messageClassError;
        }
        else {
            message = 'Just numbers are allowed!'
            messageClass = this.messageClassError;
        }

        this.setState({
            ...{
                message: message,
                messageClass: messageClass,
            }
        });
    }

    onChangeSizeWidthHandler = event => {
        this.setState({
            ...{
                width: event.target.value,
            }
        });
    };

    onChangeSizeHeightHandler = event => {
        this.setState({
            ...{
                height: event.target.value,
            }
        });
    };

    render() {
        return (
            <div>
                <div className={this.state.messageClass}>
                    <p>{this.state.message}</p>
                </div>
                <div className="Settings">
                    <label>Width: </label>
                    <input maxLength="1" size="2" value={this.state.width} placeholder="" onChange={this.onChangeSizeWidthHandler} required />
                    <label>  Height: </label>
                    <input maxLength="1" size="2" value={this.state.height} placeholder="" onChange={this.onChangeSizeHeightHandler} required />
                    <button className="ButtonSize" type="button" onClick={this.onClickSizeHandler}> GO! </button>
                </div>
            </div>

        )
    }

}

export default Settings;