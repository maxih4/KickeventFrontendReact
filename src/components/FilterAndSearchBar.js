import React, {useState} from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';


function FilterAndSearchBar({setSort,setSearch,search}) {

    const suche = <><i className="bi bi-search m-1"></i>Suchen</>
    const filter = <><i className="bi bi-arrow-down-up m-1"></i>Sortieren</>
    const [searchValue, setSearchValue] = useState("")

function searchfunction(searchValue){
        setSearch(searchValue)
    }

    return (
        <div className="d-flex flex-row justify-content-around">
            <DropdownButton autoClose={"outside"} id="dropdown-basic-button" title={suche}>

                <div className="dropdown-item d-flex flex-row" onKeyDown={(e)=>{if(e.key==="Enter"){searchfunction(searchValue)}}}>
                    <Form.Control
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Suche..."
                        onChange={(e) => setSearchValue(e.target.value)}
                        value={searchValue}

                    /><button className="btn btn-primary" type="submit" onClick={()=>searchfunction(searchValue)} ><i className="bi bi-search fs-4"></i></button>
                </div>
            </DropdownButton>

            <DropdownButton id="dropdown-basic-button" title={filter}>

                <Dropdown.Item onClick={() => setSort("startDate,asc")}><i
                    className="bi bi-sort-down-alt fs-4"></i> Event
                    Datum
                    aufsteigend</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("startDate,desc")}><i className="bi bi-sort-down fs-4"></i> Event
                    Datum absteigend</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("createdDate,desc")}><i
                    className="bi bi-sort-down-alt fs-4"></i> Erstellungs Datum
                    aufsteigend</Dropdown.Item>
                <Dropdown.Item onClick={() => setSort("createdDate,desc")}><i
                    className="bi bi-sort-down fs-4"></i> Erstellungs Datum
                    absteigend</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default FilterAndSearchBar;