import React from "react";
import './TrackList.css';
import { Track } from '../Track/Track';

export class TrackList extends React.Component {
    render(){
        const trackList = this.props.tracks.map((track) => 
        <Track key={track.id} track={track}/>)
        return (
        <div className="TrackList">
    <ul>
        {trackList}
    </ul>
</div>
        )
    };
};