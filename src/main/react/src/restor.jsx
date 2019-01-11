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

class Restor extends React.Component {
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
          datas: [],
      }
  }

  componentDidMount() {
    Promise.all(
      [ requestGet('http://localhost:8084/sship/suppliershipment/'), requestGet('http://localhost:8084/shmnt/shipment/') ]).then(([ data, datas ]) =>
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
       url: `http://localhost:8084/sship/suppliershipment/${key}`,
       dataType: 'json',
       success: function(res) {
      console.log(res.id_shipment)
                   $.ajax({
                        type: 'GET',
                        url: `http://localhost:8084/shmnt/shipment/${res.id_shipment}`,
                        dataType: 'json',
                        success: function(res2) {
 $( ".or21" ).show();
                            console.log(res2.id_shipment)
                            console.log(res2.name_shipment)
                            console.log(res2.datetime_shipment)
                            console.log(res2.count_product_shipment)
                            console.log(res2.price_shipment)
                             $('#id_shipment').html(res2.id_shipment);
                             $('#name_shipment').html(res2.name_shipment);
                             $('#datetime_shipment').html(res2.datetime_shipment);
                             $('#count_product_shipment').html(res2.count_product_shipment);
                             $('#price_shipment').html(res2.price_shipment);
                        }
                      });
       }
     });
  }

  handleGetModal(key) {
     console.log(`получен ${key}`);
     $.ajax({
          type: 'GET',
          url: `http://localhost:8084/sship/suppliershipment/${key}`,
          dataType: 'json',
          success: function(res) {
              console.log(res.id_supplier_shipment)
    console.log(res.id_provider)
      console.log(res.id_shipment)
        console.log(res.provider_name)
               $('#id_supplier_shipment').val(res.id_supplier_shipment);
               $('#id_provider').val(res.id_provider);
               $('#id_shipment').val(res.id_shipment);
               $('#provider_name').val(res.provider_name);
          }
        });
   }

   UpdateData(key){
   console.log(`отправлен ${key}`);
console.log($('#id_supplier_shipment').val());
console.log($('#id_provider').val());
console.log($('#id_shipment').val());
console.log($('#provider_name').val());
     $.ajax ({
          url:`http://localhost:8084/sship/suppliershipment/`,
         type: "PUT",
         data: JSON.stringify({
           id_supplier_shipment:$('#id_supplier_shipment').val(),
           id_provider:$('#id_provider').val(),
           id_shipment:$('#id_shipment').val(),
           provider_name:$('#provider_name').val(),
         }),
         dataType: "json",
         contentType: "application/json; charset=utf-8",
         success: function(res) {
 console.log(`отправлен точно ${this.state.key}`);
         }.bind(this)
     });
   };

   DropData(key) {
       console.log(`на удаление ${this.state.key}`);
       $(`#Boo-${this.state.key}`).hide();
       $.ajax ({
            url:`http://localhost:8084/sship/suppliershipment/${this.state.key}`,
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
      console.log(this.state.id_supplier_shipment)
      console.log(this.state.id_provider)
      console.log(this.state.id_shipment)
      console.log(this.state.provider_name)
      this.setState({ show: false });
    $.ajax ({
         url:"http://localhost:8084/sship/suppliershipment/",
        type: "POST",
        data: JSON.stringify({
          id_supplier_shipment:"",
          id_provider:this.state.id_provider,
          id_shipment:this.state.id_shipment,
          provider_name:this.state.provider_name
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
    this.setState({id_supplier_shipment: event.target.id_supplier_shipment});
    this.setState({id_provider: event.target.id_provider});
      this.setState({id_shipment: event.target.id_shipment});
    this.setState({provider_name: event.target.provider_name});

  }
  render() {
    return (
      <div className="home">
                <Modal
                  {...this.props}
                  show={this.state.show}
                  onHide={this.handleHide}
                  dialogClassName="custom-modal"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">
                      Добавление поставщика
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form onSubmit={this.handleSubmit}>
                  <FormGroup  className="hidden"  controlId="case_id_dela1">
                    <FormControl value={this.state.id_supplier_shipment} onChange={(ev)=>this.setState({id_supplier_shipment:ev.target.value})} type="text" placeholder="ИД товара" />
                  </FormGroup>
                  <FormGroup controlId="id_provider">
                    <FormControl value={this.state.id_provider} onChange={(ev)=>this.setState({id_provider:ev.target.value})} type="text" placeholder="ИМЕИ из РосРеестра" />
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
                    <FormControl value={this.state.provider_name} onChange={(ev)=>this.setState({provider_name:ev.target.value})} type="text" placeholder="Название компании" />
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
                Редактирование данных
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                  <form onSubmit={this.handleSubmit}>
                  <FormGroup  className="hidden"  controlId="id_supplier_shipment">
                    <FormControl value={this.state.id_supplier_shipment} onChange={(ev)=>this.setState({id_supplier_shipment:ev.target.value})} type="text" placeholder="ИД товара" />
                  </FormGroup>
                  <FormGroup controlId="id_provider">
                    <FormControl value={this.state.id_provider} onChange={(ev)=>this.setState({id_provider:ev.target.value})} type="text" placeholder="ИМЕИ из РосРеестра" />
                  </FormGroup>
                  <FormGroup controlId="id_shipment">
                   <FormControl onChange={(ev)=>this.setState({id_shipment:ev.target.value})}  componentClass="select" placeholder="select">
                   <option value="0">Изменить товарную партию</option>
                   {this.state.datas.map(function (item, key) {
                       return (
                           <option value={item.id_shipment}>{item.id_shipment}, {item.name_shipment} </option>
                         )
                     })}
                   </FormControl>
                  </FormGroup>
                  <FormGroup controlId="provider_name">
                    <FormControl value={this.state.provider_name} onChange={(ev)=>this.setState({provider_name:ev.target.value})} type="text" placeholder="Название компании" />
                  </FormGroup>
                        </form>
                  </Modal.Body>
                  <Modal.Footer>
                                  <input className="btn btn-primary" type="submit" onClick={this.UpdateData} value="Отправить" />
                    <Button onClick={this.handleHide}>Закрыть</Button>
                  </Modal.Footer>
                </Modal>
      <Nav >
             <MenuItem className="roso2"   onClick={this.handleShow} eventKey={this.state.key}>Новый поставщик</MenuItem>
             <MenuItem className="roso2"  onClick={this.handleShowEdit} eventKey={this.state.key}>Изменить данные</MenuItem>
             <MenuItem className="roso2" onClick={this.DropData}  eventKey={this.state.key} >Удалить данные</MenuItem>
           </Nav>
           <div className="or21 hiddens">
           <Col xs="1" id="id_shipment" className="nopadding"> ч</Col>
           <Col xs="4" id="name_shipment" className="nopadding centered">р</Col>
           <Col xs="3" id="datetime_shipment" className="nopadding centered">п</Col>
           <Col xs="2"  id="count_product_shipment" className="nopadding centered"> в</Col>
           <Col xs="2"  id="price_shipment" className="nopadding centered">я</Col>
             </div>
<div className="or2">
<Tab.Container
    activeKey={this.state.key}
    onSelect={this.handleSelect}
    id="left-tabs-example"
    defaultActiveKey="1">
<Nav className="ororo">
{this.state.data.map(function (item, key) {
    return (
        <NavItem className="itemo" id={`Boo-${item.id_supplier_shipment}`} key={item.id_supplier_shipment} eventKey={item.id_supplier_shipment}>
<Col xs="12" className="nopadding">
<Col xs="1" className="nopadding"> {item.id_supplier_shipment}</Col>
        <Col xs="2" className="nopadding"> {item.id_provider}</Col>
         <Col xs="2" className="nopadding centered"><p className="osd">{item.id_shipment}</p></Col>
<Col xs="6" className="nopadding centered"> {item.provider_name}</Col>
</Col>
       </NavItem>
      )
  })}
  </Nav>
</Tab.Container>
  </div>
      </div>
    );
  }
}

export default Restor;