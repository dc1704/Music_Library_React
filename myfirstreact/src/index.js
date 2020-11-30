import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header.js'
import Footer from './Footer.js'
// import SelectList from './SelectList.js'
import Offices from './Offices.js'
import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );


// const provinces=[ {code:'QC',name:'Quebec'},{code:'ON',name:'Ontario'},{code:'NB',name:'New-Brunswick'}]

// const countries=[{code:'CA',name:'Canada'},{code:'US',name:'USA'},{code:'IN',name:'India'},{code:'MX',name:'Mexixo'}]

class Page extends React.Component{
    render(){
        return (
            <div>
            <Header companyName="blabla.com"/>
            {/* <SelectList list={provinces}/>
            <SelectList list={countries}/> */}
            <Offices/>
            <Footer year="2019 + 1"/>
            </div>
        )
    }
}
ReactDOM.render(
    <Page/>,
    document.getElementById('root')
  );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
