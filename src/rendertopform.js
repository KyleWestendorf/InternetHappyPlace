import React from 'react';
import './index.css';
import axios from 'axios';

export default class RenderTopForm extends React.Component {
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