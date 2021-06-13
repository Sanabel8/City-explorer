import React from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



export class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      displayDta: false


    }

  };

  updateCityNameState = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }

  getData = async (e) => {
    e.preventDefault();

    const axiosResponse = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.cf35e1cf53a07585c594d6c5e38401db&q=${this.state.cityName}&format=json`);
    console.log(axiosResponse.data[0]);
    this.setState({
      cityData: axiosResponse.data[0],
      displayDta: true
    });

  }


  //https://us1.locationiq.com/v1/search.php?key=pk.cf35e1cf53a07585c594d6c5e38401db&q=amman&format=json
  render() {
    return (
      <div>
        <Form onSubmit={this.getData}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>City Name</Form.Label>
            <Form.Control onChange={this.updateCityNameState} type="text" placeholder="Enter city" />
          </Form.Group>
          <Button variant="primary" type="submit">
            explore!
          </Button>
        </Form>
        {this.state.displayDta &&

          <div>
            <p>
              {this.state.cityData.display_name}
            </p>

            {/* <img src={`https://maps.locationiq.com/v3/staticmap?key=pk.cf35e1cf53a07585c594d6c5e38401db&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt='' /> */}

            <Container>
              <Row>
                
                <Col xs={6} md={4}>
                  <Image src={`https://maps.locationiq.com/v3/staticmap?key=pk.cf35e1cf53a07585c594d6c5e38401db&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`} alt='' roundedCircle />
                </Col>
              
              
              </Row>
            </Container>



          </div>




        }

      </div>
    )
  }
}
export default App;