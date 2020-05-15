import React, {Component} from 'react';
import axios from 'axios';
import './chatting.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class Chatting extends Component{
  state = {
    showOnline: true,
    showOffline: false,
    messages: '',
    dataMessage: [],
    open: false,
    name: '',
    sendMessage: ''
  }

  online=()=>{
    this.setState({
      showOnline: true,
      showOffline: false
    })
    if(this.state.dataMessage){
      this.setState({
        messages: this.state.dataMessage
      })
    }
  }

  offline=()=>{
    this.setState({
      showOnline: false,
      showOffline: true
    })
  }

  componentDidMount(){
    const api='http://ed1027f7.ngrok.io/messages'
    axios.get(api).then(
      response=>{
        this.setState({
          messages: response.data
        }) .catch(error=>{
          this.setState({
            messages: error
          })
        })
      }
    )
  }

  handleClickOpen = () => {
    this.setState({
      open : true
    })
  };

  handleClose = () => {
    this.setState({
      open: false
    })
  };

  handleEvent = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submit = () => {
    if(this.state.showOnline){
      const api = 'http://ed1027f7.ngrok.io/messages';
      axios.post(api,this.state.sendMessage)
    } if(this.state.showOffline){
        this.state.data.push(this.state.sendMessage)
    }
  }

  render(){
    return(
      <div>
        <h1>Chat Box</h1>
        <div className='col-lg-5 chat-box'>
          <div className='row'>
            <button className = 'col-lg-6' onClick={this.online}>Online</button>
            <button className = 'col-lg-6' onClick={this.offline}>Offline</button>
          </div>
          <div>
            <p>{this.state.messages}</p>
            <button onClick={this.handleClickOpen} className='create col-lg-12 btn btn-success'>Create</button>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="create-title">
              <DialogTitle id='create-title' id="form-dialog-title">Send Message</DialogTitle>
                <DialogContent>
                <DialogContentText>
                  <div>Name:</div>
                  <input type='text' name='name' value={this.state.name} onChange={this.handleEvent}></input>
                  <div>Message:</div>
                  <textarea type='text' name='sendMessage' value={this.state.sendMessage} onChange={this.handleEvent}></textarea>
                  <button className='btn btn-success' onClick={this.submit}>Submit</button>
                  <button className='btn btn-primary' onClick={this.handleClose}>Cancel</button>
                </DialogContentText>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    )
  }
}

export default Chatting;