import React from 'react';
import axios from 'axios';
import RenderTopForm from './rendertopform'
import {List, ListItem} from './renderlists'
import {url} from './credentials'
export default class RenderDiv extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }

        this.updateData = this.updateData.bind(this);
    }

    componentDidMount() {
    this.updateData();

    }

    updateData() {
    console.log('starting update');
    axios.get(url + '/api/links')
    .then(result => {
        let temp = result.data.reverse() 
        this.setState({data: temp})
    })
        .then(console.log(this.state.data)).then(console.log("Updated!"));
    
    }

    render() {
        
        const dataArray = this.state.data;
        if(dataArray.length !== 0) {
        // console.log(dataArray);
        // console.log(dataArray[0].link);
        return(
        <div>
            <div id="main" className="mainAreas">
                <RenderTopForm updateData={this.updateData} />
            </div>
            <div>
                <List updateData={this.updateData} data={dataArray} />
            </div>
        </div> 
         )
        } else {
            return null;
        }
    }
}
