import React from "react";
import PlaylistCard from "./PlaylistCard.jsx";

export default class PlaylistCards extends React.Component {
    render() {
        const { currentList,
                keyNamePairs,
                deleteListCallback, 
                duplicateListCallback,
                loadListCallback,
                renameListCallback, 
                } = this.props;
        return (
            <div id="playlist-cards">
                {
                    keyNamePairs.map((pair) => (
                        <PlaylistCard
                            key={pair.key}
                            keyNamePair={pair}
                            selected={(currentList !== null) && (currentList.key === pair.key)}
                            deleteListCallback={deleteListCallback}
                            duplicateListCallback={duplicateListCallback}
                            loadListCallback={loadListCallback}
                            renameListCallback={renameListCallback}
                        />
                    ))
                }
            </div>
        );
    }
}