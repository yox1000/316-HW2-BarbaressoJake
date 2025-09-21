import SongCard from './SongCard.jsx';
import React from "react";

export default class SongCards extends React.Component {
    render() {
        const { currentList, 
                moveSongCallback, showEditSongModalCallback, removeSongCallback} = this.props;
        if (currentList === null) {
            return (
                <div id="song-cards"></div>
            )
        }
        else {
            return (
                <div id="song-cards">
                    {
                        currentList.songs.map((song, index) => (
                            <SongCard
                                id={'song-card-' + (index+1)}
                                key={'song-card-' + (index+1)}
                                song={song}
                                moveCallback={moveSongCallback}
                                showEditSongModalCallback={showEditSongModalCallback} //forward callback from app.jsx
                                removeSongCallback={(songIndex, songObj) => removeSongCallback(songIndex, songObj)}
                            />
                        ))
                    }
                </div>
            )
        }
    }
}