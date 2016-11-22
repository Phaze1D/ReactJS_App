import React from 'react';
import Avatar from 'material-ui/Avatar';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import NavigationExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import SelectorButton from '../../../structure/selector_button/SelectorButton';
import classnames from 'classnames';



const InventoryItem = (props) => (
  <div className='product-detail'>

    <div className='product-info'>
      <span>Identifier</span>
      DFSF-123-SDF
    </div>

    <div className='product-info'>
      <span>Available</span>
      16
    </div>

    <div className='product-info'>
      <span>Expiration Date</span>
      Nov 16, 2019
    </div>

    <TextField
        name="amount_taken"
        type="number"
        hintText=""
        className="quantity-input"
        floatingLabelText="Taken"
        defaultValue={props.quantity}
        fullWidth={false}/>
  </div>
)

const ProductDetail = (props) => (
  <div className='product-detail'>

    <div className='product-info'>
      <span>Unit Price</span>
      $4.89
    </div>

    <div className='product-info'>
      <span>Tax Rate</span>
      16%
    </div>

    <div className='product-info' >
      <span>Sub Total</span>
      $12.12
    </div>

    <TextField
        name="quantity"
        type="number"
        hintText=""
        className="quantity-input"
        floatingLabelText="Quantity"
        defaultValue={props.quantity}
        fullWidth={false}/>
  </div>
)

export default class ProductSellItem extends React.Component{

  constructor(props){
    super(props);
    this.handleExpand = this.handleExpand.bind(this);
    this.state = {
      quantity:  Math.floor(Math.random() * 200) + 1,
      show: true
    }
  }

  componentDidMount(){
    this.setState({itemHeight: ''})
  }

  handleExpand(event){
    event.stopPropagation();
    if(this.state.show){
      const mheight = this.titleRef.clientHeight + this.expandRef.clientHeight + 40;
      this.setState({show: false})
      this.setState({itemHeight: mheight + 'px'})

      setTimeout( () => {
        const height = this.titleRef.clientHeight + 40;
        this.setState({itemHeight: height + 'px'})
      }, 100)

    }else{
      const height = this.titleRef.clientHeight + this.expandRef.clientHeight + 40;
      this.setState({show: true})
      this.setState({itemHeight: height + 'px'})
      setTimeout( () => { this.setState({itemHeight: ''}) }, 350)
    }
  }

  render(){
    const butClass = classnames('expand-button', {'rotate': this.state.show});
    const styleH = {height: this.state.itemHeight};

    return (
      <div className='row'>
        <div className='col-xs-12'>
          <div className='selector-item product-item' style={styleH}>
            <div className='select-title clickable' onTouchTap={this.handleExpand} ref={(target) => {this.titleRef = target}}>
              <Avatar
                className="img-div"
                backgroundColor={this.props.backgroundColor}
                style={{marginRight: '15px', padding: '1px 0 0 1px'}}
                size={56}>P</Avatar>

              <h3>
                Product Name
                <span>KJSD-122L-12</span>
              </h3>

              <div className='quantity-amount'>
                <span></span>
                {this.state.quantity}
              </div>


              <IconButton className={butClass} onTouchTap={this.handleExpand}>
                <NavigationExpandMore/>
              </IconButton>
            </div>

            <div className='expandable-div' ref={(target) => {this.expandRef = target}}>

              <ProductDetail quantity={this.state.quantity}/>
              <SelectorButton title="Inventories" highlight={true}/>
              <InventoryItem quantity='1'/>
              <div className='row-divider'></div>
              <InventoryItem quantity='1'/>
              <div className='row-divider'></div>
              <InventoryItem quantity='1'/>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
