import { useState, useEffect } from "react";
import axios from "axios";
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Pagination, PaginationItem, PaginationLink } from "reactstrap";
import ModalComponent from "./ModalComponent";
import config from "../config";

const ListComponent = ({ status, sortBy, sortType }) => {
    const [todoList, setTodoList] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLink, setPageLink] = useState([]);

    const hostName = config.apiUrl;

    useEffect(() => {
        fetchData(currentPage);
    }, [status, sortBy, sortType]);

    const openModal = (todo) => {
        setSelectedTodo(todo);
    };

    const closeModal = () => {
        setSelectedTodo(null);
    };

    const limitString = (inputString, maxLength) => {
        if (inputString.length <= maxLength) {
            return inputString;
        } else {
            return inputString.slice(0, maxLength) + '...';
        }
    };

    const fetchData = (page) => {
        axios.post(`${hostName}/todo?page=${page}`, { status, sort_by: sortBy, sort_type: sortType })
            .then(response => {
                setTodoList(response.data.data.data);
                setPageLink(response.data.data.links);
            })
            .catch(error => {
                console.error("Error fetching todo list:", error);
            });
    };

    const handlePageClick = (url) => {
        if (url != null) {
            const pageNumber = url.split('page=')[1];
            setCurrentPage(Number(pageNumber));
        }
    };

    const renderPagination = () => {
        return (
            <Pagination className="mt-4 d-flex justify-content-center">
                {pageLink.map((item, index) => (
                    <PaginationItem key={`${index}`} active={item.active}>
                        <PaginationLink onClick={() => handlePageClick(item.url)}>
                            {item.label
                                .replace(/&laquo;/g, '<<')
                                .replace(/&raquo;/g, '>>')}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </Pagination>
        );
    };

    return (
        <>
            <ListGroup>
                {todoList.map(todo => (
                    <ListGroupItem key={todo.id} onClick={() => openModal(todo)}>
                        <ListGroupItemHeading>
                            <div className="list-head d-flex w-100 justify-content-between">
                                <h5 className={`mb-1 ${todo.status === 1 ? "text-decoration-line-through fst-italic" : ""}`}>{todo.title}</h5>
                                <small className="text-secondary fs-6 fw-light">{todo.updated_at}</small>
                            </div>
                        </ListGroupItemHeading>
                        <ListGroupItemText>{limitString(todo.description, 120)}</ListGroupItemText>
                    </ListGroupItem>
                ))}
            </ListGroup>

            {selectedTodo && (
                <ModalComponent isOpen={true} toggleModal={closeModal} todo={selectedTodo} isCreate={false} />
            )}

            {renderPagination()}
        </>
    );
};

export default ListComponent;
