import React from 'react';

/**
* Dresses components
* uses our dress server REST API http://localhost:3001/offices
* props inputs: none
*/
class Offices extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        offices_data : [], // will contain offices data array from server
        offices_index : 0, // the index of the office currently shown, start at first in array
        offices_count : 0, // how many offices in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
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
                            offices_data:json_response.offices, // data received from server
                            offices_count:json_response.offices.length, // how many offices in array
                            offices_index:0,  // will first show the first dress in the array
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
                            // result returned is case of error is like  {message: "office not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "office not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
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
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }
    getOneOffice =()=>
    {
        document.getElementById("status").innerHTML = "Waiting for server"
        fetch("http://localhost:8000/offices/" + document.getElementById('oldofficecode').value,
            {
                method: 'GET',
            }
        )
            .then(res => res.json())//here server sends JSON response
            .then(
                (response) => {
                    // TO DO how to handle code other than 200 because this gets
                    // executed in all cases
                    let offices = response.offices;
                    console.log(offices)
                    this.setState({offices_index:document.getElementById('oldofficecode').value - 1})
                    document.getElementById("status").innerHTML = response.msg
                    document.getElementById('officecode').value = this.state.offices_data[this.state.offices_index].officecode
                    document.getElementById('addressline1').value = this.state.offices_data[this.state.offices_index].addressline1
                    document.getElementById('addressline2').value = this.state.offices_data[this.state.offices_index].addressline2
                    document.getElementById('city').value = this.state.offices_data[this.state.offices_index].city
                    document.getElementById('state').value = this.state.offices_data[this.state.offices_index].state
                    document.getElementById('country').value = this.state.offices_data[this.state.offices_index].country
                    document.getElementById('postalcode').value = this.state.offices_data[this.state.offices_index].postalcode
                    document.getElementById('phone').value = this.state.offices_data[this.state.offices_index].phone
                    document.getElementById('territory').value = this.state.offices_data[this.state.offices_index].territory
                },
                (error) => {
                // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }
            )
    }
    // previous =()=>
    // {
    //     if(this.state.offices_index > 0)
    //     {
    //         this.setState({offices_index:this.state.offices_index-1})
    //         console.log(this.state.offices_index)
    //         // document.getElementById('oldofficecode').value = this.state.offices_data[this.state.offices_index].officecode
    //         document.getElementById('officecode').value = this.state.offices_data[this.state.offices_index].officecode
    //         document.getElementById('addressline1').value = this.state.offices_data[this.state.offices_index].addressline1
    //         document.getElementById('addressline2').value = this.state.offices_data[this.state.offices_index].addressline2
    //         document.getElementById('city').value = this.state.offices_data[this.state.offices_index].city
    //         document.getElementById('state').value = this.state.offices_data[this.state.offices_index].state
    //         document.getElementById('country').value = this.state.offices_data[this.state.offices_index].country
    //         document.getElementById('postalcode').value = this.state.offices_data[this.state.offices_index].postalcode
    //         document.getElementById('phone').value = this.state.offices_data[this.state.offices_index].phone
    //         document.getElementById('territory').value = this.state.offices_data[this.state.offices_index].territory
    //     }
    //     else{
    //         document.getElementById('previous').disable = true
    //     }
    // }
    // next =()=>
    // {
    //     if((this.state.offices_index+1) < this.state.offices_count)
    //     {
    //         this.setState({offices_index:this.state.offices_index+1})
    //         console.log(this.state.offices_index)
    //         // document.getElementById('oldofficecode').value = this.state.offices_data[this.state.offices_index].officecode
    //         document.getElementById('officecode').value = this.state.offices_data[this.state.offices_index].officecode
    //         document.getElementById('addressline1').value = this.state.offices_data[this.state.offices_index].addressline1
    //         document.getElementById('addressline2').value = this.state.offices_data[this.state.offices_index].addressline2
    //         document.getElementById('city').value = this.state.offices_data[this.state.offices_index].city
    //         document.getElementById('state').value = this.state.offices_data[this.state.offices_index].state
    //         document.getElementById('country').value = this.state.offices_data[this.state.offices_index].country
    //         document.getElementById('postalcode').value = this.state.offices_data[this.state.offices_index].postalcode
    //         document.getElementById('phone').value = this.state.offices_data[this.state.offices_index].phone
    //         document.getElementById('territory').value = this.state.offices_data[this.state.offices_index].territory
    //     }
    //     else{
    //         document.getElementById('next').disable = true
    //     }
    // }
    clearForm =()=>
    {
        document.getElementById('oldofficecode').value = ""
        document.getElementById('officecode').value = ""
        document.getElementById('addressline1').value = ""
        document.getElementById('addressline2').value = ""
        document.getElementById('city').value = ""
        document.getElementById('state').value = ""
        document.getElementById('country').value = ""
        document.getElementById('postalcode').value = ""
        document.getElementById('phone').value = ""
        document.getElementById('territory').value = ""
    }
    delete =()=>
    {
        fetch("http://localhost:8000/offices/" + document.getElementById('officecode').value,
            {
                method: 'DELETE'
                //,body: JSON.stringify(someData)// data to send in the body of the request
            })
        .then(res => res.json())//here server sends JSON response
        .then(
            (response) => {
                // TO DO how to handle code other than 200 because this gets
                // exeucted in all cases
                this.clearForm()
                this.setState({error:{message:"Deleted"}})
               // document.getElementById("status").innerHTML = response.msg
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    this.setState({error:{message:"AJAX error: URL wrong or unreachable, see console"}})
                    //document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }

            )
    }

    saveOffice =()=> {
        let flag = false
        for(let i = 0;i<this.state.offices_count;i++)
        {
            if(document.getElementById('officecode').value === this.state.offices_data[i].officecode)
            {
                flag = true
            }
        }
        console.log(flag)
        if (flag) {
            this.updateOffice()
        } else {
            this.addOffice()
        }
    }

    updateOffice() {
        document.getElementById("status").innerHTML = "Waiting for server"


        let userData = {
            officecode: document.getElementById('officecode').value,
            addressline1: document.getElementById('addressline1').value,
            addressline2: document.getElementById('addressline2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            postalcode: document.getElementById('postalcode').value,
            phone: document.getElementById('phone').value,
            territory: document.getElementById('territory').value
        }

        fetch("http://localhost:8000/offices/" + document.getElementById('officecode').value,
            {
                method: 'PUT',
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
                (response) => {
                    // TO DO how to handle code other than 200 because this gets
                    // exeucted in all cases
                    this.setState({error:{message:"Updated"}})
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    this.setState({error:{message:"AJAX error: URL wrong or unreachable, see console" }})
                }

            )

    }//end of UpdateOffice function

    addOffice() {
        document.getElementById("status").innerHTML = "Waiting for server"

        let userData = {
            officecode: document.getElementById('officecode').value,
            addressline1: document.getElementById('addressline1').value,
            addressline2: document.getElementById('addressline2').value,
            city: document.getElementById('city').value,
            state: document.getElementById('state').value,
            country: document.getElementById('country').value,
            postalcode: document.getElementById('postalcode').value,
            phone: document.getElementById('phone').value,
            territory: document.getElementById('territory').value
        }

        fetch("http://localhost:8000/offices/" ,
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
                (response) => {
                    // TO DO how to handle code other than 200 because this gets
                    // exeucted in all cases
                    document.getElementById("status").innerHTML = response.msg
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("status").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }

            )

    }

    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // office results not null
                return (
                    <div>
                        <b>List of offices from server localhost:8000/offices</b><br/>
                        Server message: <b><span id="status">Waiting user action</span></b><br></br>
                        Select the office code to be updated : <input onChange={()=>this.getOneOffice()} type="number" name="officecode" id="oldofficecode" min={1} step={1} max={this.state.offices_count} placeholder="Select office"/>
                        <form id="officeform">
                            <label>officecode</label> <input type="number" name="officecode" id="officecode" /><br/><br/>
                            <label>Address Line 1</label> <input type="text" name="addressline1" id="addressline1"/><br/><br/>
                            <label>Address Line 2</label> <input type="text" name="addressline2" id="addressline2"/><br/><br/>
                            <label>city</label> <input type="text" name="city" id="city"/><br/><br/>
                            <label>state</label> <input type="text" name="state" id="state"/><br/><br/>
                            <label>country</label> <input type="text" name="country" id="country"/><br/><br/>
                            <label>postal code</label> <input type="text" name="postalcode" id="postalcode"/><br/><br/>
                            <label>phone</label> <input type="text" name="phone" id="phone"/><br/><br/>
                            <label>territory</label> <input type="text" name="territory" id="territory"/><br/><br/>

                        {/* <button type="button" id="previous" onClick={()=>this.previous()}>Previous</button>
                        <button type="button" id="next" onClick={()=>this.next()}>Next</button> */}
                        <button type="button"  onClick={()=>this.delete()}>Delete</button>
                        <button type="button"  onClick={()=>this.clearForm()}>Clear Form</button>
                        <button type="button" onClick={()=>this.saveOffice()}>Update/Add</button>
                        </form>
                    </div>
                )
            }else{
                return(<div><b>Office table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Offices;