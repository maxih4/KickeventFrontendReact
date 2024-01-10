import React, {useState} from 'react';
import {Button, Dropdown, Input, message, Space} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, DownOutlined, SearchOutlined, UserOutlined} from "@ant-design/icons";
import SortIcon from '@mui/icons-material/Sort';


function FilterAndSearchBar({setSort, setSearch, search, setLoading}) {


    const [searchValue, setSearchValue] = useState("")
    const [showState, setShowState] = useState(false)

    function searchfunction() {
        setSearch(searchValue)
        setShowState(false)
        setLoading(true)
    }

    const items = [
        {
            label: 'Datum aufsteigend',
            key: '1',
            icon: <ArrowUpOutlined/>,
        },
        {
            label: 'Datum absteigend',
            key: '2',
            icon: <ArrowDownOutlined/>,
        },
    ];
    const sortProps = {
        items,
        onClick: (e) => {setSort("startDate,"+ (e.key==="1" ? "asc" : "desc"))},
        selectable: true,
        defaultSelectedKeys:["1"]
    };

    const searchProps = {
        items: [{
            label: <div className="flex flex-row"><Input className="me-2" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}></Input><Button onClick={searchfunction}><SearchOutlined/></Button>
            </div>,
            key: '1',

        }],
        onClick: (e) => {
        }
    }

    const handleOpenChange = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setShowState(nextOpen);
        }
    };
    return (
        <div className="flex flex-row md:justify-content-around justify-center items-center">
            {/* <DropdownButton autoClose={"outside"} id="dropdown-basic-button" title={suche} className="button"
                            onClick={(e) => {

                                if (e.target.toLocaleString().includes("Button")) setShowState(!showState)
                            }} show={showState}>

                <div className="dropdown-item d-flex flex-row" >
                    <Form.Control
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Suche..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}

                    />
                    <button className="btn btn-primary buttonSearch" type="submit"
                            onClick={() => searchfunction(searchValue)}><i className="bi bi-search fs-4"></i></button>
                </div>
            </DropdownButton>

            <DropdownButton id="dropdown-basic-button" title={filter} className="button rounded-pill">

                <Dropdown.Item onClick={() => setSort("startDate,asc")}><i
                    className="bi bi-sort-down-alt fs-4"></i> Event
                    Datum
                    aufsteigend</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("startDate,desc")}><i className="bi bi-sort-down fs-4"></i> Event
                    Datum absteigend</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("createdDate,asc")}><i
                    className="bi bi-sort-down-alt fs-4"></i> Erstellungs Datum
                    aufsteigend</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("createdDate,desc")}><i
                    className="bi bi-sort-down fs-4"></i> Erstellungs Datum
                    absteigend</Dropdown.Item>
            </DropdownButton>*/}
            <Dropdown menu={sortProps} trigger={['click']} className="me-1">
                <Button>
                    <Space>


                        Sortieren
                        <DownOutlined/>
                    </Space>
                </Button>
            </Dropdown>
            <Dropdown menu={searchProps} trigger={['click']} open={showState} onOpenChange={handleOpenChange} className="ms-1">
                <Button>
                    <Space>


                        Suche
                        <DownOutlined/>
                    </Space>
                </Button>
            </Dropdown>
        </div>
    );
}

export default FilterAndSearchBar;