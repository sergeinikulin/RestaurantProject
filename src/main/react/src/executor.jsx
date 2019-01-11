import React from 'react';
import {Navbar, Nav, Col, Tab, FormGroup,ControlLabel, FormControl, Button, Table, Modal, NavItem, Grid, Row, MenuItem, NavDropdown} from 'react-bootstrap';
import $ from 'jquery';
import {
    BrowserRouter,
    Link,
    Route,
    Switch
} from 'react-router-dom';

function requestGet(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'json',
            success: resolve,
            error: reject
        });
    });
}

class Executor extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShowEdit = this.handleShowEdit.bind(this);
        this.DropData = this.DropData.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
        this.state = {
            show: false,
            showdetail: false,
            showedit: false,
            key: 1,
            data: [],
            datas: []
        };
    }

    componentDidMount() {
        Promise.all(
            [requestGet('http://localhost:8084/pd/product/'), requestGet('http://localhost:8084/shmnt/shipment/') ]).then(([ data, datas ]) =>
        this.setState({ data, datas}));
    }

    handleShow() {
        this.setState({ show: true });
    }
    
    handleShowDetail() {
        this.setState({ showdetail: true });
    }
    
    handleShowEdit() {
        this.setState({ showedit: true });
    }

    handleHide() {
        this.setState({ show: false,showedit: false, showdetail: false});
    }

    handleSelect(key) {
        console.log(`выбран ${key}`);
        this.setState({ key });
        $.ajax({
            type: 'GET',
            url: `http://localhost:8084/pd/product/${key}`,
            dataType: 'json',
            success: function(res) {
                console.log("ok");
            }
        });
    }
    handleGetModal(key) {
        console.log(`получен ${key}`);
        $.ajax({
            type: 'GET',
            url: `http://localhost:8084/pd/product/${key}`,
            dataType: 'json',
            success: function(res) {
              console.log(res.product_id);
    console.log(res.id_shipment);
      console.log(res.product_name);
        console.log(res.product_calorie);
               $('#product_id').val(res.product_id);
               $('#shipment_id').val(res.id_shipment);
               $('#product_name').val(res.product_name);
               $('#product_calorie').val(res.product_calorie);
          }
        });
   }

   UpdateData(key){
  console.log(`отправлен ${key}`);
     $.ajax ({
          url:`http://localhost:8084/pd/product/`,
         type: "PUT",
         data: JSON.stringify({
           product_id:$('#id_product').val(),
           shipment_id:$('#shipment_id').val(),
           product_name:$('#product_name').val(),
           product_calorie:$('#product_calorie').val(),
         }),
         dataType: "json",
         contentType: "application/json; charset=utf-8",
         success: function(res) {
         }.bind(this)
     });
   };

   DropData(key) {
       console.log(`на удаление ${this.state.key}`);
       $(`#Boo-${this.state.key}`).hide();
       $.ajax ({
            url:`http://localhost:8084/pd/product/${this.state.key}`,
           type: "DELETE",
           dataType: "json",
           contentType: "application/json; charset=utf-8",
           success: function(res) {
           }.bind(this)
       });
   }

  handleSubmit(event){
    this.setState({ show: false });
    event.preventDefault();
      console.log(this.state.product_id);
      console.log(this.state.id_shipment);
      console.log(this.state.product_name);
      console.log(this.state.product_calorie);
      this.setState({ show: false });
    $.ajax ({
         url:"http://localhost:8084/pd/product/",
        type: "POST",
        data: JSON.stringify({
          product_id:"",
          id_shipment:this.state.id_shipment,
          product_name:this.state.product_name,
          product_calorie:this.state.product_calorie
        }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(res) {
            console.log(res);
            this.setState({ show: false });
            console.log("Added");
        }.bind(this)
    });
  };

  handleChange(event) {
    this.setState({product_id: event.target.product_id});
    this.setState({id_shipment: event.target.id_shipment});
      this.setState({product_name: event.target.product_name});
    this.setState({product_calorie: event.target.product_calorie});
  }
  
  render() {
    return (
      <div className="homes">
                <Modal
                  {...this.props}
                  show={this.state.show}
                  onHide={this.handleHide}
                  dialogClassName="custom-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                      Добавление нового продукта
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form onSubmit={this.handleSubmit}>
                  <FormGroup  className="hidden"  controlId="case_id_dela1">
                    <FormControl value={this.state.product_id} onChange={(ev)=>this.setState({id_product:ev.target.value})} type="text" placeholder="Наименование продукта" />
                  </FormGroup>
                  <FormGroup controlId="id_provider">
                    <FormControl value={this.state.product_name} onChange={(ev)=>this.setState({product_name:ev.target.value})} type="text" placeholder="Наименование продукта" />
                  </FormGroup>
                  <FormGroup controlId="id_shipment">
                   <FormControl onChange={(ev)=>this.setState({id_shipment:ev.target.value})}  componentClass="select" placeholder="select">
                   <option value="0">Выброр товарной партии</option>
                   {this.state.datas.map(function (item, key) {
                       return (
                           <option value={item.id_shipment}>{item.name_shipment} </option>
                         )
                     })}
                   </FormControl>
                  </FormGroup>
                  <FormGroup controlId="provider_name">
                    <FormControl value={this.state.product_calorie} onChange={(ev)=>this.setState({product_calorie:ev.target.value})} type="text" placeholder="Каллорийность" />
                  </FormGroup>
                        </form>
                  </Modal.Body>
                  <Modal.Footer>
                  <input className="btn btn-primary" type="submit" onClick={this.handleSubmit} value="Добавить " />
                    <Button onClick={this.handleHide}>Закрыть</Button>
                  </Modal.Footer>
                </Modal>
                <Modal
                  {...this.props}
                  show={this.state.showedit}
                  onHide={this.handleHide}
                  onEntered={() => this.handleGetModal(this.state.key)}
                  container={this}
                  dialogClassName="custom-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                Редактирование записи
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form onSubmit={this.handleSubmit}>
                  <FormGroup  className="hidden"  controlId="case_id_dela1">
                    <FormControl value={this.state.product_id} onChange={(ev)=>this.setState({id_product:ev.target.value})} type="text" placeholder="Наименование продукта" />
                  </FormGroup>
                  <FormGroup controlId="product_name">
                    <FormControl value={this.state.product_name} onChange={(ev)=>this.setState({product_name:ev.target.value})} type="text" placeholder="Наименование продукта" />
                  </FormGroup>
                  <FormGroup controlId="id_shipment">
                   <FormControl onChange={(ev)=>this.setState({id_shipment:ev.target.value})}  componentClass="select" placeholder="select">
                   <option value="0">Выброр товарной партии</option>
                   {this.state.datas.map(function (item, key) {
                       return (
                           <option value={item.id_shipment}>{item.name_shipment} </option>
                         )
                     })}
                   </FormControl>
                  </FormGroup>
                  <FormGroup controlId="product_calorie">
                    <FormControl value={this.state.product_calorie} onChange={(ev)=>this.setState({product_calorie:ev.target.value})} type="text" placeholder="Каллорийность" />
                  </FormGroup>
                        </form>
                  </Modal.Body>
                  <Modal.Footer>
                                  <input className="btn btn-primary" type="submit" onClick={this.UpdateData} value="Отправить" />
                    <Button onClick={this.handleHide}>Закрыть</Button>
                  </Modal.Footer>
                </Modal>
      <Nav className="newnav">
             <MenuItem className="roso2"   onClick={this.handleShow} eventKey={this.state.key}>Новая запись</MenuItem>

             <MenuItem className="roso2"  onClick={this.handleShowEdit} eventKey={this.state.key}>Изменить</MenuItem>
             <MenuItem className="roso2" onClick={this.DropData}  eventKey={this.state.key} >Удалить</MenuItem>
           </Nav>
           <Tab.Container
               activeKey={this.state.key}
               onSelect={this.handleSelect}
               id="left-tabs-example"
               defaultActiveKey="1">
           <Nav className="ororo">
          {this.state.data.map(function (item, key) {
               return (
                   <NavItem id={`Boo-${item.product_id}`} key={item.product_id} eventKey={item.product_id}>
                   <div className="or3">
                   <Col xs="12" className="nopadding dss"> <i className="fas fa-cookie-bite"></i> </Col>
                   <Col xs="12" id={item.product_name} className="nopadding olsd"> {item.product_name} </Col>
                   <Col xs="4" id={item.product_id} className="nopadding olsd2">Товар: {item.product_id} </Col>
                   <Col xs="4" id={item.shipment_id} className="nopadding olsd2">Партия: {item.product_id} </Col>
                   <Col xs="4" id={item.product_calorie} className="nopadding olsd2">Калории: {item.product_calorie} </Col>
                     </div>
                  </NavItem>
                 )
             })}
             </Nav>
           </Tab.Container>
      </div>
    );
  }
}

export default Executor;