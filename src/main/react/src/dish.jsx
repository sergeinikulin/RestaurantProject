import React from 'react';
import ReactDOM from 'react-dom';
import { Grid, Row, Col, HelpBlock, Modal,MenuItem, Button, ControlLabel, FormControl, Pagination, Image, Tabs, Tab, NavItem, Nav, FormGroup, Checkbox } from 'react-bootstrap';
import $ from 'jquery';

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

class Dish extends React.Component {
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
            data: []
        };
    }

    componentDidMount() {
        Promise.all(
            [ requestGet('http://localhost:8084/shmnt/shipment/') ]).then(([ data ]) =>
        this.setState({ data}));
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
            url: `http://localhost:8084/shmnt/shipment/${key}`,
            dataType: 'json',
            success: function(res) {
                console.log(res.id_shipment);
                console.log(res.name_shipment);
                console.log(res.datetime_shipment);
                console.log(res.count_product_shipment);
                console.log(res.price_shipment);
                $('#id_shipment').val(res.id_shipment);
                $('#name_shipment').val(res.name_shipment);
                $('#datetime_shipment').val(res.datetime_shipment);
                $('#count_product_shipment').val(res.count_product_shipment);
                $('#price_shipment').val(res.price_shipment);
            }
        });
    }

    UpdateData(key){
        console.log(`отправлен ${key}`);
        $.ajax ({
            url:`http://localhost:8084/shmnt/shipment/`,
            type: "PUT",
            data: JSON.stringify({
                id_shipment:$('#id_shipment').val(),
                name_shipment:$('#name_shipment').val(),
                datetime_shipment:$('#datetime_shipment').val(),
                count_product_shipment:$('#count_product_shipment').val(),
                price_shipment:$('#price_shipment').val()
            }),
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(res) {}.bind(this)
        });
    };

    DropData(key) {
        console.log(`на удаление ${this.state.key}`);
        $(`#Boo-${this.state.key}`).hide();
        $.ajax ({
            url:`http://localhost:8084/shmnt/shipment/${this.state.key}`,
            type: "DELETE",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function(res) {}.bind(this)
        });
    }

    handleSubmit(event){
        this.setState({ show: false });
        event.preventDefault();
        console.log(this.state.id_shipment);
        console.log(this.state.name_shipment);
        console.log(this.state.datetime_shipment);
        console.log(this.state.count_product_shipment);
        console.log(this.state.price_shipment);
        this.setState({ show: false });
        $.ajax ({
            url:"http://localhost:8084/shmnt/shipment/",
            type: "POST",
            data: JSON.stringify({
                id_shipment:"",
                name_shipment:this.state.name_shipment,
                count_product_shipment:this.state.count_product_shipment,
                datetime_shipment:this.state.datetime_shipment,
                price_shipment:this.state.price_shipment
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
        this.setState({id_shipment: event.target.id_shipment});
        this.setState({name_shipment: event.target.name_shipment});
        this.setState({datetime_shipment: event.target.datetime_shipment});
        this.setState({price_shipment: event.target.price_shipment});
        this.setState({count_product_shipment: event.target.count_product_shipment});
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
                            Новое поступление
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup  className="hidden"  controlId="case_id_dela1">
                                <FormControl value={this.state.id_shipment} onChange={(ev)=>this.setState({id_shipment:ev.target.value})} type="text" placeholder="ИД товара" />
                            </FormGroup>
                            <FormGroup controlId="name_shipment">
                                <FormControl value={this.state.name_shipment} onChange={(ev)=>this.setState({name_shipment:ev.target.value})} type="text" placeholder="Наименование" />
                            </FormGroup>
                            <FormGroup controlId="datetime_shipment">
                                <FormControl value={this.state.datetime_shipment} onChange={(ev)=>this.setState({datetime_shipment:ev.target.value})} type="text" placeholder="Дата завоза" />
                            </FormGroup>
                            <FormGroup controlId="price_shipment">
                                <FormControl value={this.state.price_shipment} onChange={(ev)=>this.setState({price_shipment:ev.target.value})} type="text" placeholder="Стоимость при получении" />
                            </FormGroup>
                            <FormGroup controlId="count_product_shipment">
                                <FormControl value={this.state.count_product_shipment} onChange={(ev)=>this.setState({count_product_shipment:ev.target.value})} type="text" placeholder="Количество поступлений" />
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
                            Редактирование
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup  className="hidden"  controlId="id_shipment">
                                <FormControl value={this.state.id_shipment} onChange={(ev)=>this.setState({id_shipment:ev.target.value})} type="text" placeholder="ИД товара" />
                            </FormGroup>
                            <FormGroup controlId="name_shipment">
                                <FormControl value={this.state.name_shipment} onChange={(ev)=>this.setState({name_shipment:ev.target.value})} type="text" placeholder="Наименование" />
                            </FormGroup>
                            <FormGroup controlId="datetime_shipment">
                                <FormControl value={this.state.datetime_shipment} onChange={(ev)=>this.setState({datetime_shipment:ev.target.value})} type="text" placeholder="Дата завоза" />
                            </FormGroup>
                            <FormGroup controlId="price_shipment">
                                <FormControl value={this.state.price_shipment} onChange={(ev)=>this.setState({price_shipment:ev.target.value})} type="text" placeholder="Стоимость при получении" />
                            </FormGroup>
                            <FormGroup controlId="count_product_shipment">
                                <FormControl value={this.state.count_product_shipment} onChange={(ev)=>this.setState({count_product_shipment:ev.target.value})} type="text" placeholder="Количество поступлений" />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <input className="btn btn-primary" type="submit" onClick={this.UpdateData} value="Отправить" />
                        <Button onClick={this.handleHide}>Закрыть</Button>
                    </Modal.Footer>
                </Modal>
                <Nav>
                    <MenuItem onClick={this.handleShow} eventKey={this.state.key} >Новое поступление</MenuItem>
                    <MenuItem onClick={this.handleShowEdit} eventKey={this.state.key}>Изменение данных</MenuItem>
                    <MenuItem onClick={this.DropData}  eventKey={this.state.key} >Удалить данные</MenuItem>
                </Nav>
                <div className="or">
                    <div className="noor">
                        <Col xs="1" className="nopadding"><b>Номер</ b></Col>
                        <Col xs="4" className="nopadding centered"><b>Название </ b></Col>
                        <Col xs="3" className="nopadding centered"><b>завоз </ b></Col>
                        <Col xs="2" className="nopadding centered"><b>стоимость </ b></Col>
                        <Col xs="2" className="nopadding centered"><b>количество </ b></Col>
                    </div>
                    <Tab.Container
                        activeKey={this.state.key}
                        onSelect={this.handleSelect}
                        id="left-tabs-example"
                        defaultActiveKey="1">
                        <Nav className="ororo">
                            {this.state.data.map(function (item, key) {
                                return (
                                    <NavItem className="itemo" id={`Boo-${item.id_shipment}`} key={item.id_shipment} eventKey={item.id_shipment}>
                                        <Col xs="1" className="nopadding"> {item.id_shipment}</Col>
                                        <Col xs="4" className="nopadding centered">{item.name_shipment}</Col>
                                        <Col xs="3" className="nopadding centered"> {item.datetime_shipment}</Col>
                                        <Col xs="2" className="nopadding centered"> {item.price_shipment}</Col>
                                        <Col xs="2" className="nopadding centered"> {item.count_product_shipment}</Col>
                                    </NavItem>
                                );
                            })}
                        </Nav>
                    </Tab.Container>
                </div>
            </div>
        );
    }
}
export default Dish;