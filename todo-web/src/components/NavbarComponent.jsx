import React, { useState } from "react";
import {
    Col,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    NavItem,
    NavLink,
    Row,
    TabContent,
    TabPane,
} from "reactstrap";
import ListComponent from "./ListComponent";

function NavbarComponent() {
    const [activeTab, setActiveTab] = useState("1");
    const [sortBy, setSortBy] = useState(null);
    const [sortType, setSortType] = useState(0);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState("Sort By");

    const toggleTab = (tab) => {
        setActiveTab(tab);
    };

    const handleSortTypeClick = () => {
        setSortType(sortType + 1);
    };

    const toggleDropDown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleItemClick = (item, value) => {
        setSelectedItem(item);
        setDropdownOpen(false);
        setSortBy(value);
    };

    return (
        <div>
            <Nav tabs className="d-flex justify-content-center mb-3">
                <NavItem>
                    <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => toggleTab("1")}
                    >
                        Incomplete
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={activeTab === "2" ? "active" : ""}
                        onClick={() => toggleTab("2")}
                    >
                        Complete
                    </NavLink>
                </NavItem>
            </Nav>
            <div className="sorting-section d-flex justify-content-end">
                <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} className="mt-2">
                    <DropdownToggle caret>
                        {selectedItem}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => handleItemClick("Title", 1)}>
                            Title
                        </DropdownItem>
                        <DropdownItem onClick={() => handleItemClick("Latest Update", 2)}>
                            Latest Update
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <button onClick={handleSortTypeClick} className="mb-3">
                    {sortType % 2 === 0 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sort-up" viewBox="0 0 16 16">
                            <path d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-sort-down" viewBox="0 0 16 16">
                            <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1z" />
                        </svg>
                    )}
                </button>
            </div>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Row>
                        <Col sm="12">
                            <ListComponent status={false} sortBy={sortBy} sortType={sortBy == 1 ? (sortType % 2) + 1 : (sortType % 2)} />
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="2">
                    <Row>
                        <Col sm="12">
                            <ListComponent status={true} sortBy={sortBy} sortType={sortBy == 1 ? (sortType % 2) + 1 : (sortType % 2)} />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default NavbarComponent;
