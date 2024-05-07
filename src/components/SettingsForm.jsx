import React from 'react';

export default class SettingsForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            boardSize: this.props.defaultValues.boardSize,
            clock: this.props.defaultValues.clock,
            time: this.props.defaultValues.time
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit(event)
    {
        this.props.submitCallback(this.state.boardSize, this.state.clock, this.state.time);
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
