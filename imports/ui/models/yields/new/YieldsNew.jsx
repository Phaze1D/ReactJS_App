import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';
import classnames from 'classnames';


import SelectorButton from '../../../structure/selector_button/SelectorButton';
import MainPanel from '../../../structure/main_panel/MainPanel';
import TextArea from '../../../structure/textarea/TextArea';
import UnitSelectorItem from '../../units/selector_item/UnitSelectorItem';




let DateTimeFormat = global.Intl.DateTimeFormat;

export default class YieldsNew extends React.Component{
  constructor(props){
    super(props);
    this.state = {minDate: new Date()}

  }

  render(){

    return(
      <MainPanel classes='container-fluid'>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField
                name="name"
                type="text"
                className="input-lg"
                hintText=""
                floatingLabelText="Identifier"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-6 sm-p-right'>
            <DatePicker
              name="date_bought"
              floatingLabelText="Created At"
              fullWidth={true}
              onChange={ (event, date) => {this.setState({minDate: date}) } }
              defaultDate={new Date()}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              }).format} />
          </div>

          <div className='col-xs-6 sm-p-left'>
            <DatePicker
              name="expiration_date"
              minDate={this.state.minDate}
              floatingLabelText="Expiration Date"
              fullWidth={true}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              }).format} />
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <TextArea
              name="notes"
              type="text"
              className=""
              floatingLabelText="Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>
        </div>

        <div className="row">
          <div className='col-xs-8 sm-p-right' style={{marginBottom: '10px' }}>
            <TextArea
              name="movement_note"
              type="text"
              className=""
              defaultValue="Initial amount"
              floatingLabelText="Movement Notes"
              fullWidth={true}
              multiLine={true}
              showCount={true}
              maxCount={512}
              rows={1} />
          </div>

          <div className='col-xs-4 sm-p-left' style={{marginBottom: '10px' }}>
            <TextField
                name="amount"
                type="number"
                defaultValue="0"
                hintText=""
                floatingLabelText="Amount"
                fullWidth={true}/>
          </div>
        </div>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="From Unit" highlight={true}/>
          </div>
        </div>

        <UnitSelectorItem/>

        <div className='row'>
          <div className='col-xs-12'>
            <SelectorButton title="Resource"/>
          </div>
        </div>


      </MainPanel>
    )
  }
}
