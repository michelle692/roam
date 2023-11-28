import { PiEye, PiEyeSlash } from "react-icons/pi";
import styled from 'styled-components';


const ToggleCreatePwdBtn = ({ onClick, showPassword }) => {
    return (
      <div style={{ marginTop: -65, marginLeft: 380 }} onClick={onClick}>
          {showPassword ? <PiEye fontSize={20} style={{ margin: 0 }} /> : <PiEyeSlash fontSize={20} style={{ margin: 0 }}/>}
      </div>
    )
}

export default ToggleCreatePwdBtn