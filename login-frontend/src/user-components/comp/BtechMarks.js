import React from 'react';
import { Card,CardTitle, CardSubtitle,CardText,Container,Row,Col,Alert,Collapse,Table } from 'reactstrap';
import {Button,Modal} from 'react-bootstrap';
import Axios from "axios";

class BtechMarks extends React.Component {
  constructor(props){
    super()
    this.state={
        show:false,
        gpa:0
    }
    this.handleModalbtech=this.handleModalbtech.bind(this);
    this.onChangebtech = this.onChangebtech.bind(this);
    this.onSubmitgpa = this.onSubmitgpa.bind(this);
  }
  handleModalbtech()
  {
    this.setState({show:!this.state.show})
  }

  onChangebtech(e) {
        this.setState({
            gpa: e.target.value
        });
      }
  componentDidMount(){
          Axios.get("http://localhost:80/login-backend/individualstudentdetails.php?id="+this.props.btech)
          .then(response => {
              this.setState({
                  
                  gpa:response.data[0]['b_tech_gpa']
                  
              }) 
              console.log(this.state.gpa); 
          })
          .catch(function(err){
              console.log(err);
          })
      }
    onSubmitgpa(e){
        e.preventDefault();
        const obj={
            gpa : this.state.gpa
        };
        Axios.post("http://localhost/login-backend/individualupdatebtech.php?id="+this.props.btech,obj)
            .then(res => console.log(res.data)
            );
    }

  render(){
  return (
    <div class="container-fluid">

          <Card color="danger" className="Rounded p-3" >
                <CardTitle align="left">{this.state.gpa}</CardTitle>
                <CardSubtitle align="left">B Tech Percentage <span className="gap"><Button onClick={()=>{this.handleModalbtech()}}>Edit</Button></span></CardSubtitle> 
                  <Modal show={this.state.show} onHide={()=>this.handleModalbtech()} >
                    <Modal.Header closeButton>Edit B.Tech Marks</Modal.Header>
                    <Modal.Body>
                      <form onSubmit={this.onSubmitgpa}>
                        <Table className="B.techMarks" responsive>
                        <tbody>
                        <tr>
                            <td>
                              <input type="text" name="B.techMarks" value={this.state.gpa}
                               onChange={this.onChangebtech}  />
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
        </div>

        );
}
}

export default BtechMarks;
