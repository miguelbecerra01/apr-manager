import React from 'react';
import { connect } from 'react-redux';

export const PaymentNotDone = () => {
    return (
        <div>
            No se pudo pagar!
        </div>
    );
};

export default connect()(PaymentNotDone);