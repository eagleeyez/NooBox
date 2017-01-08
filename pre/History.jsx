var React = require('react');
var Helmet = require('react-helmet');
var Link = require('react-router').Link;
module.exports = React.createClass({
  displayName: 'History',
  getInitialState: function(){
    initTimeago();
    return {};
  },
  componentDidMount: function(){
    getDB('history_records',function(recordList){
      this.setState({recordList:recordList});
    }.bind(this));
  },
  clearHistory: function(){
    setDB('history_records',[],function(){
      this.setState({recordList:[]});
    }.bind(this));
  },
  render: function(){
    var recordList=(this.state.recordList||[{name:'Nothing is here yet',id:'mgehojanhfgnndgffijeglgahakgmgkj'}]).map(function(record,index){
      return(
        <tr key={index}>
        <td>{timeagoInstance.format(record.date,'locale')}</td>
        <td className={record.event}>{GL(record.event)}</td>
        <td><a target="_blank" href={'/image.search.html?cursor='+record.cursor+'&image=history'} ><img src={record.info} /></a></td>
        </tr>);
    }).reverse();
    return (
      <div className="section">
        <div className="actionBar">
          <div className="button" onClick={this.clearHistory}>{GL('clearAll')}</div>
        </div>
        <table className="history-table">
          <thead>
            <tr>
            <th>{capFirst(GL('when'))}</th>
            <th>{capFirst(GL('event'))}</th>
            <th>{capFirst(GL('detail'))}</th>
          </tr>
          </thead>
          <tbody>
            {recordList}
          </tbody>
        </table>
      </div>);
  }
});