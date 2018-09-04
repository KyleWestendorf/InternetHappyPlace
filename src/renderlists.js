import React from 'react';
import axios from 'axios';

export const ListItem = (props) => {
    // console.log("Going here!");
    // console.log(props.link + ' ' + props.description)
    // action={`/api/delete/${id}`}
    const id = props.id;

    function handleDeleteSubmit(event) {
        console.log("deleting");
        event.preventDefault();
        makeDeleteRequest(id);
    }    

    function makeDeleteRequest(id) {
        console.log("Firing ads!");
        console.log(id);
            if(id) {
           
            axios.post(`/api/delete/${id}`)
            .then(res => {
            console.log("This is the response " + res);
            //   console.log(res.data);
            if(res) {
                props.updateData();
            }
            })
        } else {
            return "Missing ID";
        }
    }

    return (
        <form onSubmit={handleDeleteSubmit} className="linkForms"  method="POST">
            <li>
                <a href={props.link} target="blank">{props.description}</a>
                <input  className="deleteButton" type="submit" value="X" />
            </li>
        </form>
    );
}

export class List extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        
        if(this.props.data) {
        // console.log("Trying here!");
        // console.log(props.data);
            return (
            <div className="mainAreas">
                <ul> 
                    {this.props.data.map((result, i )=> { 
                        
                    return <ListItem updateData = {this.props.updateData} key={i} id = {result._id} link = {result.link} description = {result.description} />} )
                    
                    }
                </ul>
            </div>
            )

            } else {
                // console.log("here!");
                return null;
            }
    }
    // data.map( (result) => {
    //     return (<ul><ListItem link = {result.link} description={result.description} /></ul>)
    // });
 }
