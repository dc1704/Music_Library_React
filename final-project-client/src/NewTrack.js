import React from 'react';

const newtrack = (props) => {
    return(<tr>
        <td>{props.id}</td>
         <td>{props.title}</td>
         <td><img src = {props.cover} alt="cover"/></td>
         <td>{props.style}</td>
         <td><a href={"http://www.discogs.com/" + props.uri}>More Information</a></td>
         <td><button onClick={props.add}>Add</button></td>
    </tr>)
}

export default newtrack;