import React from 'react';
import Track from './Track'
import Discogs from './Discogs'

/**
* Playlist components
* uses track server REST API
* props inputs: none
*/
class Playlist extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        tracks_data : [], // will contain tracks data array from server
        tracks_index : 0, // the index of the track currently shown, start at first in array
        tracks_count : 0, // how many tracks in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the track server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/tracks')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            tracks_data:json_response.tracks, // data received from server
                            tracks_count:json_response.tracks.length, // how many tracks in array
                            tracks_index:0,  // will first show the first track in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "track not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "track not found", db_data:{}}
                            tracks_data: {}, // no data received from server
                            tracks_count:0,
                            tracks_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    tracks_data: {}, // no data received from server
                    tracks_count:0,
                    tracks_index:0,
                });
            }
        )
    }

    deleteTrack =(id)=>
    {
        fetch("http://localhost:8000/tracks/" + id,
            {
                method: 'DELETE'
                //,body: JSON.stringify(someData)// data to send in the body of the request
            })
        .then(res => res.json())//here server sends JSON response
        .then(
            (response) => {
                // TO DO how to handle code other than 200 because this gets
                // exeucted in all cases
                this.setState({error:{message:"Deleted"}})
                document.getElementById("status").innerHTML = "Track Deleted"
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    this.setState({error:{message:"AJAX error: URL wrong or unreachable, see console"}})
                    document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }
            )
    }


    // display the tracks table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.tracks_count!==0){
                // track results not null
                return (
                    <div class="music-class">
                       <div class="right-area"><Discogs/></div>
                        <b><span id="status">Current Playlist</span></b><br></br>
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Playlist ID</th>
                                <th>Title</th>
                                <th>URI</th>
                                <th>Master ID</th>
                                <th>Remove</th>
                            </thead>
                            <tbody>
                            {
                                this.state.tracks_data.map((track)=>{
                                    return(<Track
                                    id={track.id}
                                    key={track.id}
                                    playlistid={track.playlist_id}
                                    title = {track.title}
                                    uri={track.uri}
                                    delete={this.deleteTrack.bind(this, track.id)}
                                    masterid={track.master_id}
                                    ></Track>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                )
            }else{
                return(<div><b>track table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Playlist;