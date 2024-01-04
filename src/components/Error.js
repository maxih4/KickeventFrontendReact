import React from 'react';

function Error(props) {
    return (
        <div className="container main m-5 bg-light p-5 pt-2 pb-4 rounded-4 ">
            <div className="row align-items-center">
                <div className="alert alert-danger col align-self-center mt-4" role="alert">
                    Keine Events gefunden...
                </div>
            </div>
        </div>
    );
}

export default Error;