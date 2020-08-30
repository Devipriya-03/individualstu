import React from 'react';
import { Card,CardTitle, CardSubtitle,CardText,Container,Row,Col,Alert,Collapse,Table } from 'reactstrap';
import {Button,Modal} from 'react-bootstrap';
import Axios from "axios";

class TwelveMarks extends React.Component {
  constructor(props){
          super(props);
          this.state={
              show:false,
              inter:0
              
          }
          

      }
     

      
      componentDidMount(){
          Axios.get("http://localhost:80/login-backend/individualstudentdetails.php?id="+this.props.login)
          .then(response => {
              this.setState({
                  
                  inter:response.data[0]['inter_percent']
                  
              }) 
              console.log(this.state.inter); 
          })
          .catch(function(err){
              console.log(err);
          })
      }
    
  
  render(){
  return (
    <div class="container-fluid">
        <Card color="warning" className="Rounded p-3" >
                <CardTitle align="left">{this.state.inter}</CardTitle>
                <CardSubtitle align="left">Inter Percentage </CardSubtitle> 
          </Card>
        </div>

        );
}
}

export default TwelveMarks;
