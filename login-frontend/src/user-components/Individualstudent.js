import React, { Component } from "react";
import "../App.css";
import {Redirect} from 'react-router';
import {
  Card,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Alert,
  Table,
} from "reactstrap";
import Collapsible from "react-collapsible";
import Axios from 'axios';
import {Button,Modal} from 'react-bootstrap';
//import ReactSpeedometer from "react-d3-speedometer";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.css";
import "bootstrap-social/bootstrap-social.css";
import './login.css';
import JobFitment from "./JobFitment";
import CurrentJob from "./CurrentJob";
import ARI from "./ARI";
import Cocubes from "./Cocubes";
import Amcat from "./Amcat";
import ITA from "./ITA";


class Individual extends Component {
        constructor(props){
          super(props);
          this.state={
              show:false,
              student_id:"",
              SSC:0,
              inter:0,
              gpa:0,
              branch:"",
              pass_category:""
          }
          this.handleModaltenth=this.handleModaltenth.bind(this);
          this.onChangetenth = this.onChangetenth.bind(this);
          this.onSubmit = this.onSubmit.bind(this);
          
      }
      /*change=async (e)=>{
          e.preventDefault();
          const obj={
              login_id:this.state.student_id
          }
          const url="http://localhost:80/login-backend/studentdetails.php"
          Axios.post(url,obj)
          .then(res=>{
              this.setState({
                  SSC: 95
              })
          })
          .catch(err=>console.log(err));
      }*/

      handleModaltenth()
      {
        this.setState({show:!this.state.show})
      }

      onChangetenth(e) {
        this.setState({
            SSC: e.target.value
        });
      }

      componentDidMount(){
          Axios.get("http://localhost:80/login-backend/individualstudentdetails.php?id="+this.props.login)
          .then(response => {
              this.setState({
                  SSC: response.data[0]['SSC_percent'],
                  inter:response.data[0]['inter_percent'],
                  gpa:response.data[0]['b_tech_gpa'],
                  branch:response.data[0]['Branch'],
                  pass_category:response.data[0]['pass_category']
              }) 
              console.log(this.state.SSC); 
          })
          .catch(function(err){
              console.log(err);
          })
      }

      onSubmit(e){
        e.preventDefault();
        const obj={
           // id: this.state.first_name,
            SSC : this.state.SSC
        };
        Axios.post("http://localhost/login-backend/individualupdate.php?id="+this.props.login,obj)
            .then(res => console.log(res.data)
            );
    }

  render(){
  return (
        <div className='container-fluid'>
           <br></br>
            <Row>
              <Col md="4">
                <Card color="success" className="Rounded p-3">
                  <CardTitle align="left">{this.state.SSC}</CardTitle>
                  <CardSubtitle align="left">Tenth Percentage <span className="gap"><Button onClick={()=>{this.handleModaltenth()}}>Edit</Button></span></CardSubtitle>
                  <Modal show={this.state.show} onHide={()=>this.handleModaltenth()} >
                    <Modal.Header closeButton>Edit Tenth Marks</Modal.Header>
                    <Modal.Body>
                      <form onSubmit={this.onSubmit}>
                        <Table className="TenthMarks" responsive>
                        <tbody>
                        <tr>
                            <td>
                              <input type="text" name="TenthMarks" value={this.state.SSC}
                               onChange={this.onChangetenth}  />
                            </td>
                            <td>
                              <div className={"form-group"}>
                                  <input type={"submit"} value={"Submit"} className={"btn btn-primary"}/>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                        </Table>
                      </form>
                    </Modal.Body>
                  </Modal>
                </Card>
            </Col>
            <Col md="4">
              <Card color="warning" className="Rounded p-3">
                <CardTitle align="left">{this.state.inter}</CardTitle>
                <CardSubtitle align="left">Inter Percentage </CardSubtitle> 
                  
              </Card>
            </Col>
            <Col md="4">
              <Card color="danger" className="Rounded p-3">
                <CardTitle align="left">{(this.state.gpa*9.5).toFixed(2)}</CardTitle>
                <CardSubtitle align="left">B Tech Percentage </CardSubtitle> 
    
              </Card>
            </Col>
        

          </Row>
          <br></br>
          <Collapsible trigger="More Info">
            <br></br>
            <Row>
              <Col md="4">
                <Alert color="success" className="Rounded p-3">
                  <CardTitle align="left">{this.state.branch.slice(0,3)}</CardTitle>
                  <CardSubtitle align="left">Branch</CardSubtitle>
                </Alert>
              </Col>
              <Col md="4">
                <Alert color="warning" className="Rounded p-3">
                  <CardTitle align="left">{this.state.pass_category}</CardTitle>
                  <CardSubtitle align="left">Pass Category</CardSubtitle>
                </Alert>
              </Col>
              <Col md="4">
                <Alert color="danger" className="Rounded p-3">
                  <CardTitle align="left">{this.state.branch.slice(3,5)}</CardTitle>
                  <CardSubtitle align="left">Section</CardSubtitle>
                </Alert>
              </Col>
            </Row>
          </Collapsible>


        <br></br>
          <Row>
            <Col md="6" className="pr-2 pt-2">
              <JobFitment fitid={this.props.login}/>
            </Col>
          
            <Col md="6" className="p-2">
              <CurrentJob jobid={this.props.login}/>
            </Col>
          </Row>
        
        <br></br>
          <ARI arii={this.props.login}/>
          <Collapsible trigger="ARE">
            <Col  className="p-2">
              <Cocubes cid={this.props.login}/>
            </Col>
            <Col className="p-2">
              <Amcat aid={this.props.login}/>
            </Col>
          </Collapsible>
                <br></br>
          <ITA aid={this.props.login}/>
        <br></br>
        <Row>
        <Table striped className="placements" bordered responsive>
            <tr>
              <th colSpan="2">Placements Analysis</th>
            </tr>
         
         
            <tr>
              <td md="6">Total Number of Companies:50</td>
              <td md="6">Number of written test cleared:0</td>
            </tr>
            <tr>
              <td md="6">Number of Companies Attended:0</td>
              <td md="6">Number of GD's cleared:0</td>
            </tr>
            <tr>
              <td md="6">Number of Companies Eligible:50</td>
              <td md="6">Number of technical test cleared:0</td>
            </tr>
            <tr>
              <td colSpan="2">Number of Offer Letters:0</td>
            </tr>
         
        </Table>
        </Row>
        <br></br>
        <br></br>
        <h6>Placements Analysis</h6>
        <Table className="placements" responsive striped>
          <thead>
            <tr>
              <th>Date</th>
              <th>Company Logo</th>
              <th>Company Name</th>
              <th>Attendance</th>
              <th>Written Test</th>
              <th>GroupDiscussion</th>
              <th>Technical Test</th>
              <th>Personal Interview</th>
            </tr>
          </thead>
        </Table>
        <br></br>
        <br></br>
      </div>
  );
}
}

export default Individual;
