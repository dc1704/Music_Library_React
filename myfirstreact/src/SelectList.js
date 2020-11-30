import React from 'react'
class SelectList extends React.Component{
    constructor(props)
    {
        super(props)
        this.state = {list : this.props.list}
    }
    makeList(listItem,index)
    {
        return(<option value={listItem.code} key={index}>{listItem.name}</option>)
    }
    render(){
        return(
            <select>
                {this.state.list.map(this.makeList)}
            </select>
        )
    }

}
export default SelectList