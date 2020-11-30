import React from 'react'
import styles from './Header.module.css';
class Header extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {companyName : this.props.companyName}
    }

    changeName =()=>
    {
        this.setState({companyName:"toto.com"})
    }
    render(){
        return(
            <header className={styles.Header}>
               <h1>Music Playlist</h1>
            </header>
            )
    }
}
export default Header