/*
 * @Author: lxm
 * @Date: 2019-03-19 15:18:05
 * @Last Modified by: lxm
 * @Last Modified time: 2019-03-19 21:32:02
 * TronBankPage
 */
import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { PopupAPI } from '@tronlink/lib/api';
import { NavBar, Icon, InputItem, } from 'antd-mobile';
import {
    APP_STATE
} from '@tronlink/lib/constants';
import './TronBankController.scss';

class BankController extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: {
                account: false,
                token: false
            },
            selectedToken: {
                id: '_',
                name: 'TRX',
                amount: 0,
                decimals: 6
            },
            loading: false
        };
    }

    componentDidMount() { // data by props
        const { selectedToken, selected } = this.props.accounts;
        selectedToken.amount = selectedToken.id === '_' ? selected.balance / Math.pow(10, 6) : selectedToken.amount;
        this.setState({ selectedToken });
        console.log(selectedToken, selected);
    }

    onRecipientChange() {
        //reacipientchange
    }

    render() {
        const { selected } = this.props.accounts;
        const { formatMessage } = this.props.intl;
        return (
            <div className='TronBankContainer'>
                <NavBar
                    className='navbar'
                    mode='light'
                    icon={<Icon type='left' />}
                    onLeftClick={() => PopupAPI.changeState(APP_STATE.READY)}
                    rightContent={[
                        <Icon key='1' type='ellipsis' />,
                    ]}
                >TronBank
                </NavBar>
                <div className='bankContent'>
                    <div className='accountContent'>
                        <section className='accountInfo infoSec'>
                            <label><FormattedMessage id='ACCOUNT.SEND.PAY_ACCOUNT'/></label>
                            <div className='selectedAccount'>
                                <FormattedMessage id='BANK.INDEX.ACCOUNT'/>一<span>{ selected.address }</span>
                            </div>
                            <div className='balance'>
                                <FormattedMessage id='BANK.INDEX.BALANCE'/>
                                {/* &nbsp; {selected.balance / Math.pow(10, 6)} TRX */}
                            </div>
                        </section>
                        <section className='receiveInfo infoSec'>
                            <label><FormattedMessage id='ACCOUNT.SEND.RECEIVE_ADDRESS'/></label>
                            <div className='receiveAccount'>
                                <InputItem placeholder={ formatMessage({ id: 'BANK.INDEX.PLACEHOLDER' })}></InputItem>
                            </div>
                            <div className='balance'>
                                <FormattedMessage id='BANK.INDEX.USED'/>/<FormattedMessage id='BANK.INDEX.TOTAL'/>
                            </div>
                        </section>
                    </div>
                    <div className='rentContent'>
                        <section className='rentNumInfo infoSec'>
                            <label><FormattedMessage id='BANK.INDEX.RENTNUM'/></label>
                            <div className='receiveAccount'>
                                <InputItem placeholder={ formatMessage({ id: 'ANK.INDEX.PLACEHOLDER' })} extra='TRX'></InputItem>
                            </div>
                        </section>
                        <section className='rentDayInfo infoSec'>
                            <label><FormattedMessage id='ANK.INDEX.RENTDAY'/></label>
                            <div className='balance'>
                       
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

export default injectIntl(BankController);