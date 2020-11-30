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
                Welcome to {this.state.companyName}
                <button onClick={()=>this.changeName()}>Change name</button>
            </header>
            )
    }
}
export default Header