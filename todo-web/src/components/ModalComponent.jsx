import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Dropdown, Row, Col, DropdownItem, DropdownToggle, DropdownMenu, Alert } from 'reactstrap';
import config from "../config";

function ModalComponent({ isOpen, toggleModal, todo, isCreate }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Incomplete");
    const [validationErrors, setValidationErrors] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        status: 0,
    });

    const hostName = config.apiUrl;

    useEffect(() => {
        if (todo) {
            setSelectedItem(todo.status === 0 ? "Incomplete" : "Complete");
            setFormData({
                title: todo.title,
                description: todo.description,
                status: todo.status,
            });
        }
        setValidationErrors(null);
    }, [todo]);

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleItemClick = (item, value) => {
        setSelectedItem(item);
        setFormData({
            ...formData,
            status: value,
        });
        setDropdownOpen(false);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const saveTodo = () => {
        console.log(formData);
        let url = `${hostName}/todo/add`;
        if (!isCreate) {
            url = `${hostName}/todo/update/${todo.id}`;
        }

        axios.post(url, formData)
            .then(response => {
                console.log("Todo saved successfully:", response.data);
                toggleModal();
                window.location.href = '/';
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    const errors = error.response.data.message;
                    setValidationErrors(errors);
                } else {
                    console.error("Error saving todo:", error);
                }
            });
    };

    const deleteTodo = () => {
        axios.delete(`${hostName}/todo/${todo.id}`, formData)
            .then(response => {
                console.log("Todo saved successfully:", response.data);
                toggleModal();
                window.location.href = '/';
            })
            .catch(error => {
                console.error("Error deleting todo:", error);
            });
    }

    return (
        <div>
            <Modal isOpen={isOpen} toggle={toggleModal} className="modal-lg modal-dialog-centered">
                <ModalHeader toggle={toggleModal}></ModalHeader>
                <ModalBody>
                    {validationErrors != null && (
                        <Alert color="danger">
                            {validationErrors}
                        </Alert>
                    )}
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label for="title">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Type the Title..."
                                        type="text"
                                        required
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <Label for="status">Status</Label>
                                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle caret>
                                        {selectedItem}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => handleItemClick("Incomplete", 0)}>
                                            Incomplete
                                        </DropdownItem>
                                        <DropdownItem onClick={() => handleItemClick("Complete", 1)}>
                                            Complete
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="description">
                                Description
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Type the description..."
                                type="textarea"
                                rows={7}
                                required
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={saveTodo}>
                        Save
                    </Button>
                    {!isCreate && (
                        <Button color="danger" onClick={deleteTodo}>
                            Delete
                        </Button>
                    )}
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalComponent;
