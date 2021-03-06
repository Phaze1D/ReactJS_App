import React from 'react';
import PersonCard from '../../person/PersonCard';
import PersonForm from '../../person/PersonForm';
import PersonFilter from '../../person/PersonFilter';
import {factoryPerson} from '../../person/faker/factoryPerson.js';
import Dashboard from '../../../structure/dashboard/Dashboard';
import MVirtualGrid from '../../../structure/mvirtual_grid/MVirtualGrid';



export default class ProvidersIndex extends React.Component{
  constructor(props){
    super(props);

    this.onCardUpdate = this.onCardUpdate.bind(this);
  }

  onCardUpdate(provider_id){
    this.refs.dashboard.toggleRight(provider_id, 'Update Provider');
  }

  render(){
    let providers = [];

    for(let i = 0; i < 20; i++){
        providers.push(factoryPerson());
    }

    providers.sort((a, b) => {
      return a.firstName.localeCompare(b.firstName)
    });

    const listItems = providers.map((person) =>
      <div className='col-xs-12 col-sm-6 col-md-4 col-lg-3' key={person._id}>
        <PersonCard {...person} actionLabel='expenses' onRequestUpdate={this.onCardUpdate}/>
      </div>
    );

    const right = <PersonForm headerTitle='New Provider'/>;
    const filter = <PersonFilter/>;

    return (
      <Dashboard
        defaultRightTitle='New Provider'
        headerTitle='Providers'
        showMFAB={true}
        right={right}
        filter={filter}
        ref='dashboard'
        key='main-dash'>

        <MVirtualGrid>
          {listItems}
        </MVirtualGrid>

      </Dashboard>

    );
  }
}
