import React from 'react';
import { connect } from 'react-redux';

export class PaymentResultsPage extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                error en recibir el pago
                {this.props.results}
            </div>
        )
    }
};
const mapStateToProps = (state, props) => {
    console.log(props.match.params.results)


    return {
        results: props.match.params.results
    }
}
export default connect(mapStateToProps)(PaymentResultsPage);