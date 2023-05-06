import React from 'react'
import './Index.css'
import { Link } from 'react-router-dom'
import Popup from '../Popup/Index.js'
import DoctoPop from '../Popup/DeleteDoctorPop'
export default function Index() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDoctoOpen, setIsDoctoOpen] = React.useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };

    const showDoctoModal = () => {
    setIsDoctoOpen(true);
  };

  const hideDoctoModal = () => {
    setIsDoctoOpen(false);
  };
  return (
    <div className='container'>
      {isOpen ? <Popup status={isOpen} hide={hideModal} /> : ""}
      {isDoctoOpen?<DoctoPop status={isDoctoOpen} hide={hideDoctoModal}/>:""}
      <div class="row">
        <div class="col-sm-8">
        </div>
        <div class="col-sm-4">
          <div class="row">
            <div class="col">
              <Link type="button" class="btn btn-primary btn-lg btn-block" to='/admin/doctorregister'>Add Doctor</Link>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-success btn-lg btn-block" onClick={showModal}>Fetch Doctor</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-warning btn-lg btn-block">Update Doctor</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-danger btn-lg btn-block" onClick={showDoctoModal}>Delete Doctor</button>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button type="button" class="btn btn-secondary btn-lg btn-block">Fetch Patients</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
