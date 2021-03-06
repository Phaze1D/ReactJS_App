import React from 'react';
import {Random} from 'meteor/random'
import SwipeableViews from 'react-swipeable-views';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import MapsPlace from 'material-ui/svg-icons/maps/place';
import MShow from '../../../structure/mshow/MShow';
import MTabs from '../../../structure/mtabs/MTabs';
import MAvatar from '../../../structure/mavatar/MAvatar';
import MFade from '../../../structure/mfade/MFade';
import UserShowInfo from '../../ousers/UserShowInfo';
import ExpandDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import classnames from 'classnames'


import {factorySell} from '../faker/factorySell';

let DateTimeFormat = global.Intl.DateTimeFormat;

export default class SellShow extends React.Component{
  constructor(props){
    super(props);
    this.state = {tabValue: 0}

    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);


    this.sell = factorySell();
  }

  handleTabChange(event, value){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  handleSwipe(value, indexLatest){
    this.setState({tabValue: value})
    if(this.refs.mshow && value !== 0){
      this.refs.mshow.hideFAB()
    }else if (this.refs.mshow && value === 0) {
      this.refs.mshow.showFAB()
    }
  }

  render(){

    return(
      <MShow
        ref='mshow'
        onFabClick={this.props.onFabClick}
        title={this.sell.reference}
        subTitle='Referecne ID'
        hasFAB={true}
        hasAvatar={false}
        onRequestChange={this.props.onRequestChange}
        open={this.props.open}>

        <MTabs
          onTabChange={this.handleTabChange}
          value={this.state.tabValue}
          tabs={['Summary']}/>

        <MFade>
          <SwipeableViews onChangeIndex={this.handleSwipe} index={this.state.tabValue} animateHeight={false}>
            <SellSummary sell={this.sell}/>
          </SwipeableViews>
        </MFade>

      </MShow>
    )
  }
}



let SellSummary = (props) => {
  const {
    sell
  } = props

  const paidAt = new DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(sell.paidAt).toString()

  let notClas = 'mtab-info text-wrap';
  let notes = sell.notes;

  if( !(notes && notes.length > 0) ){
    notes = 'Empty'
    notClas = 'mtab-info none'
  }

  return(
    <div className='mtab-content'>
      <h3>Sell Information</h3>

      <div className='mtab-show-flex'>
        <div className='mtab-content-card'>
          <div className='mtab-info'>
            <span>Referecne ID</span>
            {sell.reference}
          </div>

          <div className='mtab-info'>
            <span>Status</span>
            {sell.status}
          </div>

        </div>

        <div className='mtab-content-card flex-column'>

          <div className='mtab-info'>
            <span>Sub Total</span>
            ${sell.subTotal}
          </div>

          <div className='mtab-info'>
            <span>Tax Total</span>
            ${sell.taxTotal}
          </div>

          <div className='mtab-info '>
            <span>Discount</span>
            {sell.discountType ? `${sell.discount}%` : `-$${sell.discount}`}
          </div>

          <div className='mtab-info'>
            <span>Total Price</span>
            ${(sell.subTotal + sell.taxTotal).toFixed(2)}
          </div>

        </div>

        <div className='mtab-content-card'>
          {sell.customer ?
            <div className='cyield-info-flex' style={{padding: '0 0 16px'}}>
              <span style={{fontSize: '13px'}}>Customer</span>
              <MAvatar className='cyield-img'
                style={{marginRight: '15px', padding: '1px 0 0 0px'}}
                size={48} cha={sell.customer.firstName.toUpperCase().charAt(0)} src={sell.customer.avatarURL}/>

              <div>
                {sell.customer.firstName} {sell.customer.lastName}
                <span>
                  {sell.customer.company ? sell.customer.company : sell.customer.email}
                </span>
              </div>

            </div>
            :
            <div className='mtab-info none'>
              <span>Customer</span>
                Empty
            </div>
          }

          <div className='mtab-info'>
            <span>Date Paid</span>
            {sell.paid ? paidAt : 'Not Paid'}
          </div>
        </div>

        <div className='mtab-content-card'>
          <div className={notClas}>
            <span>Notes</span>
            {notes}
          </div>
        </div>
      </div>

      {(sell.shipAddress || sell.billAddress || sell.telephone) &&
        <h4>Contact Information</h4>
      }

      <div className='mtab-show-flex'>
        {sell.shipAddress &&
          <Address {...sell.shipAddress} title='Shipping Address'/>
        }

        {sell.billAddress &&
          <Address {...sell.billAddress} title='Billing Address'/>
        }

        {sell.telephone &&
          <Telephone {...sell.telephone} title='Telephone'/>
        }

      </div>

      <h3 style={{marginTop: '25px'}}>Products</h3>

      <DetailsSummary details={sell.details}/>

      <h3 style={{marginTop: '25px'}}>User Information</h3>

      <div className='mtab-show-flex'>
        <UserShowInfo user={sell.createdBy} subTitle='Created' date={sell.createdAt}/>
        <UserShowInfo user={sell.updatedBy} subTitle='Updated' date={sell.updatedAt}/>
      </div>
    </div>
  )
}


let DetailsSummary = (props) => {

  let productList = props.details.map( (detail) =>
    <Detail key={detail.productID} detail={detail}/>
  )

  return (
    <div className='mtab-show-flex'>

      {productList}

    </div>
  )
}


class Detail extends React.Component{
  constructor(props){
    super(props)
    this.state = {expanded: false}
    this.height = 0;
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand(event){
    let list = this.refs.expandable.getElementsByClassName('mtab-info-flex')
    this.height = list[0].clientHeight * list.length
    this.setState({expanded: !this.state.expanded})
  }

  render(){
    const expClasses = classnames('expandable', {'expanded' : this.state.expanded})
    const subClasses = classnames('sell-show-subtitle', {'expanded' : this.state.expanded})

    const batchList = this.props.detail.batches.map( (batch) =>
      <Batch key={batch.batchID} batch={batch} />
    )

    return(
      <div className='mtab-content-card' style={{maxWidth: 'calc(100% - 16px)', minWidth: 'calc(100% - 16px)', flexBasis: 'initial'}}>

        <div className='cyield-info-flex' style={{padding: '0 0 16px'}}>
          <MAvatar className='cyield-img'
            style={{marginRight: '15px', padding: '1px 0 0 0px', flexShrink: '0'}}
            size={48} cha={this.props.detail.productName.toUpperCase().charAt(0)} src={this.props.detail.product.imageUrl}/>

          <div className='e-overflow' style={{flexGrow: '1'}}>
            <div className='e-overflow'>
              {this.props.detail.productName}
              <span>
                {this.props.detail.product.sku}
              </span>
            </div>
          </div>



        <div className='mtab-product-info'>
          <div className='mtab-info'>
            <span>Unit Price</span>
            ${this.props.detail.unitPrice}
          </div>

          <div className='mtab-info'>
            <span>Tax Rate</span>
            {this.props.detail.taxRate}%
          </div>

          <div className='mtab-info'>
            <span>Quantity</span>
            {this.props.detail.quantity}
          </div>

          <div className='mtab-info'>
            <span>Sub Total</span>
            ${((this.props.detail.unitPrice*this.props.detail.quantity) * (1 + (this.props.detail.taxRate/100))).toFixed(2)}
          </div>
        </div>

        </div>

        <div className={subClasses}
          onTouchTap={this.handleExpand}>
          <ExpandDown/>
          Batches
        </div>

        <div ref='expandable' className={expClasses} style={{height: this.state.expanded ? this.height : '0px'}}>
          {batchList.length > 0 ? batchList:
            <div className='mtab-info-flex none'>
              None
            </div>
          }
        </div>


      </div>
    )
  }
}


let Batch = (props) => {

  let identifer = props.batch.batch.identifer && props.batch.batch.identifer.length > 0
    ? props.batch.batch.identifer : props.batch.batch._id;

  let expireDateString = ''
  if(props.batch.batch.expiresAt){
    expireDateString = new DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(props.batch.batch.expiresAt);
  }else{
    expireDateString = 'Never'
  }

  return(
    <div className='mtab-info-flex'>
      <div className='mtab-info'>
        <span>Batch Identifer</span>
        {identifer}
      </div>

      <div className='mtab-info'>
        <span>Amount Taken</span>
        {props.batch.quantityTaken}
      </div>

      <div className='mtab-info'>
        <span>Created Date</span>
          {new DateTimeFormat('en-US', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }).format(props.batch.batch.createdAt)}
      </div>

      <div className='mtab-info' style={{marginBottom: '16px'}}>
        <span>Expiration Date</span>
        {expireDateString}
      </div>
    </div>
  )
}


let Address = (props) => {

  return(
    <div className='mtab-content-card flex'>
      <MapsPlace className='sicon' style={{alignSelf: 'center'}}/>
      <div className='sinfo' style={{fontSize: '15px', height: 'auto'}}>
        <span style={{fontSize: '13px'}}>
          {props.title}
        </span>
        {props.street1}
        <div> {props.street2} </div>
        <div>
          {props.city}
          {props.state && props.city &&
             <i>, </i>
          }
          {props.state}
        </div>
        <div> {props.zip_code} </div>
        <div> {props.country} </div>
      </div>


    </div>
  )
}

let Telephone = (props) => (
  <div className='mtab-content-card flex'>
    <CommunicationCall className='sicon' style={{alignSelf: 'center'}}/>
    <div className='sinfo' style={{fontSize: '15px', height: 'auto'}}>
      <span style={{fontSize: '13px'}}>
        {props.title}
      </span>
      {props.number}
    </div>
  </div>
)
