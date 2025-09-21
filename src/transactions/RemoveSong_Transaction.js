import { jsTPS_Transaction } from "jstps";
/**
 * RemoteSong_Transaction
 * 
 * This class represents a transaction that deletes a song. 
 * It will be managed by the transaction stack.
 * 
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(initApp, initIndex, initSong) {
        super();
        this.app = initApp;
        this.index = initIndex;
        this.song = initSong; // store the removed song for undo
    }

    executeDo() {
        this.app.removeSong(this.index);
    }

    executeUndo() {
        this.app.addSongAtIndex(this.index, this.song);
    }
}
