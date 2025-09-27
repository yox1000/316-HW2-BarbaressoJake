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
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1);
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1);
        
        this.setState(prevState => ({
            isDragging: false,
            draggedTo: false
        }));

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceId, targetId);
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
        const { song } = this.props;
        let num = this.getItemNum();
        console.log("num: " + num);
        let itemClass = "song-card";
        
        return (
            <div
                id={'song-' + num}
                className={itemClass}
                onDragStart={this.handleDragStart}
                onDragOver={this.handleDragOver}
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.handleDrop}
                draggable="true"
                onDoubleClick={() => this.props.showEditSongModalCallback(song, num)}
            >
                <a href={song.youTubeId ? `https://www.youtube.com/watch?v=${song.youTubeId}` : "#"}
                    target={song.youTubeId ? "_blank" : undefined}
                    rel={song.youTubeId ? "noopener noreferrer" : undefined}
                    className="song-title-link"
                    onClick={(e) => {
                        if (!song.youTubeId) {
                        e.preventDefault(); // prevent click if no youTubeId
                        }
                        e.stopPropagation(); // prevent doubleclick edit from firing
                    }}
                >
                    {song.title}
                </a> {" "}
                <span className="song-year">({song.year})</span>
                <span className="song-by"> by </span>{" "}
                <span className="song-artist">{song.artist}</span>{" "}

                <button
                    className="duplicate-song-button"
                    onClick={(e) => {
                        e.stopPropagation(); // avoid doubleclick
                        this.props.duplicateSongCallback(num - 1, song); 
                    }}
                > ⎘
                </button>

                <button
                    className="remove-song-button"
                    onClick={(e) => {
                        e.stopPropagation(); // avoid doubleclick
                        this.props.removeSongCallback(num - 1, song); 
                    }}
                > 🗑
                </button>
            </div>
        );
    }
}