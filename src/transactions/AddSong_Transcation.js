import { jsTPS_Transaction } from "jstps";
/**
 * AddSong_Transaction
 * 
 * This class represents a transaction that works with adding a song. 
 * It will be managed by the transaction stack.
 * 
 **/
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSongIndex, initSongData) {
        super();
        this.app = initApp;              // App acts as store
        this.songIndex = initSongIndex;  // song being edited
        this.songData = initSongData;  // new song 
    }

    executeDo() {
        this.app.doAddSongAtIndex(this.songIndex, this.songData);
    }
    
    executeUndo() {
        this.app.undoAddSongAtIndex(this.songIndex);
    }
}

