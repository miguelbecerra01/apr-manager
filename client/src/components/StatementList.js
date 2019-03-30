import React from 'react';
import { connect } from 'react-redux';
import StatemenListItem from './StatementListItem';

export class StatementList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>Sus boletas: </h1>
                <div className="list-body">
                    {this.props.statements.length === 0 ? (<span>no registros</span>) :
                        (
                            this.props.statements.map((statement, index) => (
                                <StatemenListItem key={index} {...statement} />
                            ))
                        )
                    }
                </div>
            </div>
        );
    }
}

export default connect()(StatementList);