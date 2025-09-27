import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }

    handleDragStart = (event) => {
        event.dataTransfer.setData("song", "song-" + this.getItemNum());
        this.setState({ isDragging: true });
    }

    handleDragOver = (event) => {
        event.preventDefault(); // allows to drop
        this.setState({ draggedTo: true });
    }

    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState({ draggedTo: true });
    }

    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState({ draggedTo: false });
    }

    handleDrop = (event) => {
        event.preventDefault();

        // resolve to closest song-card div
        const targetCard = event.target.closest(".song-card");
        if (!targetCard) return;

        let targetId = targetCard.id;     // e.g. "song-3"
        targetId = targetId.substring("song-".length);

        let sourceId = event.dataTransfer.getData("song"); // e.g. "song-1"
        sourceId = sourceId.substring("song-".length);

        this.setState({ isDragging: false, draggedTo: false });

        if (sourceId !== targetId) {
            this.props.moveCallback(sourceId, targetId);
        }
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();

        let itemClass = "song-card";
        if (this.state.draggedTo) {
            itemClass += " song-card-dragged-to";
        }

        return (
            <div
                id={"song-" + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
                onDoubleClick={() => this.props.showEditSongModalCallback(song, num)}
            >
                <span className="song-number">{parseInt(num)}.</span>{" "}
                <a
                    href={song.youTubeId ? `https://www.youtube.com/watch?v=${song.youTubeId}` : "#"}
                    target={song.youTubeId ? "_blank" : undefined}
                    rel={song.youTubeId ? "noopener noreferrer" : undefined}
                    className="song-title-link"
                    onClick={(e) => {
                        if (!song.youTubeId) {
                            e.preventDefault();
                        }
                        e.stopPropagation();
                    }}
                >
                    {song.title}
                </a>{" "}
                <span className="song-year">({song.year})</span>
                <span className="song-by"> by </span>{" "}
                <span className="song-artist">{song.artist}</span>{" "}
                <div className = "song-card-buttons">

                <button
                    className="remove-song-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        this.props.removeSongCallback(num - 1, song);
                    }}
                >
                    🗑
                </button>
                <button
                    className="duplicate-song-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        this.props.duplicateSongCallback(num - 1, song);
                    }}
                >
                    ⎘
                </button>
                </div>
            </div>
        );
    }
}
