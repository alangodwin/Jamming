import './App.css';
import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

    this.state = { searchResults: [{name:"1",artist:"artist1",album:"album1",id:"1"},{name:"2",artist:"artist2",album:"album2",id:"2"}], 
  playlistName: 'chill', playlistTracks: [{name:"3",artist:"artist3",album:"album3",id:"3"}] }
  
  }

  addTrack(track) {
    let playlist = this.state.playlistTracks;
    if (playlist.find(trackSaved => trackSaved.id === track.id)) {
    return;
    }
    playlist.push(track);
    this.setState({playlistTracks: playlist});
    };
  
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  };

  updatePlaylistName(name) {
    this.setState({playlistName: name});
  };
  
  savePlaylist() {
  const trackURIs =  this.state.playlistTracks.map(track => track.uri)
  };

  search(searchResults) {
    console.log(searchResults)
  }

  render(){
    return(
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search}/>
    <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName ={this.state.playlistName} 
      playlistTracks ={this.state.playlistTracks} 
      onRemove={this.removeTrack}
      onNameChange={this.updatePlaylistName}
      onSave={this.savePlaylist}/>
    </div>
  </div>
</div>
    )
  };
}

export default App;
