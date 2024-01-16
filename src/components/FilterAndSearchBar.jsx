import React, {useState} from 'react';
import {Button, Dropdown, Input, Space} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, DownOutlined, SearchOutlined} from "@ant-design/icons";

function FilterAndSearchBar({setSort, setSearch, search}) {
    const [searchValue, setSearchValue] = useState("")
    const [showState, setShowState] = useState(false)
    function searchfunction() {
        setSearch(searchValue)
        setShowState(false)
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