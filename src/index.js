import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// const hiddenParagraph = document.getElementById("hidden");

class RenderTopForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
        this.state = {
            firstName: '',
            link: '',
            description: '',
            submit: false
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeLink = this.handleChangeLink.bind(this);
        this.handleChangeDesc = this.handleChangeDesc.bind(this);

    }
    makeRequest(firstName, link, description) {
        axios.post(`/api`, {
            firstName,
            link,
            description,
        })
        .then(res => {
          console.log(res);
          console.log('This is the make request data: ' + res.data);
          if(res) {
              this.props.updateData();
          }
        })
    }

    handleChangeName(event) {
        this.setState({
            firstName: event.target.value
        });
        console.log(this.state.firstName)
    }
    
    handleChangeLink(event) {
        this.setState({
            link: event.target.value
        });
    }

    handleChangeDesc(event) {
        this.setState({
            description: event.target.value
        });
    }
    handleSubmit(event) {
        console.log("submitting!!!");
        event.preventDefault();
        console.log("submitting???");
        let firstName = this.state.firstName
        let link = this.state.link
        let description =  this.state.description
        this.makeRequest(firstName, link, description);
        this.setState({submit: true});
        console.log('Making it here!');
        this.clearForm();
    }

    clearForm() {
        this.setState({
            firstName: '',
            link: '',
            description: '',
        })
    }

  

    render(){

        const h1style = {
            fontFamily: "Calibri",
            color: '#AB7C47',
        }

        const formStyle = {
            color: '#303030'
            
        }

               
        return ( 
        <div>
        <h1 style={h1style}>Show me what you got!</h1>
            <form style = {formStyle} onSubmit={this.handleSubmit}>
                <label htmlFor="firstName">First Name</label>
                 <input value={this.state.firstName} onChange={this.handleChangeName} type="text" id="firstName" name="firstName" size="55" />
                 <label htmlFor="link">Link</label>
                 <input value={this.state.link} onChange={this.handleChangeLink} type="text" id="link" name="link" size="55" />
                 <label htmlFor="description">What do you wanna tell me about the cool thing you sent?</label>
                 <textarea onChange={this.handleChangeDesc} value={this.state.description} name="description" id="description" ></textarea>
                 <input type="submit" value="Seeeend it" />
            </form>
        </div>
        )
    }
}
const ListItem = (props) => {
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

class List extends React.Component {
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


class RenderDiv extends React.Component {
    
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
    axios.get("http://24.92.136.137:4000/api/links").then(result => this.setState({data: result.data})).then(console.log(this.state.data)).then(console.log("Updated!"));
    console.log('finishign update');
    return 'finished';
    
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


ReactDOM.render(<RenderDiv  />, document.getElementById('hidden2'))


registerServiceWorker();
