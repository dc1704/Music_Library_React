import React from 'react';

const track = (props) => {
    return(<tr>
        <td>{props.id}</td>
         <td>{props.playlistid}</td>
         <td>{props.title}</td>
         <td>{props.uri}</td>
         <td>{props.masterid}</td>
         <td><button onClick={props.delete}>Delete</button></td>
    </tr>)
}

export default track;