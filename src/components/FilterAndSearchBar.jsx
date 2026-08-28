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
                <div className="flex min-w-[260px] items-center gap-2">
                    <Input
                        aria-label="Events suchen"
                        onChange={(event) => setSearchValue(event.target.value)}
                        onPressEnter={searchFunction}
                        placeholder="Events suchen"
                        value={searchValue}
                    />
                    <Button
                        aria-label="Suche starten"
                        className="!h-10 !min-w-10 !rounded-[9px] !border-secondary-500 !bg-secondary-500 !px-0 !text-white hover:!border-secondary-400 hover:!bg-secondary-400"
                        icon={<SearchOutlined/>}
                        onClick={searchFunction}
                    />
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
        <div className="order-2 flex items-center gap-2.5 max-[640px]:flex sm:order-1">
            <Dropdown menu={sortMenu} placement="bottomLeft" trigger={['click']}>
                <Button className="!min-h-10 !rounded-[9px] !border-slate-300 !bg-white !px-4 !font-semibold !text-slate-700 hover:!border-slate-400 hover:!text-slate-900 dark:!border-background-600 dark:!bg-background-800 dark:!text-text-200 dark:hover:!border-background-500 dark:hover:!text-text max-[640px]:flex-1">
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
                <Button className="!min-h-10 !rounded-[9px] !border-slate-300 !bg-white !px-4 !font-semibold !text-slate-700 hover:!border-slate-400 hover:!text-slate-900 dark:!border-background-600 dark:!bg-background-800 dark:!text-text-200 dark:hover:!border-background-500 dark:hover:!text-text max-[640px]:flex-1">
                    Suche <DownOutlined/>
                </Button>
            </Dropdown>
        </div>
    );
}

export default FilterAndSearchBar;
