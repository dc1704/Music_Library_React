import React from 'react'
class Footer extends React.Component{
    constructor(props)
    {
        super(props)
    }
    render(){
        return <footer style = {{backgroundColor:"black",color:"white"}}>@Copyright {this.props.year}</footer>
    }
}
export default Footer