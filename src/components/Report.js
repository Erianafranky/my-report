import React from 'react';
import PropTypes from 'prop-types';
import './CSS/report.css'
import './CSS/global.css'

const messages = [
    {
      "id": 1,
      "from": "Gary Lewis",
      "fromAddress": "test@foofoo.com",
      "subject": "I saw this posting on the board",
      "dtSent": "Today, 9:18AM",
      "read": false,
      "body": "Hey Mark,<br><br>I saw your post on the message board and I was wondering if you still had that item available. Can you call me if you still do?<br><br>Thanks,<br><b>Gary Lewis</b>"
    },
    {
      "id": 2,
      "from": "Bob Sutton",
      "fromAddress": "test@testdomain.com",
      "subject": "In Late Today",
      "dtSent": "Today, 8:54AM",
      "read": false,
      "body": "Mark,<br>I will be in late today due to an appt.<br>v/r Bob",
      "attachment": false
    },
    {
      "id": 3,
      "from": "Will Adivo",
      "fromAddress": "test@testbar.com",
      "subject": "New developer",
      "dtSent": "Yesterday, 4:48PM",
      "read": true,
      "body": "Here is the last resume for the developer position we posted on SO. Please review and let me know your thoughts!",
      "attachment": true
    },
    {
      "id": 4,
      "from": "Al Kowalski",
      "fromAddress": "test@domain.com",
      "subject": "RE: New developer",
      "dtSent": "Yesterday, 4:40PM",
      "read": false,
      "body": "I looked at the resume, but the guy looks like a moron.",
      "priority": 1
    },
    {
      "id": 5,
      "from": "Beth Maloney",
      "fromAddress": "test@mail.com",
      "subject": "July Reports",
      "dtSent": "3 Days Ago",
      "read": true,
      "body": "PYC Staff-<br> Our weekly meeting is canceled due to the holiday. Please review and submit your PID report before next week's meeting.<br>Thanks,<br>Beth"
    },
    {
      "id": 6,
      "from": "Jason Furgano",
      "fromAddress": "test@domain.com",
      "subject": "New developer",
      "dtSent": "3 Days Ago",
      "read": true,
      "body": "All,<br>I'd like to introduce Joe Canfigliata our new S/W developer. If you see him in the office introduce yourself and make him feel welcome."
    },
    {
      "id": 7,
      "from": "Bob Sutton",
      "fromAddress": "test@test.com",
      "subject": "Tasking request",
      "dtSent": "3 Days Ago",
      "read": true,
      "body": "Ovi lipsu doir. The message body goes here..."
    },
    {
      "id": 8,
      "from": "Will Adivo",
      "fromAddress": "test@test.com",
      "subject": "Proposal for Avid Consulting",
      "dtSent": "3 Days Ago",
      "read": true,
      "body": "Mark, I reviewed your proposal with Beth and we have a few questions. Let me know when you time to meet."
    },
    {
      "id": 9,
      "from": "Philip Corrigan",
      "fromAddress": "test@testdomain.com",
      "subject": "Follow-up Appt.",
      "dtSent": "4 Days Ago",
      "read": true,
      "body": "Hi,<br>Can you please confirm the expense report I submitted for my last trip to SD?<br>Thanks,<br>Tom Grey"
    }
  ]

 
  class ModalMessage extends React.Component {
    constructor(props) {
      super(props);
      this.messageModalRef= React.createRef();
      this.toggle = this.toggle.bind(this);
      this.state = {
          modalClasses: ['modal','fade']
      }     
      
    }
  
    toggle() {
      console.log(this.messageModalRef)
      document.body.className += ' modal-open'
      
      let modalClasses = this.state.modalClasses
      
      if (modalClasses.indexOf('show') > -1) {
          modalClasses.pop()
          let backdrop = document.querySelector('.modal-backdrop')
          document.body.removeChild(backdrop)
      }
      else {
          modalClasses.push('show')
          let backdrop = document.createElement('div')
          backdrop.classList = "modal-backdrop fade show"
          document.body.appendChild(backdrop)
      }
      
      this.setState({
          modalClasses
      })
    }
    
  
    render() {
      return (
        <div
          id="messageModal"
          className={this.state.modalClasses.join(' ')}
          tabIndex="-1"
          role="dialog"
          aria-hidden="true"
          //ref="messageModal"
          ref={(ref) => this.messageModal = ref}
          
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div>
                
                  <small className="text-uppercase text-muted">Subject</small>
                  <h4 className="modal-title">{this.props.message.subject}</h4>
                </div>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-8">
                    <small className="text-uppercase text-muted">From</small>
                    <h4>
                      <a href="'mailto:'+selected.fromAddress">
                        {this.props.message.from}
                      </a>
                    </h4>
                  </div>
                  <div className="col-sm-4">
                    <small className="text-uppercase text-muted">Sent</small>
                    <h6>{this.props.message.dtSent}</h6>
                  </div>
                  <div className="col-sm-12">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: this.props.message.body
                      }}
                    />
                  </div>
                </div>
                <p className="my-3" />
                <button
                  className="btn btn-primary float-right ml-2"
                  data-dismiss="modal"
                  aria-hidden="true"
                  onClick={this.toggle}>
                  Close
                </button>
                
              </div>
            </div>
          </div>
        </div>
      );
    }
    
  }
  ModalMessage.propTypes = {
    message:PropTypes.string
  };

  class Report extends React.Component {
    constructor(props) {
      super(props);
      this.markRead = this.markRead.bind(this);
      this.doShow = this.doShow.bind(this);
      this.doDelete = this.doDelete.bind(this);
      this.toggleMark = this.toggleMark.bind(this);
      this.toggleMarkAll = this.toggleMarkAll.bind(this);
      this.deleteMarked = this.deleteMarked.bind(this);
      this.refreshMessages = this.refreshMessages.bind(this);
      this.deleteMessages = this.deleteMessages.bind(this);
      this.ModalMessage = React.createRef();
      this.activetags = this.activetags.bind(this);
      this.inactivetags = this.inactivetags.bind(this);
      this.state = {
        initMessages: messages,
        messages: messages,
        selected: {},
        deleted: [],
        activetag: [],
        inactivetag: []

      };
    }
  
    markRead(idx) {
      /* mark this message as read */
      let messages = [...this.state.messages];
      messages[idx].read = true;
      this.setState({ messages });
    }
  
    doShow(idx) {
      this.markRead(idx);
      this.setState({
        selected: messages[idx]
      });
      /* open message in modal */
      this.ModalMessage.current.toggle();
    }
  
    toggleMark(idx) {
      let messages = [...this.state.messages];
      messages[idx].marked = messages[idx].marked ? 0 : 1;
      this.setState({ messages });
    }
  
    doDelete(idx) {
      let messages = [...this.state.messages];
      let deleted = [...this.state.deleted];
      /* append it to deleted */
      deleted.push(messages[idx]);
      /* remove the message at idx */
      messages.splice(idx, 1);
      this.setState({ messages, deleted });
    }
  
    toggleMarkAll() {
      let messages = [...this.state.messages];
      messages.map((v) => {
        return (v.marked = v.marked ? 0 : 1);
      });
      this.setState({ messages });
    }
  
    deleteMarked() {
      var self = this;
      let messages = [...this.state.messages];
      var tbd = [];
      for (var k = 0; k < messages.length; k++) {
        if (messages[k].marked === 1) {
          tbd.push(k);
        }
      }
  
      if (tbd.length > 0) {
        self.activetags(tbd);
      }
      else if (tbd.length) {
        self.inactivetags(tbd);
      }
      
    }
   
    refreshMessages() {
      let initMessages = [...this.state.initMessages];
      this.setState({ messages: initMessages });
    }

    deleteMessages(arr) {
      let messages = [...this.state.messages];
      let deleted = [...this.state.deleted];
      for (var i = arr.length - 1; i >= 0; i--) {
        deleted.push(messages[i]);
        messages.splice(arr[i], 1);
      }
      this.setState({ messages, deleted });
    }
  
    activetags(arr) {
      let messages = [...this.state.messages];
      let activetag = [...this.state.activetag];
      for(var i = arr.length - 1; i >= 0; i--) {
        activetag.push(messages[i]);
        messages.splice(arr[i], 1);
      }
      this.setState({ messages, activetag });
    }

    inactivetags(arr) {
      let messages = [...this.state.messages];
      let inactivetag = [...this.state.inactivetag];
      for(var i = arr.length - 1; i >= 0; i--) {
        inactivetag.push(messages[i]);
        messages.splice(arr[i], 1);
      }
      this.setState({ messages, inactivetag });
    }
  
  
    render() {
      return (
          <div className="col-12 px-4 d-flex flex-column">
            <div className="row">
              <div className="col-lg-3 col-md-4 py-3">
                <ul className="list-group sticky-top sticky-offset">
                  
                  <div className="nav nav-pills py-2 flex-md-column justify-content-center">
                    <a
                      href={{ void: 0 }}
                      className="nav-link active"
                      title="Messages"
                      data-toggle="tab"
                      data-target="#messages"
                    >
                      <span className="icon icon-envelope fa fa-fw fa-envelope mr-md-1" />
                      <span className="d-none d-md-inline">Reports</span>
                      <span
                        className="badge badge-pill badge-dark small font-weight-light ml-1"
                        title="Unread">
                        {
                          this.state.messages.filter((v) => {
                            return !v.read;
                          }).length
                        }
                      </span>
                    </a>
                    <a
                      href={{ void: 0 }}
                      className="nav-link"
                      title="Activetag"
                      data-toggle="tab"
                      data-target="#activetag"
                    >
                      <span className="icon icon-file-text fa fa-fw fa-file-text mr-md-1" />
                      <span className="d-none d-md-inline">Active tags</span>
                      <span
                        className="badge badge-pill badge-dark small font-weight-light ml-1"
                        title="Activetag"
                      >
                        {this.state.activetag.length}
                      </span>
                    </a>
                    <a
                      href={{ void: 0 }}
                      className="nav-link"
                      title="Inactivetag"
                      data-toggle="tab"
                      data-target="#inactivetag"
                    >
                      <span className="icon icon-envelope fa fa-fw fa-envelope mr-md-1" />
                      <span className="d-none d-md-inline">Inactive tags</span>
                      <span 
                        className="badge badge-pill badge-dark small font-weight-light ml-1"
                        title="Inactivetag"
                        >
                          {this.state.inactivetag.length}
                        </span>
                    </a>
                  </div>
                  
                </ul>
              </div>
              <div className="col-md py-3 tab-content">
                <div id="messages" className="tab-pane active">
                  <div className="d-flex flex-sm-row flex-column py-1 mb-1">
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-outline-secondary text-uppercase"
                        onClick={this.toggleMarkAll}
                      >
                        <div
                          className="custom-control custom-checkbox"
                          onClick={this.toggleMarkAll}
                        >
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id="checkAll"
                            defaultChecked={false}
                            onChange={this.toggleMarkAll}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="checkAll"
                          >
                            Mark
                          </label>
                        </div>
                      </button>
                      
                      {this.state.messages &&
                      this.state.messages.filter((v) => {
                        //return !v.read;
                        if (v.marked === 1) {
                          return v;
                          
                        }
                      }).length > 0 ? (
                        <div className="btn-group mr-sm-auto mr-none">
                          <button
                            type="button"
                            className="btn btn-outline-secondary dropdown-toggle text-uppercase"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          />
                          <div className="dropdown-menu" id="dd1">
                            <a 
                              className="dropdown-item"
                              onClick={this.deleteMarked}
                            >
                              Move to Active tags               
                            </a>
                            <a 
                              className="dropdown-item"
                              onClick={this.deleteMarked}
                            >
                              Move to Inactive tags               
                            </a>
                          </div>
                            
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary mx-sm-1 mx-none"
                      onClick={this.refreshMessages}
                    >
                      <i className="align-middle fa fa-refresh" />
                    </button>
                    
                  </div>
                  {/* message list */}
                  <ul className="list-group py-2">
                    {this.state.messages && this.state.messages.length > 0
                      ? this.state.messages.map((item, idx) => (
                          <li
                            key={idx}
                            className="list-group-item list-group-item-action d-block py-1"
                          >
                            <summary className="row">
                              <div className="col py-2 order-1">
                                <div
                                  onClick={() => this.toggleMark(idx)}
                                  className="custom-control custom-checkbox"
                                >
                                  <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    name={"check" + idx}
                                    checked={item.marked === 1}
                                    onChange={() => this.toggleMark(idx)}
                                  />
                                  <label
                                    className="custom-control-label text-nowrap"
                                    htmlFor={"check" + idx}
                                  >
                                    <a
                                      title="send mail"
                                      href={"mailto:" + item.fromAddress}
                                    >
                                      {item.from}{" "}
                                      <span className="icon fa fa-fw fa-envelope mr-md-1" />
                                    </a>
                                  </label>
                                </div>
                              </div>
                              <div className="col-auto px-0 order-last order-sm-2 d-none d-sm-block align-self-center text-right">
                                <a href = {{ void: 0 }}
                                  className="text-secondary px-md-1"
                                  title="Activetag"
                                  onClick={() => this.activetags(idx)}
                                >
                                  
                                </a>
                              </div>
                              <div className="col-auto px-0 order-last order-sm-2 d-none d-sm-block align-self-center text-right">
                                <a href = {{ void: 0 }}
                                  className="text-secondary px-md-1"
                                  title="Inactivetag"
                                  onClick={() => this.inactivetags(idx)}
                                >
                                  
                                </a>
                              </div>
                              <div
                                className="col-sm-12 col-10 py-2 order-3"
                                onClick={() => this.doShow(idx)}
                              >
                                <div className="float-right text-right">
                                  <span
                                    className={
                                      " d-none d-sm-block " +
                                      (!item.read ? "font-weight-bold" : "")
                                    }
                                  >
                                    {item.dtSent}
                                  </span>
                                </div>
                                <p className="lead mb-0">
                                  <a href="!#"
                                    title={
                                      !item.read
                                        ? "This is a new message"
                                        : "View this message"
                                    }>
                                    {item.subject}
                                  </a>
                                  {item.attachment ? (
                                    <i className="align-middle fa fa-paperclip icon-paper-clip" />
                                  ) : null}
                                  <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm ml-2 d-none d-md-inline">
                                    Open
                                  </button>
                                </p>
                              </div>
                            </summary>
                          </li>
                        ))
                      : null}
                  </ul>
                </div>
                <div id="activetag" className="tab-pane">
                  {/* active items */}
                  <h5>Active Tags({this.state.activetag.length})</h5>
                  <div className="row">
                    {this.state.activetag && this.state.activetag.length > 0
                      ? this.state.activetag.map((item, idx) => (
                          <div className="col-12" key={idx}>
                            <a href>
                              {item.from} ({item.fromAddress})
                              <span className="px-2">
                                {item.subject.substring(0, 20)}...
                              </span>
                            </a>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                <div id="inactivetag" className="tab-pane">
                  {/* inactive items */}
                  <h5>Inactive Tags({this.state.inactivetag.length})</h5>
                  <div className="row">
                    {this.state.inactivetag && this.state.inactivetag.length > 0
                      ? this.state.inactivetag.map((item, idx) => (
                          <div className="col-12" key={idx}>
                            <a href>
                              {item.from} ({item.fromAddress})
                              <span className="px-2">
                                {item.subject.substring(0, 20)}...
                              </span>
                            </a>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
                
              </div>
            </div>
          <ModalMessage ref={this.ModalMessage} message={this.state.selected} />
      </div>
      );
    }
  }

  export default Report;