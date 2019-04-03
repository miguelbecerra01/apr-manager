import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import * as numeral from 'numeral';
import { startMakePayment } from '../actions/statements';


export class StatementItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: `${this.props.account.streetName}, ${this.props.account.houseNumber}, ${this.props.account.sector}`,
            clientName: `${this.props.account.firstName} ${this.props.account.lastName} ${this.props.account.motherSurname}`,
            totalCharges: this.props.paymentByConsumption.charges.reduce((sum, charge) => (sum + charge.amount), 0),
            totalSubsidies: this.props.paymentByConsumption.subsidies.reduce((sum, subsidy) => (sum + subsidy.amount), 0),
            totalPending: this.props.paymentByConsumption.charges.filter((charge) => (charge.idType === 1))[0],
            totalAmountByConsumption: 0,
            subTotalPayment: 0,
            comission: 0,
            totalPayment: 0
        }
    }

    componentDidMount() {

        const totalAmountByConsumption = this.state.totalCharges - this.state.totalSubsidies;
        const subTotalPayment = totalAmountByConsumption;
        const comission = (totalAmountByConsumption * 0.01);
        const totalPayment = subTotalPayment + comission;


        this.setState(() => {
            return {
                totalAmountByConsumption,
                subTotalPayment,
                comission,
                totalPayment
            }
        })
    }
    onMakePayment = () => {

        const accountId = this.props.account.idAccount;
        const totalAmount = this.state.totalPayment;
        const ticketNumber = this.props.account.ticketNumber;
        this.props.startMakePayment(accountId, totalAmount, ticketNumber);
    }
    render() {
        return (
            <div>
                <div>
                    <div>Cuenta</div>
                    <div>
                        <p>Cuenta:{this.props.account.idAccount}</p>
                        <p>Dirección:{this.state.address}</p>
                        <p>Titular:{this.state.clientName}</p>
                        <p>Comite:{this.props.account.orgName}</p>
                    </div>
                    <div>
                        <p>Emision: {moment(this.props.account.emissionDate).format('ll')}</p>
                        <p>Vencimiento: {moment(this.props.account.dueDate).format('ll')}</p>
                        <p>Boleta N°: {this.props.account.ticketNumber}</p>
                        <p>Periodo Facturacion: {moment(this.props.account.billingPeriod).format('ll')}</p>
                    </div>
                </div>
                <div>
                    <div>Consumo</div>
                    <div>
                        <p>Lectura Anterior: {this.props.readings.previousReading} al {moment(this.props.readings.previousDate).format('ll')}</p>
                        <p>Lectura Actual: {this.props.readings.currentReading} al {moment(this.props.readings.currentDate).format('ll')}</p>
                        <p>M3 Consumidos: {this.props.readings.totalConsumed}</p>
                    </div>
                    <div>grafico</div>
                </div>
                <div>
                    <div>Pago por consumo</div>
                    <div>
                        <p>Saldo Actual:</p>
                        <ul>
                            {this.props.paymentByConsumption.charges.map((charge, index) => (
                                <li key={index}> <div>{charge.type}: </div><div>{charge.amount}</div></li>
                            ))}
                            {this.props.paymentByConsumption.subsidies.map((subsidy, index) => (
                                <li key={index}><div>{subsidy.type}: </div><div> - {subsidy.amount}</div></li>
                            ))}
                        </ul>
                        <div><div>Total Consumo a Pagar: </div><div>{this.props.totalAmountByConsumption}</div></div>

                    </div>
                </div>
                <div>
                    <div>Pago anterior</div>
                    <div>
                        <div>
                            <div>Fecha Ultimo Pago: </div>
                            <div>{this.props.lastPayment.date}</div>
                        </div>
                        <div>
                            <div>Monto Ultimo Pago: </div>
                            <div>{this.props.lastPayment.amount}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div><img width="200px" src="./images/webpay.png" /></div>
                    <div>
                        <h3>Paga en Línea</h3>
                    </div>
                    <div>
                        <p>Aumenta tu tiempo y paga directamente desde tu casa,
                            con tarjeta de Debito o Credito sin preocupaciones y
                            de forma segura.
                        </p>
                        <p>Aceptamos Cuenta Rut del Banco estado y todas estas tarjetas</p>
                        <img width="300px" src="./images/tarjetas.png" />
                    </div>
                    <div>
                        <button onClick={this.onMakePayment}>Pagar tu cuenta</button>
                    </div>
                </div>
                <div>
                    <div>Pago en Line</div>
                    <div>
                        <h3>¿Qué quieres pagar?</h3>
                        <button >Pago Total $ {this.state.totalAmountByConsumption}</button>
                        {this.state.totalPending && <button>Pago Pendiente $ {this.state.totalPending.amount}</button>}
                    </div>
                    <div>
                        <div>
                            Total Consumo $ {this.state.subTotalPayment}
                            <span>Comision por servicio: $ {this.state.comission}</span>
                            Total a Pagar $ {this.state.totalPayment}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        account: state.statements.account,
        readings: state.statements.readings,
        paymentByConsumption: state.statements.paymentByConsumption,
        lastPayment: state.statements.lastPayment
    }
};


const mapDispatchToProps = (dispatch) => ({
    startMakePayment: (accountId, totalAmount, ticketNumber) => dispatch(startMakePayment(accountId, totalAmount, ticketNumber))
})

export default connect(mapStateToProps, mapDispatchToProps)(StatementItem);
