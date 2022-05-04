import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.state = { searchResults: [{name:"1",artist:"artist1",album:"album1",id:"1"},{name:"2",artist:"artist2",album:"album2",id:"2"}], 
  playlistName: 'chill', playlistTracks: [{name:"3",artist:"artist3",album:"album3",id:"3"}] }
  
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks;
    if (playlist.find(trackSaved => trackSaved.id === track.id)) {
    return;
    }
    playlist.push(track);
    this.setState({playlistTracks: playlist})
    };
  

  render(){
    return(
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar />
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName ={this.state.playlistName} playlistTracks ={this.state.playlistTracks} />
    </div>
  </div>
</div>
    )
  };
}

export default App;
