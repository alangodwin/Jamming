import logo from './logo.svg';
import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.state = { searchResults: [{name:"",artist:"",album:"",id:""}], 
  playlistName: 'chill', playlistTracks: [{name:"",artist:"",album:"",id:""}] }
  
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(trackSaved => trackSaved.id === track.id)) {
    return;
    };
  }

  render(){
    return(
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults}/>
      <Playlist playlistName ={this.state.playlistName} playlistTracks ={this.state.playlistTracks} />
    </div>
  </div>
</div>
    )
  };
}

export default App;
