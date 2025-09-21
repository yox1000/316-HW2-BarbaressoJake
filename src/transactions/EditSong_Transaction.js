import { jsTPS_Transaction } from "jstps";

/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with editing a song. 
 * It will be managed by the transaction stack.
 * 
 **/

export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSongIndex, initOldSongData, initNewSongData) {
        super();
        this.app = initApp;              // App acts as store
        this.songIndex = initSongIndex;  // song being edited
        this.oldSongData = initOldSongData;  // original 
        this.newSongData = initNewSongData;  // updated
    }

    executeDo() {
        this.app.editSong(this.songIndex, this.newSongData);
    }
    
    executeUndo() {
        this.app.editSong(this.songIndex, this.oldSongData);
    }
}
