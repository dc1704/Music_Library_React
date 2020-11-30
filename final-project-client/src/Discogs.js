import React from 'react';
import NewTrack from './NewTrack'
class Discogs extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            discogs_data : [],
            discogs_index : 0,
            discogs_count : 0,
            isLoaded : false,  // will be true after data have been received from server
            error : null       // no errors yet !
          };
    }
    getTracks=()=>
    {
        fetch("https://api.discogs.com/database/search?key=hpWaohBENEGVybtdZsXR&secret=dzqvkpHSQRnkQVbFYtUsZsfgUashxNQe&artist="+document.getElementById('filter').value+"&country=canada",
            {
                method: 'GET',
            }
        )
            .then(res => res.json())//here server sends JSON response
            .then(
                (res) => {
                    this.setState({discogs_data:res.results,
                    discogs_count : res.results.length,
                    isLoaded:true})

                        document.getElementById("status").innerHTML = "Results"
                    },
                    (error) => {
                        // only NO RESPONSE URL errors will trigger this code
                        document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                    }
                )
        }
        addTrack =(id)=>
        {
            const track = Object.assign([], this.state.discogs_data.filter(discog_item => discog_item.id === id))
            console.log(track[0].master_id)
            let playlist = 0
            for(let i = 0; i < track[0].style.length; i++)
            {
                if(track[0].style[i] === "Acoustic")
                {
                    playlist = 2
                }
                else if(track[0].style[i] === "Classic")
                {
                    playlist = 3
                }
                else if(track[0].style[i] === "Country")
                {
                    playlist = 4
                }
                else if(track[0].style[i] === "Metal")
                {
                    playlist = 5
                }
                else if(track[0].style[i] === "Pop Rock")
                {
                    playlist = 6
                }
                else if(track[0].style[i] === "Rock")
                {
                    playlist = 7
                }
                else
                {
                    playlist = 1
                }
            }
            let userData = {
                id: track[0].id,
                playlistid: playlist,
                title: track[0].title,
                uri: track[0].uri,
                masterid: track[0].master_id
            }

        fetch("http://localhost:8000/tracks" ,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    //'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *client
                body: JSON.stringify(userData)
            }
        )
            .then(res => res.json())//here server sends JSON response
            .then(
                (res) => {
                    // TO DO how to handle code other than 200 because this gets
                    // exeucted in all cases
                    document.getElementById("status").innerHTML = res.msg
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }

            )
        }
    render() {
                return (
                    <div>
                        <input type="text" name="filter" id="filter"/>
                        <span id="status"></span>
                        <button type="button" onClick={()=>this.getTracks()}>Search</button>
                        <table>
                            <thead>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Cover</th>
                                <th>Genre</th>
                                <th>Details</th>
                                <th>Add</th>
                            </thead>
                            <tbody>
                            {
                                this.state.discogs_data.map((album)=>{
                                    return(<NewTrack
                                    id={album.id}
                                    key={album.id}
                                    title = {album.title}
                                    cover = {album.thumb}
                                    style={album.style}
                                    add={this.addTrack.bind(this, album.id)}
                                    info={album.uri}
                                    ></NewTrack>)
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                )
    }
}
export default Discogs;