import React from 'react';
import { InputGroup, InputGroupAddon, Button, Input } from 'reactstrap';

const FormLogin = (props) => {
  return (
    <div>
     <InputGroup>
        <Input type='text' placeholder="Username" />
        <InputGroupAddon addonType="append">
          <Button color="secondary" className="fa fa-user" disabled></Button>
        </InputGroupAddon>
      </InputGroup>
      <br />
      <InputGroup>
        <Input type='password'  placeholder="Password" />
        <InputGroupAddon addonType="append">
          <Button color="secondary" className="fa fa-lock" disabled>&nbsp;</Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default FormLogin;