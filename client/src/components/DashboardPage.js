import React from 'react';
import axios from 'axios';
import { getApiHost } from '../utils';
import * as moment from 'moment/moment';
moment.locale('es');

export class DashboardPage extends React.Component {
    state = {
        statements: []
    }
    componentDidMount() {
        axios.get(`${getApiHost()}/statements`)
            .then(res => {
                const statements = res.data;
                this.setState({ statements });
            });
    }
    render() {
        return (
            <div>
                Dashboard page content your private contents  heress
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