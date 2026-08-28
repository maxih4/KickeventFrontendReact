import React, {useState} from 'react';
import {Button, Dropdown, Input} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined, DownOutlined, SearchOutlined} from "@ant-design/icons";

function FilterAndSearchBar({setSort, setSearch, search}) {
    const [searchValue, setSearchValue] = useState(search);
    const [showState, setShowState] = useState(false);

    function searchFunction() {
        setSearch(searchValue);
        setShowState(false);
    }

    const sortItems = [
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

    const sortMenu = {
        items: sortItems,
        onClick: (event) => setSort("startDate," + (event.key === "1" ? "asc" : "desc")),
        selectable: true,
        defaultSelectedKeys: ["1"],
    };

    const searchMenu = {
        items: [{
            label: (
                <div className="search-menu-content">
                    <Input
                        aria-label="Events suchen"
                        onChange={(event) => setSearchValue(event.target.value)}
                        onPressEnter={searchFunction}
                        placeholder="Events suchen"
                        value={searchValue}
                    />
                    <Button aria-label="Suche starten" icon={<SearchOutlined/>} onClick={searchFunction}/>
                </div>
            ),
            key: '1',
        }],
    };

    const handleOpenChange = (nextOpen, info) => {
        if (info.source === 'trigger' || nextOpen) {
            setShowState(nextOpen);
        }
    };

    return (
        <div className="home-filters site-nav-actions">
            <Dropdown menu={sortMenu} placement="bottomLeft" trigger={['click']}>
                <Button>
                    Sortieren <DownOutlined/>
                </Button>
            </Dropdown>
            <Dropdown
                menu={searchMenu}
                open={showState}
                onOpenChange={handleOpenChange}
                placement="bottomLeft"
                trigger={['click']}
            >
                <Button>
                    Suche <DownOutlined/>
                </Button>
            </Dropdown>
        </div>
    );
}

export default FilterAndSearchBar;
