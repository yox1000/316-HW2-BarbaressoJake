import React, { Component } from 'react';

export default class EditSongModal extends Component {

    constructor(props) {
        super(props);
        const { song } = this.props;
        this.state = {
            title: song ? song.title : "",
            artist: song ? song.artist : "",
            year: song ? song.year : "",
            youTubeId: song ? song.youTubeId : "",
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.song !== this.props.song && this.props.song) {
            this.setState({
                title: this.props.song.title,
                artist: this.props.song.artist,
                year: this.props.song.year,
                youTubeId: this.props.song.youTubeId
            });
        }
    }

    confirmEdit = () => {
        const { title, artist, year, youTubeId } = this.state;
        this.props.editSongCallback({
            title,
            artist,
            year,
            youTubeId
        });
    }

    render() {
        const { hideEditSongModalCallback } = this.props;
        const { title, artist, year, youTubeId} = this.state;

        return (
            <div 
                class="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                
                <div class="modal-root" id='edit-song-root'>
                    <div class="modal-north">
                        Edit Song
                    </div>
                    <div class="modal-center">
                        <div class="modal-center-content">
                            <div className="form-row">
                            <label>Title:</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={title} 
                                onChange={this.handleChange} 
                            />
                            </div>
                            <div className="form-row">
                            <label>Artist:</label>
                            <input 
                                type="text" 
                                name="artist" 
                                value={artist} 
                                onChange={this.handleChange} 
                            />
                            </div>
                            <div className="form-row">
                            <label>Year:</label>
                            <input 
                                type="text" 
                                name="year" 
                                value={year} 
                                onChange={this.handleChange} 
                            />
                            </div>
                            <div className="form-row">
                            <label>Youtube ID:</label>
                            <input 
                                type="text" 
                                name="youTubeId" 
                                value={youTubeId} 
                                onChange={this.handleChange} 
                            />
                            </div>
                        </div>
                        </div>

                    <div class="modal-south">
                        <input 
                            type="button" 
                            id="edit-song-confirm-button" 
                            class="modal-button" 
                            onClick={this.confirmEdit}
                            value='Confirm' />
                        <input 
                            type="button" 
                            id="edit-song-cancel-button" 
                            class="modal-button" 
                            onClick={hideEditSongModalCallback}
                            value='Cancel' />
                    </div>
                </div>
            </div>
        );
    }
}
