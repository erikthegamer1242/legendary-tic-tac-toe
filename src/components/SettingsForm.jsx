import React from 'react';

export default class SettingsForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            boardSize: this.props.defaultValues.boardSize
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
    }

    handleSubmit(event)
    {
        this.props.submitCallback(this.state.boardSize);
        event.preventDefault();
    }

    render()
    {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="New game" />
            </form>
        );
    }
}
