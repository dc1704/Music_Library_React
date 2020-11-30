import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './Header.js'
import Footer from './Footer.js'
import Playlist from './Playlist.js'
import reportWebVitals from './reportWebVitals';

class Page extends React.Component{
    render(){
        return (
            <div>
            <Header companyName="blabla.com"/>
            <Playlist/>
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
