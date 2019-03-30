import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export const StatementListItem = (props) => (
    <Link to="#">
        <div>
            <div>
                <h3>Cuenta: </h3> <p>{props.idAccount}</p>
                <h3>Dirección: </h3> <p>{}, {}, {}, </p>
                <h3>Monto: </h3> <p>{}</p>
                <h3>Empresa: </h3> <p></p>
            </div>
        </div>
    </Link>
);

export default connect()(StatementListItem);
