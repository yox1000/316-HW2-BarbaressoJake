import React from "react";

export default class PlaylistCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.keyNamePair.name,
            editActive: false,
        }
    }

    handleClick = (event) => {
        if (event.detail === 1) {
            this.handleLoadList(event);
        } else if (event.detail === 2) {
            this.handleToggleEdit(event);
        }
    }

    handleLoadList = (event) => {
        let listKey = event.target.id;
        if (listKey.startsWith("playlist-card-text-")) {
            listKey = listKey.substring("playlist-card-text-".length);
        }
        this.props.loadListCallback(listKey);
    }

    handleDeleteList = (event) => {
        event.stopPropagation();
        this.props.deleteListCallback(this.props.keyNamePair);
    }

    handleDuplicateList = (event) => {
        event.stopPropagation();
        this.props.duplicateListCallback(this.props.keyNamePair);
    }

    handleToggleEdit = (event) => {
        this.setState({
            editActive: !this.state.editActive
        });
    }

    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleBlur();
        }
    }

    handleBlur = () => {
        let key = this.props.keyNamePair.key;
        let textValue = this.state.text.trim();
        if (textValue.length === 0) {
            // prevent empty name
            textValue = this.props.keyNamePair.name;
        }
        this.props.renameListCallback(key, textValue);
        this.setState({ editActive: false, text: textValue });
    }

    render() {
        const { keyNamePair, selected, highlighted} = this.props;

        let selectClass = "unselected-playlist-card";
        if (selected || highlighted) {
            selectClass = "selected-playlist-card";
        }

        return (
            <div
                id={keyNamePair.key}
                key={keyNamePair.key}
                onClick={(e) => { e.stopPropagation(); this.handleClick(e); }}
                className={'playlist-card ' + selectClass}
            >
                {this.state.editActive ? (
                    <input
                        id={"playlist-card-text-" + keyNamePair.key}
                        className="playlist-card-textbox"
                        type="text"
                        value={this.state.text}
                        onChange={this.handleUpdate}
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleBlur}
                        autoFocus
                    />
                ) : (
                    <span
                        id={"playlist-card-text-" + keyNamePair.key}
                        key={keyNamePair.key}
                        className="playlist-card-text"
                    >
                        {this.state.text}
                    </span>
                )}
                <div className = "playlist-card-buttons">
                <input
                    type="button"
                    id={"delete-list-" + keyNamePair.key}
                    className="card-button"
                    onClick={this.handleDeleteList}
                    value={"🗑"} />
                <input
                    type="button"
                    id={"duplicate-list-" + keyNamePair.key}
                    className="card-button"
                    onClick={this.handleDuplicateList}
                    value={"⎘"} />
                </div>
            </div>
        );
    }
}
