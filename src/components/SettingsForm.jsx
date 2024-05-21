import React from 'react';
import { useTranslation } from 'react-i18next';
export default class SettingsForm extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            boardSize: this.props.defaultValues.boardSize
        };

        this.handleSubmit = this.handleSubmit.bind(this);
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