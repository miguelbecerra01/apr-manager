import React from 'react';
import { Link } from 'react-router-dom';

import * as moment from 'moment/moment';
moment.locale('es');

export class DashboardPage extends React.Component {
    state = {
        statements: []
    }
    render() {
        return (
            <div>
                Dashboard page content your private contents  heress
                <Link to="/statements"> Pagar mi cuenta como invitado</Link>
                {this.state.statements.map((statement, index) => {
                    return (
                        <p key={index}>
                            {statement.id_member}
                            {statement.total_amount}
                            {statement.status}
                            {statement.emission_date}
                            {statement.due_date}
                        </p>
                    )
                })}
            </div>
        );
    }
}


export default DashboardPage;