import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const CustomerDetailForm = ({ customerDetail, validated, handleSubmit, onChange, onBack }) =>
    <div>
        <Card>
            <Card.Header>
                <h3 >{customerDetail.customerID ? "Edit" : "Add"} Customer</h3>
            </Card.Header>
            <Card.Body>

                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group as={Row} controlId="firstNameValidation">
                        <Form.Label column md="4">First name</Form.Label>
                        <Col sm="8">
                            <Form.Control name="firstName" type="text" placeholder="First name..." value={customerDetail.firstName} onChange={onChange} required />
                            <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="lastNameValidation">
                        <Form.Label column md="4">Last name</Form.Label>
                        <Col sm="8">
                            <Form.Control name="lastName" type="text" placeholder="Last name..." value={customerDetail.lastName} onChange={onChange} required />
                            <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="birthdayValidation">
                        <Form.Label column md="4">Birthday</Form.Label>
                        <Col sm="8">
                            <DayPickerInput  name="birthday" onDayChange={onChange} selectedDay={customerDetail.birthday} value={customerDetail.birthday.toString().substring(0, 10)} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="genderValidation">
                        <Form.Label column md="4">Gender</Form.Label>
                        <Col sm="8" as={Row}>
                            <Form.Check type="radio" className="margin-left-12">
                                <Form.Check.Input type="radio" name="gender" label="Male" value="m" checked={customerDetail.gender === "m"} onChange={onChange} required/>
                                <Form.Check.Label>Male</Form.Check.Label>
                                <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                            </Form.Check>

                            <Form.Check type="radio" className="margin-left-12">
                                <Form.Check.Input type="radio" name="gender" label="Female" value="w" checked={customerDetail.gender === "w"} onChange={onChange} required/>
                                <Form.Check.Label>Female</Form.Check.Label>
                                <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                            </Form.Check>

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="lastContactValidation">
                        <Form.Label column md="4">Last Contact</Form.Label>
                        <Col sm="8">
                            <DayPickerInput name="lastContact" onDayChange={onChange} selectedDay={customerDetail.lastContact} value={customerDetail.lastContact.toString().substring(0, 10)} />

                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="lifeTimeValidation">
                        <Form.Label column md="4">Life Time</Form.Label>
                        <Col sm="8">
                            <Form.Control name="customerLifetimeValue" type="text" placeholder="Life Time Value..." value={customerDetail.customerLifetimeValue} onChange={onChange} required />
                            <Form.Control.Feedback type="invalid">Field is required</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                    <Button type="submit" variant="success" className="margin-left-12 float-right">{customerDetail.customerID ? "Update" : "Add"} Customer</Button>
                    <Button type="button" variant="secondary" onClick={onBack} className="float-right">Return To Customer List</Button>
                </Form>
            </Card.Body>
        </Card>
    </div>

export default CustomerDetailForm;