import React from 'react';
import ReactDOM from 'react-dom'
import EventListener, {withOptions} from 'react-event-listener';
import classnames from 'classnames';


export default class MainPanel extends React.Component{

  constructor(props){
    super(props);
    this.firstStage = false;
    this.toolBarShown = false;
    this.previousScrollTop = 0;
    this.ticking = false;

    this.handleScroll = this.handleScroll.bind(this);
    this.hideToolBar = this.hideToolBar.bind(this);
    this.showToolBar = this.showToolBar.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.title = document.getElementById(`${this.props.panelID}-ttbar`);
    this.toolbar = this.title.closest('.toolbar');
  }

  handleScroll(event){
    let currentScrollTop =
      this.props.isWindow ? event.currentTarget.scrollY: event.currentTarget.scrollTop;

    // this.update(event.currentTarget.scrollTop);
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.update(currentScrollTop);
        this.ticking = false;
      });
    }
    this.ticking = true;
  }

  update(currentScrollTop){
    let f = 212 - this.toolbar.clientHeight;

    if(currentScrollTop < f ){

      let scale = - (currentScrollTop / (f * 2) ) + 1;
      let y = 100 * (1 - currentScrollTop / f);
      let a = this.toolbar.clientWidth > 840 ? 35 : -25;
      let x = a * (1 - currentScrollTop / f);
      this.title.style.transform = `scale(${scale}) translate(${x}px, ${y}px)`
      this.title.style.overflow = '';
      this.title.style.fontSize = '';
      this.title.style.marginRight = '';
      this.toolbar.style.transition = ``
      this.toolbar.style.transform = `translate(0, 0)`;
      this.toolbar.style.boxShadow = ``
      this.firstStage = false;
      this.toolBarShown = false;

    }else if (currentScrollTop < f + this.toolbar.clientHeight) {

      let style = {
        transform: 'scale(1) translate(0,0)',
        overflow: 'auto',
        fontSize: this.toolbar.clientWidth > 840 ? '24px' : '22px',
      }
      this.title.style.transform = style.transform;
      this.title.style.overflow = style.overflow;
      this.title.style.fontSize = style.fontSize;
      this.title.style.marginRight = '0';


      if(!this.toolBarShown || !this.firstStage){
        this.toolbar.style.transition = ``
        let y = 100 * (212 - this.toolbar.clientHeight - currentScrollTop) / this.toolbar.clientHeight
        this.toolbar.style.transform = `translate(0, ${y}%)`;
        this.toolbar.style.boxShadow = ``
      }


    }else{
      let style = {
        transform: 'scale(1) translate(0,0)',
        overflow: 'auto',
        fontSize: this.toolbar.clientWidth > 840 ? '24px' : '22px',

      }
      this.title.style.transform = style.transform;
      this.title.style.overflow = style.overflow;
      this.title.style.fontSize = style.fontSize;
      this.title.style.marginRight = '0';


      if(!this.firstStage){
        if(this.props.onRequestHide) this.props.onRequestHide();
        this.toolbar.style.transform = `translate(0, -100%)`;
        this.firstStage = true;
      }

      if(currentScrollTop > this.previousScrollTop && this.toolBarShown){
        this.hideToolBar(350);
        this.toolBarShown = false;
      }

      if(currentScrollTop < this.previousScrollTop && !this.toolBarShown){
        this.showToolBar(350);
        this.toolBarShown = true;
      }

    }

    if(this.props.onScroll) this.props.onScroll(currentScrollTop, this.previousScrollTop);

    this.previousScrollTop = currentScrollTop
  }

  hideToolBar(duration){
    if(this.props.onRequestHide) this.props.onRequestHide();
    this.toolbar.style.transition = `transform ${duration}ms`
    this.toolbar.style.transform = `translate(0, -100%)`;
    this.toolbar.style.boxShadow = ``
  }

  showToolBar(duration){
    if(this.props.onRequestShow) this.props.onRequestShow();
    this.toolbar.style.transition = `transform ${duration}ms`
    this.toolbar.style.transform = `translate(0, 0)`;
    this.toolbar.style.boxShadow = `
        0 3px 4px 0 rgba(0, 0, 0, .14),
        0 3px 3px -2px rgba(0, 0, 0, .2),
        0 1px 8px 0 rgba(0, 0, 0, .12)`

  }


  render(){
    const mainClasses = classnames('main-panel', this.props.mainClasses, {'window': this.props.isWindow})
    const panClasses = classnames('panel', this.props.classes, {'window': this.props.isWindow})
    const target = this.props.isWindow ? window : this.props.panelID;

    return(
      <div className={mainClasses}>
        <EventListener
          target={target}
          onScroll={withOptions(this.handleScroll, {passive: true, capture: false})}/>

        {this.props.toolbar}

        <div id={this.props.panelID} className={panClasses}>
          <div className='big-header'></div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
