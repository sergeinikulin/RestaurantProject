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

class Offic extends React.Component {
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
      [ requestGet('http://localhost:8084/ds/dish/'), requestGet('http://localhost:8084/pd/product/') ]).then(([ data, datas ]) =>
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
  }

  handleGetModal(key) {
     console.log(`получен ${key}`);
     $.ajax({
          type: 'GET',
          url: `http://localhost:8084/ds/dish/${key}`,
          dataType: 'json',
          success: function(res) {
              console.log(res.id_dish)
    console.log(res.name_dish)
      console.log(res.calorie)
        console.log(res.price)
        console.log(res.product)
          console.log(res.order_id)
               $('#id_dish').val(res.id_dish);
               $('#name_dish').val(res.name_dish);
               $('#calorie').val(res.calorie);
               $('#price').val(res.price);
               $('#product').val(res.product);
               $('#order_id').val(res.order_id);
          }
        });
   }

   UpdateData(key){
   console.log(`отправлен ${key}`);
console.log($('#id_dish').val());
console.log($('#name_dish').val());
console.log($('#calorie').val());
console.log($('#price').val());
console.log($('#product').val());
console.log($('#order_id').val());
     $.ajax ({
          url:`http://localhost:8084/ds/dish/`,
         type: "PUT",
         data: JSON.stringify({
           id_dish:$('#id_dish').val(),
           name_dish:$('#name_dish').val(),
           calorie:$('#calorie').val(),
           price:$('#price').val(),
           product:$('#product').val(),
           order_id:$('#order_id').val(),
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
       $(`#left-tabs-example-tab-${this.state.key}`).hide();
       $.ajax ({
            url:`http://localhost:8084/ds/dish/${this.state.key}`,
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
      console.log(this.state.id_dish)
      console.log(this.state.name_dish)
      console.log(this.state.calorie)
      console.log(this.state.price)
      console.log(this.state.product)
      console.log(this.state.order_id)
      this.setState({ show: false, showedit:false });
    $.ajax ({
         url:"http://localhost:8084/ds/dish/",
        type: "POST",
        data: JSON.stringify({
          id_dish:"",
          name_dish:this.state.name_dish,
          calorie:this.state.calorie,
          price:this.state.price,
          product:"",
          order_id:""
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
    this.setState({id_dish: event.target.id_dish});
    this.setState({name_dish: event.target.name_dish});
      this.setState({calorie: event.target.calorie});
    this.setState({price: event.target.price});
    this.setState({product: event.target.product});
  this.setState({order_id: event.target.order_id});
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
                  <FormGroup  className="hidden"  controlId="id_dish">
                    <FormControl value={this.state.id_dish} onChange={(ev)=>this.setState({id_dish:ev.target.value})} type="text" placeholder="ИД товара" />
                  </FormGroup>
                  <FormGroup controlId="name_dish">
                    <FormControl value={this.state.name_dish} onChange={(ev)=>this.setState({name_dish:ev.target.value})} type="text" placeholder="Назвение позиции" />
                  </FormGroup>
                  <FormGroup controlId="calorie">
                   <FormControl onChange={(ev)=>this.setState({calorie:ev.target.value})}  componentClass="select" placeholder="select">
                   <option value="0">Выброр продукта для позиции</option>
                   {this.state.datas.map(function (item, key) {
                       return (
                           <option value={item.product_name}>ид: {item.product_id} | продукт: {item.product_name}</option>
                         )
                     })}
                   </FormControl>
                  </FormGroup>
                  <FormGroup controlId="price">
                    <FormControl value={this.state.price} onChange={(ev)=>this.setState({price:ev.target.value})} type="text" placeholder="Итоговая цена" />
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
                  <FormGroup  className="hidden"  controlId="id_dish">
                    <FormControl value={this.state.id_dish} onChange={(ev)=>this.setState({id_dish:ev.target.value})} type="text" placeholder="Название позиции" />
                  </FormGroup>
                  <FormGroup controlId="name_dish">
                    <FormControl value={this.state.name_dish} onChange={(ev)=>this.setState({name_dish:ev.target.value})} type="text" placeholder="" />
                  </FormGroup>
                  <FormGroup controlId="calorie">
                   <FormControl onChange={(ev)=>this.setState({calorie:ev.target.value})}  componentClass="select" placeholder="select">
                   <option value="0">Выброр продукта для позиции</option>
                   {this.state.datas.map(function (item, key) {
                       return (
                           <option value={item.product_name}>ид: {item.product_id} | продукт: {item.product_name}</option>
                         )
                     })}
                   </FormControl>
                  </FormGroup>
                  <FormGroup controlId="price">
                    <FormControl value={this.state.price} onChange={(ev)=>this.setState({price:ev.target.value})} type="text" placeholder="Итоговая" />
                  </FormGroup>
                        </form>
                  </Modal.Body>
                  <Modal.Footer>
                                  <input className="btn btn-primary" type="submit" onClick={this.UpdateData} value="Отправить" />
                    <Button onClick={this.handleHide}>Закрыть</Button>
                  </Modal.Footer>
                </Modal>
      <Nav >
             <MenuItem className="roso2"   onClick={this.handleShow} eventKey={this.state.key}>Зарегистрировать позицию</MenuItem>
             <MenuItem className="roso2"  onClick={this.handleShowEdit} eventKey={this.state.key}>Изменить цену</MenuItem>
             <MenuItem className="roso2" onClick={this.DropData}  eventKey={this.state.key} >Удалить данные</MenuItem>
           </Nav>
<div className="or">
<Tab.Container
    activeKey={this.state.key}
    onSelect={this.handleSelect}
    id="left-tabs-example"
    defaultActiveKey="1">
<Nav className="ororo">
{this.state.data.map(function (item, key) {
    return (
        <NavItem className="itemo" id={`Boo-${item.id_dish}`} key={item.id_dish} eventKey={item.id_dish}>
<Col xs="1" className="nopadding">Ид: {item.id_dish}</Col>
<Col xs="5" className="nopadding">Название позиции: {item.name_dish}</Col>
<Col xs="4" className="nopadding">Исходный продукт: {item.calorie}</Col>
<Col xs="2" className="nopadding">Итоговая цена: {item.price}</Col>
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

export default Offic;