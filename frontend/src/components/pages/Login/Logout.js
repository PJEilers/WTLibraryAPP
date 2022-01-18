import { Button } from '../../Styling/Button';
import Cookies from 'universal-cookie';

function Logout({ setPersoonInfo }) {

    const cookies = new Cookies();

    const logout = () => {
        setPersoonInfo(null);
        cookies.remove('persoonId');
        cookies.remove('adminRechten');
    }

    return (
        <Button buttonSize='btn--medium' onClick= {() => logout()}>Log Out</Button>
    )
}

export default Logout;