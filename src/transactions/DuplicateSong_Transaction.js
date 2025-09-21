import { jsTPS_Transaction } from "jstps";
/**
 * DuplicateSong_Transaction
 * 
 * This class represents a transaction that works with duplicating a song. 
 * It will be managed by the transaction stack.
 * 
 **/
export default class DuplicateSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initSongIndex, initsongToDuplicate) {
        super();
        this.app = initApp;              // App acts as store
        this.songIndex = initSongIndex;  // song being edited
        this.songToDuplicate = JSON.parse(JSON.stringify(initsongToDuplicate));  // new song
    }

    executeDo() {
        this.app.doAddSongAtIndex(this.songIndex + 1, this.songToDuplicate);    
    }
    
    executeUndo() {
        this.app.undoAddSongAtIndex(this.songIndex + 1);
    }
}

