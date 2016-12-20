import React from 'react';
import Portal from 'react-portal';
import classnames from 'classnames';
import AutoLockScrolling from 'material-ui/internal/AutoLockScrolling';



export default class MDialog extends React.Component{
  constructor(props){
    super(props)
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(event){
    event.stopPropagation();
    const classNames = event.target.className.toString();
    if(classNames && classNames.includes('mdialog-overlay')){
      this.props.onRequestClose(event);
    }

  }

  render(){
    const oveClasses = classnames('mdialog-overlay', {'open': this.props.open});
    const diClasses = classnames('mdialog', {'open': this.props.open});

    return(
      <Portal isOpened={true}>
        <div className={oveClasses} onTouchTap={this.handleClose}>
          <AutoLockScrolling lock={this.props.open}/>
          <div className={diClasses}>
            <h3>
              {this.props.title}
            </h3>

            <div className='content'>
              {this.props.children}
            </div>

            <div className='actions'>
              {this.props.actions}
            </div>

          </div>
        </div>

      </Portal>

    )
  }
}